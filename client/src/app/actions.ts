'use server';
import axios from 'axios';
import { cookies } from 'next/headers'
import {apiBase} from '@/constants';
import { revalidatePath } from 'next/cache'

export async function makeLogin(_currentData: any, formData: FormData) {
    try {
      console.log(formData)
      const { data } = await axios.post(apiBase + '/api/login', {
        email: formData.get('email'), 
        password: formData.get('password')
      }, { headers: { 'Content-Type': 'application/json' } });
      const token = data.jwt_token;
      console.log("Token saved:", token);
      cookies().set({
        name: 'authtoken',
        value: token,
        httpOnly: true,
        path: '/'
      })
      return {
        error: false, 
        message: 'Successfully logged in',
      }
    } catch (error: any) {
      console.error('Failed to login:', error);
      return {
        error: true, 
        message: error.response ? error.response.data.message : error.message,
      }
    }
    
  }
  
export async function createUser(_currentData, formData: FormData) {
    try {
      console.log(formData)
      const { data } = await axios.post(apiBase + '/api/register', {
        name: formData.get('name'),
        username: formData.get('username'),
        email: formData.get('email'), 
        password: formData.get('password'), 
        avatar: '', 
        bio: ''
      }, { headers: { 'Content-Type': 'application/json' } });
      return {
        error: false, 
        message: data.message,
      }
    } catch (error: any) {
      console.error('Failed to create your account:', error);
      return {
        error: true, 
        message: error.response ? error.response.data.message : error.message,
      }
    }
    
  }
  
export async function updateUsername(_currentData, formData: FormData) {
  try {
    const cookieStore = cookies()
    const token = cookieStore.get('authtoken');
      const { data } = await axios.post(apiBase + '/api/update-user', {
        username: formData.get('username'),
      }, { headers: { 'Authorization': `Bearer ${token.value}`, 'Content-Type': 'application/json' } });
      revalidatePath('/dashboard');
      return {
        error: false, 
        message: data.message,
      }
    } catch (error: any) {
      console.error('Failed to create your account:', error);
      return {
        error: true, 
        message: error.response ? error.response.data.message : error.message,
      }
    }
} 