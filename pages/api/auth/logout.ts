
import { createPagesServerClient } from '@supabase/auth-helpers-nextjs';
import { NextApiHandler } from 'next';

const handler: NextApiHandler = async (req, res) => {
    const supabase = createPagesServerClient({ req, res });

    // Attempt to sign out on the server
    await supabase.auth.signOut();

    // Manually force clear all Supabase-related cookies
    // This is a fallback because sometimes auth.signOut() doesn't clear cookies if the session is already invalid (403)
    const cookies = req.cookies;
    const supabaseCookies = Object.keys(cookies).filter(name => name.startsWith('sb-'));

    if (supabaseCookies.length > 0) {
        // Construct Set-Cookie headers to expire these cookies
        const expiredCookies = supabaseCookies.map(name =>
            `${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; SameSite=Lax`
        );
        // Combine with any existing Set-Cookie headers (though typically signOut clears them too)
        const existing = res.getHeader('Set-Cookie');
        const previousCookies = Array.isArray(existing) ? existing : (existing ? [String(existing)] : []);

        res.setHeader('Set-Cookie', [...previousCookies, ...expiredCookies]);
    }

    // If the method was GET (e.g. direct navigation), redirect
    if (req.method === 'GET') {
        res.redirect('/login');
    } else {
        // If POST/others, return success
        res.status(200).json({ success: true });
    }
};

export default handler;
