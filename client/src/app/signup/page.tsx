"use client";

import { useSearchParams } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { useState, useEffect } from "react";
import axios from "axios";
import loginmockup from "@/assets/images/4957412_Mobile-login.svg";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { OAuthButtons } from "@/components/OAuthButtons";
import { apiBase } from "@/constants";
import { SubmitButton } from "@/components/SubmitButton";
import { cookies } from "next/headers";
import { createUser } from "@/app/actions";
import { useRouter } from "next/navigation";

// @ts-ignore
import { experimental_useFormState as useFormState } from "react-dom";

const initialState = {
  message: "",
  error: false,
};

export default function Signup() {
  const searchParams = useSearchParams();
  const suser = searchParams.get("create");
  const [creusername, setCUser] = useState(suser ? suser : "");

  const [state, formAction] = useFormState(createUser, initialState);
  const [show, setShow] = useState(false);
  const [password, setPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (state?.message) {
      if (state.error) {
        toast.error(state.message);
      } else {
        toast.success(state.message);
        setTimeout(() => {
          router.push("/dashboard");
        }, 1000);
      }
    }
  }, [state, router]);

  return (
    <>
      <header className="w-full px-8 pt-20 bg-white dark:bg-gray-950">
        <h1 className="text-gray-700 text-3xl font-bold dark:text-white">
          Create Account | <b className="text-sky-400">Link</b>tr3🌲
        </h1>
      </header>
      <div className="h-screen w-full bg-white dark:bg-gray-950 flex flex-col md:flex-row md:justify-between">
        <div className="pt-16 md:pt-24 flex flex-col w-full md:w-[50%]">
          <form action={formAction}>
            <div className="flex flex-col mx-8">
              <label className="font-medium text-gray-700 dark:text-white">
                Full Name
              </label>
              <input
                name="name"
                className="outline-none py-2 rounded-lg hover:border-sky-400 mt-2 border-[1.5px] border-gray-200 px-4 bg-white dark:bg-gray-800 dark:border-gray-700"
                type="text"
                placeholder="John Doe"
              />
            </div>
            <div className="flex flex-col mx-8 mt-5">
              <label className="font-medium text-gray-700 dark:text-white">
                Username
              </label>
              <input
                onChange={(e) => setCUser(e.target.value)}
                value={creusername ? creusername : ""}
                name="username"
                className="outline-none py-2 rounded-lg hover:border-sky-400 mt-2 border-[1.5px] border-gray-200 px-4 bg-white dark:bg-gray-800 dark:border-gray-700"
                type="text"
                placeholder="john.doe"
              />
            </div>
            <div className="flex flex-col mx-8 mt-5">
              <label className="font-medium text-gray-700 dark:text-white">
                Email
              </label>
              <input
                name="email"
                className="outline-none py-2 rounded-lg hover:border-sky-400 mt-2 border-[1.5px] border-gray-200 px-4 bg-white dark:bg-gray-800 dark:border-gray-700"
                type="email"
                placeholder="john.doe@example.com"
              />
            </div>
            <div className="flex flex-col mx-8 mt-5 relative">
              <label className="font-medium text-gray-700 dark:text-white">
                Password
              </label>
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
              <SubmitButton>Create Account</SubmitButton>
            </div>
          </form>
          <h1 className="text-center mt-6 text-gray-600 dark:text-white">
            {"Already have an account?"}{" "}
            <Link className="text-sky-400 hover:underline" href={`/login`}>
              Sign In
            </Link>
          </h1>

          <h1 className="text-center my-4">OR</h1>

          <div className="flex flex-col mx-8 mt-2">
            <OAuthButtons />
          </div>
        </div>

        <div className="pt-0 hidden md:inline-block md:w-[50%]">
          <Image
            className=""
            src={loginmockup}
            alt="Mockup image from freepik"
          />
        </div>
      </div>
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}
