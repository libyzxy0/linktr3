'use client';
import { useEffect } from 'react';
import toast, { Toaster } from "react-hot-toast";
import axios from 'axios';
import loginmockup from "@/assets/images/4957412_Mobile-login.svg";
import { useState } from "react";
import { Eye, EyeOff, LoaderCircle } from "lucide-react";
import Link from 'next/link'
import Image from 'next/image'
import { useGoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  
  return (
    <GoogleOAuthProvider clientId="504207588226-2cqdusdfn1prtd9fagep5gp90e9jqdb3.apps.googleusercontent.com">
      <header className="mx-8 pt-20 bg-white dark:bg-gray-950">
        <h1 className="text-gray-700 text-3xl font-bold dark:text-white">
          Sign In | <b className="text-sky-400">Link</b>tr3🌲
        </h1>
      </header>
      <div className="h-screen w-full bg-white dark:bg-gray-950 flex flex-col md:flex-row md:justify-between">
        <div className="pt-16 md:pt-24 flex flex-col w-full md:w-[50%]">
          <div className="flex flex-col mx-8">
            <label className="font-medium text-gray-700 dark:text-white">Email/Username</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="outline-none py-2 rounded-lg hover:border-sky-400 mt-2 border-[1.5px] border-gray-200 px-4 bg-white dark:bg-gray-800 dark:border-gray-700"
              type="email"
              placeholder="john.doe@example.com / john.doe"
            />
          </div>
          <div className="flex flex-col mx-8 mt-5 relative">
            <label className="font-medium text-gray-700 dark:text-white">Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="outline-none py-2 rounded-lg hover:border-sky-400 mt-2 border-[1.5px] border-gray-200 px-4 bg-white dark:bg-gray-800 dark:border-gray-700"
              type={show ? "text" : "password"}
              placeholder="Mypassword@123"
            />
            {password && (
              <button
                onClick={() => setShow(!show)}
                className="absolute top-[2.6rem] right-[0.8rem] text-gray-700 dark:text-white"
              >
                {show ? <Eye /> : <EyeOff />}
              </button>
            )}
          </div>

          <div className="flex flex-col mx-8 mt-5">
            <button
              className="w-full border-none rounded-lg bg-sky-400 py-2.5 text-white font-medium flex justify-center"
            >
              {loading ? <LoaderCircle className="animate-spin" /> : <p>Sign In</p>}
            </button>
          </div>
          <h1 className="text-center mt-6 text-gray-600 dark:text-white">
            {"Don't have an account?"} {" "}
            <Link
              className="text-sky-400 hover:underline"
              href={`/signup`}
            >
              Sign up
            </Link>
          </h1>

          <h1 className="text-center my-4">OR</h1>

          <div className="flex flex-col mx-8 mt-2">
            <OAuthButtons />
          </div>
        </div>

        <div className="pt-0 hidden md:inline-block md:w-[50%]">
          <Image className="" src={loginmockup} alt="Mockup image from freepik" />
        </div>
      </div>
      <Toaster position="top-right" reverseOrder={false} />
    </GoogleOAuthProvider>
  );
};

const OAuthButtons = () => {
  const googleLogin = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: async (codeResponse) => {
      try {
      const { data } = await axios.post(
        'http://localhost:5000/api/oauth',
        { flow: 'auth-code' }, {
          headers: {
            'Authorization': `Bearer ${codeResponse.code}`, 
            'Content-Type': 'application/json'
          }
      });
      
      if(data.success){
        localStorage.setItem('authtoken', data.token);
        console.log('Token saved!', data.token)
        toast.success("Successfully logged in!");
      } else {
        toast.error('Error logging in using google');
      }
      } catch (error) {
        toast.error('Error logging in using google');
      }
    },
    onError: errorResponse => toast.error('Error logging in using google'),
  });
  
  return (
    <>
      <button
        onClick={googleLogin}
        className="inline-flex h-10 w-full items-center justify-center gap-2 rounded border border-slate-300 bg-white p-2 text-sm font-medium text-gray-700 outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <Image
          width={40}
          height={40}
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          alt="Google"
          className="h-[18px] w-[18px]"
        />
        Continue with Google
      </button>
      <button
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
    </>
  );
};

export default Login;
