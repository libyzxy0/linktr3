'use client';

import { useRouter } from 'next/navigation'
import toast, { Toaster } from 'react-hot-toast';
import { useState, useEffect } from 'react';
import axios from 'axios';
import loginmockup from "@/assets/images/4957412_Mobile-login.svg";
import { Eye, EyeOff } from "lucide-react";
import Link from 'next/link'
import Image from 'next/image'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { OAuthButtons } from '@/components/OAuthButtons';
import { apiBase } from '@/constants';
import { SubmitButton } from '@/components/SubmitButton';
import { cookies } from 'next/headers'
import { makeLogin } from '@/app/actions';

// @ts-ignore
import { experimental_useFormState as useFormState  } from 'react-dom'

const initialState = {
  message: '',
  error: false
}

export default function Login() {
  const [state, formAction] = useFormState(makeLogin, initialState);
  const [show, setShow] = useState(false);
  const [password, setPassword] = useState("");
  const router = useRouter();
  
  useEffect(() => {
    if(state.message) {
      if(state.error) {
        toast.error(state.message);
      } else {
        toast.success(state.message);
        setTimeout(() => {
          router.push('/dashboard');
        }, 2000);
      }
      
    } 
  }, [state, toast]);

  
  return (
    <>
      <header className="mx-8 pt-20 bg-white dark:bg-gray-950">
        <h1 className="text-gray-700 text-3xl font-bold dark:text-white">
          Sign In | <b className="text-sky-400">Link</b>tr3🌲 
        </h1>
      </header>
      <div className="h-screen w-full bg-white dark:bg-gray-950 flex flex-col md:flex-row md:justify-between">
        <div className="pt-16 md:pt-24 flex flex-col w-full md:w-[50%]">
        <form action={formAction}>
          <div className="flex flex-col mx-8">
            <label className="font-medium text-gray-700 dark:text-white">Email/Username</label>
            <input
              name="email"
              className="outline-none py-2 rounded-lg hover:border-sky-400 mt-2 border-[1.5px] border-gray-200 px-4 bg-white dark:bg-gray-800 dark:border-gray-700"
              type="text"
              placeholder="john.doe@example.com / john.doe"
            />
          </div>
          <div className="flex flex-col mx-8 mt-5 relative">
            <label className="font-medium text-gray-700 dark:text-white">Password</label>
            <input
            onChange={(e) => setPassword(e.target.value)}
              name="password"
              className="outline-none py-2 rounded-lg hover:border-sky-400 mt-2 border-[1.5px] border-gray-200 px-4 bg-white dark:bg-gray-800 dark:border-gray-700"
              type={show ? "text" : "password"}
              placeholder="Mypassword@123"
            />
            {password && (
              <button
              type="button"
                onClick={() => setShow(!show)}
                className="absolute top-[2.6rem] right-[0.8rem] text-gray-700 dark:text-white"
              >
                {show ? <Eye /> : <EyeOff />}
              </button>
            )}
           
          </div>

          <div className="flex flex-col mx-8 mt-5">
            <SubmitButton>Sign In</SubmitButton>
          </div>
          </form>
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
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
      </>
  );
};