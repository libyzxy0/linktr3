"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import type { User } from '@/types';

interface AuthContextType {
  user: User;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  getUser: () => Promise<void>;
}

const initialUser: User = {
  id: '', 
  name: '', 
  username: '', 
  bio: '', 
  avatar: '', 
  email: '', 
  password: '',
  provider: ''
};

const initialAuthContext: AuthContextType = {
  user: initialUser,
  login: async () => {},
  signup: async () => {},
  logout: () => {},
  getUser: async () => {}
};

export const AuthContext = createContext<AuthContextType>(initialAuthContext);


const apiBase = 'http://localhost:5000';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(initialUser);

  const getUser = async (): Promise<void> => {
    try {
      const token = localStorage.getItem('authtoken');
      const { data }: { data: User } = await axios.get(apiBase + '/api/get-session', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setUser(data);
    } catch (error: any) {
      setUser(initialUser);
      console.error("Failed to fetch user:", error);
    }
  };

  /* Fetch user on first render */
  useEffect(() => {
    getUser();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const { data } = await axios.post(apiBase + '/api/login', {
        email, 
        password
      }, { headers: { 'Content-Type': 'application/json' } });
      const token = data.jwt_token;

      /* Set JWT token into localStorage */
      localStorage.setItem('authtoken', token);
      
      /* Refetch user after login */
      await getUser();
    } catch (error: any) {
      console.error('Failed to login:', error);
      throw new Error(error);
    }
  };

  const signup = async (name: string, username: string, email: string, password: string) => {
    try {
      const { data } = await axios.post(apiBase + '/api/signup', {
        name,
        username,
        email,
        password
      }, { headers: { 'Content-Type': 'application/json' } });
      const token = data.jwt_token;

    } catch (error: any) {
      console.error('Failed to signup:', error);
      throw new Error(error);
    }
  };

  const logout = () => {
    setUser(initialUser);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, getUser }}>
      {children}
    </AuthContext.Provider>
  );
}