import React, { createContext, useContext, useEffect } from 'react';
import { User, Session, SupabaseClient } from '@supabase/supabase-js';
import { useSessionContext, useUser } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

interface AuthContextType {
    user: User | null;
    session: Session | null;
    loading: boolean;
    signOut: () => Promise<void>;
    supabase: SupabaseClient;
}


const AuthContext = createContext<AuthContextType>({
    user: null,
    session: null,
    loading: true,
    signOut: async () => { },
    supabase: null as unknown as SupabaseClient,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { session, isLoading: loading, supabaseClient: supabase } = useSessionContext();
    const user = useUser();
    const router = useRouter();

    const lastToastRef = React.useRef<number>(0);

    useEffect(() => {
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange(async (event, session) => {
            if (event === 'SIGNED_IN') {
                const now = Date.now();
                const shouldToast = now - lastToastRef.current > 2000;

                const redirect = router.query.redirect as string;

                // Check if this is an email verification (claim page or has token in URL)
                const isEmailVerification = router.pathname === '/claim' ||
                    (typeof window !== 'undefined' && window.location.hash.includes('type=signup'));

                // Show success message if user coming from a public page (home, login, signup)
                // or if user just landed on the dashboard with a hash (OAuth callback)
                const isComingFromAuth = ['/login', '/signup'].includes(router.pathname);
                const isOAuthCallback = router.pathname === '/dashboard' && typeof window !== 'undefined' && window.location.hash.includes('access_token');

                if ((isComingFromAuth || isOAuthCallback || isEmailVerification) && shouldToast) {
                    const message = isEmailVerification
                        ? 'Email verified successfully! 🎉'
                        : 'Successfully signed in!';
                    toast.success(message);
                    lastToastRef.current = now;
                }

                if (redirect) {
                    router.push(redirect);
                } else if (isComingFromAuth || isOAuthCallback) {
                    // Check if user has a username to decide where to redirect
                    const { data: profile } = await supabase
                        .from('profiles')
                        .select('username')
                        .eq('id', session?.user?.id)
                        .maybeSingle();

                    if (!profile?.username) {
                        router.push('/claim');
                    } else if (isComingFromAuth) {
                        const welcome = router.query.welcome;
                        router.push({
                            pathname: '/dashboard',
                            query: welcome === 'true' ? { welcome: 'true' } : {}
                        });
                    }
                }
            } else if (event === 'SIGNED_OUT') {
                // If the user logs out or session expires, and they are in a protected area,
                // force them back to the login page.
                const isProtectedRoute = router.pathname.startsWith('/dashboard') || router.pathname === '/claim';
                if (isProtectedRoute) {
                    window.location.href = '/login';
                }
            }
        });

        return () => subscription.unsubscribe();
    }, [supabase, router]); // Keep router so we have fresh path info, but throttle toast

    const signOut = async () => {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) {
                console.warn("Sign out error (often occurs if already logged out):", error.message);
            }
        } catch (err) {
            console.error("Unexpected error during sign out:", err);
        } finally {
            // Force a hard reload to the login page to clear all local state and cookies
            window.location.href = '/login';
        }
    };

    return (
        <AuthContext.Provider value={{ user, session, loading, signOut, supabase }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);