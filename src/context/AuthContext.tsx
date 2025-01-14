import React, { createContext, useContext, useState, useEffect } from 'react';
import { login as authLogin, logout as authLogout, getCurrentUser } from '../services/authService';
import type { User, AuthContextType } from '../types/auth';

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = async () => {
    const profile = await getCurrentUser();
    setUser(profile);
  };

  useEffect(() => {
    getCurrentUser()
      .then(setUser)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const login = async (email: string, password: string) => {
    const { user } = await authLogin(email, password);
    const profile = await getCurrentUser();
    if (!profile) throw new Error('No user profile found');
    setUser(profile);
  };

  const logout = async () => {
    await authLogout();
    setUser(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, refreshUser, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}