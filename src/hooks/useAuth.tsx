
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User as SupabaseUser, Session } from '@supabase/supabase-js';
import { User, AuthState, UserRole } from '@/types/user';

export const useAuth = (): AuthState & {
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (email: string, password: string, name: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
} => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        
        if (session?.user) {
          // Fetch user profile from our profiles table
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();

          if (profile) {
            const userData: User = {
              id: profile.id,
              email: profile.email,
              name: profile.name,
              role: profile.role as UserRole,
              department: profile.department || undefined,
              location: profile.location || undefined,
              permissions: getRolePermissions(profile.role),
              createdAt: profile.created_at,
              lastLogin: new Date().toISOString()
            };
            setUser(userData);
          }
        } else {
          setUser(null);
        }
        setIsLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        // The onAuthStateChange will handle setting the user
      } else {
        setIsLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const getRolePermissions = (role: string): string[] => {
    switch (role) {
      case 'admin':
        return ['full_access', 'user_management', 'system_settings'];
      case 'ranger':
        return ['submit_reports', 'emergency_tools', 'field_operations'];
      case 'ngo':
        return ['view_analytics', 'review_reports', 'research_access'];
      case 'public':
        return ['view_public_data', 'submit_sightings'];
      default:
        return [];
    }
  };

  const signup = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: name
        },
        emailRedirectTo: `${window.location.origin}/`
      }
    });

    setIsLoading(false);

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    setIsLoading(false);

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  };

  const logout = async () => {
    await supabase.auth.signOut();
  };

  return {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    signup,
    logout
  };
};
