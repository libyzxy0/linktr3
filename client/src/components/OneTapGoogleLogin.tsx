'use client';
import axios from 'axios';
import Cookies from "js-cookie";
import { GoogleOAuthProvider, useGoogleOneTapLogin } from '@react-oauth/google';
import { useRouter } from 'next/navigation'

export function OneTapGoogleLogin() {
  return (
    <GoogleOAuthProvider clientId="504207588226-2cqdusdfn1prtd9fagep5gp90e9jqdb3.apps.googleusercontent.com">
      <OneTap />
    </GoogleOAuthProvider>
  )
}

function OneTap() {
  const router = useRouter();
  useGoogleOneTapLogin({
    onSuccess: async (credentials) => {
      console.log(credentials.credential);
      try {
        const { data } = await axios.post(
          'http://localhost:5000/api/oauth',
          { flow: 'one-tap' }, {
            headers: {
              'Authorization': `Bearer ${credentials.credential}`, 
              'Content-Type': 'application/json'
            }
        });
        
        if(data.success) {
          Cookies.set("authtoken", data.token, { expires: 7 });
          router.push('/dashboard');
        }
        
      } catch (error: any) {
        console.error('Failed to login using one tap by google:', error);
      }
    },
    onError: () => {
      console.error('An error occurred during Google One Tap login.');
    },
  });
  return (
    <></>
  );
}