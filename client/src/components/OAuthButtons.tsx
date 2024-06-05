'use client';
import toast, { Toaster } from 'react-hot-toast';
import { LoaderCircle } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { useGoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import Cookies from "js-cookie";
import Image from 'next/image';

export const OAuthButtons = () => {
  return (
    <GoogleOAuthProvider clientId="504207588226-2cqdusdfn1prtd9fagep5gp90e9jqdb3.apps.googleusercontent.com">
    <OAuthBtn />
    </GoogleOAuthProvider>
  )
}

export const OAuthBtn = () => {
  const router = useRouter()
  const [gloading, setGLoading] = useState(false);
  const googleLogin = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: async (codeResponse) => {
      try {
        setGLoading(true);
      const { data } = await axios.post(
        'http://localhost:5000/api/oauth',
        { flow: 'auth-code' }, {
          headers: {
            'Authorization': `Bearer ${codeResponse.code}`, 
            'Content-Type': 'application/json'
          }
      });
      
      if(data.success){
        Cookies.set("authtoken", data.token, { expires: 7 });
        console.log('Token saved!', data.token)
        toast.success("Successfully logged in! redirecting to /dashboard...");
        setTimeout(() => {
          router.push('/dashboard');
        }, 1000)
      } else {
        toast.error('Error logging in using google');
      }
      } catch (error) {
        toast.error('Error logging in using google');
      } finally {
        setGLoading(false);
      }
    },
    onError: errorResponse => toast.error('Error logging in using google'),
  });
  
  return (
    <>
      <button
        disabled={gloading}
        type="button"
        onClick={googleLogin}
        className="inline-flex h-10 w-full items-center justify-center gap-2 rounded border border-slate-300 bg-white p-2 text-sm font-medium text-gray-700 outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60"
      >
      {gloading ? (
      <LoaderCircle className="animate-spin" />
      ): (
      <>
        <Image
          width={40}
          height={40}
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          alt="Google"
          className="h-[18px] w-[18px]"
        />
        Continue with Google
        </>
       ) 
      }
      </button>
      <button
        type="button"
        className="inline-flex h-10 w-full items-center justify-center gap-2 rounded border border-slate-300 p-2 text-sm font-medium bg-white outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60 mt-4 bg-gray-700"
      >
        <Image
          width={40}
          height={40}
          src="https://www.svgrepo.com/show/512317/github-142.svg"
          alt="GitHub"
          className="h-[18px] w-[18px]"
        />
        Continue with GitHub
      </button>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
    </>
  );
};


