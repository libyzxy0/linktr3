import type { User } from '@/types';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { cookies } from 'next/headers'
import axios from 'axios';

const apiBase = 'http://localhost:5000';

const initialUser = {
  id: '', 
  name: '', 
  username: '', 
  bio: '', 
  avatar: '', 
  email: '', 
  password: '',
  provider: ''
}

export const AuthContext = createContext<User>(initialUser);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(initialUser);
  const cookieStore = cookies();
  
  const getUser = async (): Promise<void> => {
    try {
    const token: string = cookieStore.get('token');
    const { data }: { data: User } = await axios.get(apiBase + '/api/get-session',
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );
    setUser(data);
    } catch (error: any) {
      setUser(initialUser);
      console.error("Failed to fetch user:", error);
    }
  }
  
  /* Fetch user on first render */
  useEffect(() => {
    getUser();
  }, []);
  
  
  /** 
   * This function makes user authenticated
   * @params {string} email - User email or username
   * @params {string} password - User password
   * @throws {AxiosError} When credentials aren't correct
   * 
   * Ang bumasa neto ay kupal!!
  **/
  
  const login = async (email, password) => {
    try {
      const { data } = await axios.post(apiBase + '/api/login', {
        email, 
        password
      }, { headers: { 'Content-Type': 'application/json' } });
      const token = data.jwt_token;
      
      /* Set JWT token into cookies */
      cookies().set({
        name: 'token',
        value: token,
        httpOnly: true,
        path: '/',
      })
      
      /* Refetch user after login */
      await getUser();
    } catch (error: any) {
      throw new Error(error);
      console.error('Failed to login:', error);
    }
  }
  
  /** 
   * This function makes account for a user
   * @params {string} name - User full name
   * @params {string} username - Unique identifier for a user
   * @params {string} email - User email or username
   * @params {string} password - User password
   * @throws {AxiosError} When credentials aren't correct
   * 
   * Ang bumasa neto ay kupal!!
  **/
  const signup = async (name, username, email, password) => {
    try {
      
    } catch (error: any) {
      throw new Error(error);
      console.error('Failed to login:', error);
    }
  }
  
  const logout = () => {
    setUser(initialUser);
  }
  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}