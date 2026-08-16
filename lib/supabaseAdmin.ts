import { createClient } from "@supabase/supabase-js";

// Server-only service-role client. Bypasses RLS, so it must NEVER be imported
// into client-side code — use it only inside API routes / server code that has
// already authorized the caller.
export const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.SUPABASE_SERVICE_ROLE_KEY as string,
    { auth: { persistSession: false, autoRefreshToken: false } }
);
