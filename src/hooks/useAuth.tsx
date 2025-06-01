
import { useState, useEffect } from 'react';
import { authService } from '@/services/authService';
import { User, AuthState } from '@/types/user';

export const useAuth = (): AuthState & {
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
} => {
  const [authState, setAuthState] = useState<AuthState>({
    user: authService.getCurrentUser(),
    isAuthenticated: !!authService.getCurrentUser(),
    isLoading: false
  });

  useEffect(() => {
    const unsubscribe = authService.subscribe((user: User | null) => {
      setAuthState({
        user,
        isAuthenticated: !!user,
        isLoading: false
      });
    });

    return unsubscribe;
  }, []);

  const login = async (email: string, password: string) => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    const result = await authService.login(email, password);
    setAuthState(prev => ({ ...prev, isLoading: false }));
    return result;
  };

  const logout = () => {
    authService.logout();
  };

  return {
    ...authState,
    login,
    logout
  };
};
