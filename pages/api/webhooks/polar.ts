import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../../lib/supabaseClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const payload = req.body;
    const eventType = payload.type;

    console.log('🎉 Received Polar Webhook:', eventType);
    console.log('📦 Payload:', JSON.stringify(payload, null, 2));

    try {
        // Handle successful checkout/order events
        if (eventType === 'checkout.created' || eventType === 'checkout.updated' || eventType === 'order.created') {
            const data = payload.data;

            // Check if payment is successful
            const isPaid = data.status === 'succeeded' || eventType === 'order.created';

            console.log('💰 Payment Status:', isPaid ? 'PAID ✅' : 'PENDING ⏳');

            if (isPaid) {
                // Try to get user_id from metadata (if passed in checkout link)
                const userId = data.metadata?.user_id;
                const userEmail = data.customer_email || data.customer?.email || data.user?.email;

                console.log('🔍 Looking for user:', { userId, userEmail });

                if (userId) {
                    // Direct user ID match
                    const { error } = await supabase
                        .from('profiles')
                        .update({ is_donor: true })
                        .eq('id', userId);

                    if (error) {
                        console.error('❌ Error updating donor status by ID:', error);
                    } else {
                        console.log(`✅ User ${userId} marked as donor!`);
                    }
                } else if (userEmail) {
                    // Fallback: Find user by email in auth.users, then update profile
                    const { data: { users }, error: authError } = await supabase.auth.admin.listUsers();
                    const authUser = users?.find(u => u.email === userEmail);

                    if (authError || !authUser) {
                        console.error('❌ Could not find user by email:', userEmail, authError);
                    } else {
                        const { error: updateError } = await supabase
                            .from('profiles')
                            .update({ is_donor: true })
                            .eq('id', authUser.id);

                        if (updateError) {
                            console.error('❌ Error updating donor status by email:', updateError);
                        } else {
                            console.log(`✅ User ${authUser.id} (${userEmail}) marked as donor!`);
                        }
                    }
                } else {
                    console.warn('⚠️ Donation received but no user identifier found. Cannot link to profile.');
                }
            }
        }

        return res.status(200).json({ received: true });
    } catch (error) {
        console.error('💥 Webhook processing error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
