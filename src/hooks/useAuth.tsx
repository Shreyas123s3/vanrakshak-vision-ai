
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
        console.log('Auth state change:', event, session?.user?.email);
        setSession(session);
        
        if (session?.user) {
          // Fetch user profile from our profiles table
          const { data: profile, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();

          console.log('Profile fetch result:', { profile, error });

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
          } else if (error) {
            console.error('Error fetching profile:', error);
            // If profile doesn't exist, user might need to complete signup process
            setUser(null);
          }
        } else {
          setUser(null);
        }
        setIsLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('Initial session check:', session?.user?.email);
      if (!session) {
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
    
    console.log('Attempting signup for:', email);
    
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

    console.log('Signup result:', { data, error });
    setIsLoading(false);

    if (error) {
      console.error('Signup error:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    console.log('Attempting login for:', email);
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    console.log('Login result:', { data, error });
    setIsLoading(false);

    if (error) {
      console.error('Login error:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  };

  const logout = async () => {
    console.log('Logging out user');
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
