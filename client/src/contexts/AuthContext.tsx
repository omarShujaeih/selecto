import React, { createContext, useContext, useState } from 'react';
import { User } from '@/data/mockData';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, role: 'customer' | 'restaurant' | 'admin') => void;
  logout: () => void;
  register: (name: string, email: string, password: string, role: 'customer' | 'restaurant') => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, password: string, role: 'customer' | 'restaurant' | 'admin') => {
    // Mock login - in real app, this would call an API
    const mockUser: User = {
      id: `user-${Date.now()}`,
      name: email.split('@')[0],
      email,
      role,
      phone: '+1234567890',
      address: role === 'customer' ? '123 Main St, City' : undefined,
      favorites: [],
    };
    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const register = (name: string, email: string, password: string, role: 'customer' | 'restaurant') => {
    // Mock registration
    const newUser: User = {
      id: `user-${Date.now()}`,
      name,
      email,
      role,
      phone: '',
      address: role === 'customer' ? '' : undefined,
      favorites: [],
    };
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
