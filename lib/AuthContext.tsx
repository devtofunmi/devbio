import React, { createContext, useContext, useEffect } from 'react';
import { User, Session, SupabaseClient } from '@supabase/supabase-js';
import { useSessionContext, useUser } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router';

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

    useEffect(() => {
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange(async (event: string) => {
            if (event === 'SIGNED_IN') {
                const redirect = router.query.redirect as string;
                if (redirect) router.push(redirect);
            }
        });

        return () => subscription.unsubscribe();
    }, [router, supabase]);

    const signOut = async () => {
        await supabase.auth.signOut();
        router.push('/login');
    };

    return (
        <AuthContext.Provider value={{ user, session, loading, signOut, supabase }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);