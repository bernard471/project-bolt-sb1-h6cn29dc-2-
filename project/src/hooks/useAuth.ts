import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import type { User, AuthState } from '@/types/auth';

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    // Get initial session
    const initializeAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
          setAuthState({
            user: {
              id: session.user.id,
              email: session.user.email!,
              displayName: session.user.user_metadata.display_name,
              avatar: session.user.user_metadata.avatar_url,
              role: session.user.user_metadata.role || 'student',
              createdAt: session.user.created_at,
            },
            loading: false,
            error: null,
          });
        } else {
          setAuthState(state => ({ ...state, loading: false }));
        }
      } catch (error) {
        setAuthState({
          user: null,
          loading: false,
          error: error instanceof Error ? error.message : 'Authentication failed',
        });
      }
    };

    initializeAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          setAuthState({
            user: {
              id: session.user.id,
              email: session.user.email!,
              displayName: session.user.user_metadata.display_name,
              avatar: session.user.user_metadata.avatar_url,
              role: session.user.user_metadata.role || 'student',
              createdAt: session.user.created_at,
            },
            loading: false,
            error: null,
          });
        } else {
          setAuthState({
            user: null,
            loading: false,
            error: null,
          });
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return authState;
}