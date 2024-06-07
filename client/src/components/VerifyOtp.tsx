"use client";

import Image from "next/image";
import type { User } from "@/types";
import { verifyOtp } from "@/app/actions";
import { SubmitButton } from "@/components/SubmitButton";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

// @ts-ignore
import { experimental_useFormState as useFormState } from "react-dom";

export default function VerifyOtp({ user }: { user: User }) {
  const [state, formAction] = useFormState(verifyOtp, {
    message: "",
    error: false,
  });

  useEffect(() => {
    if (state?.message) {
      if (state.error) {
        toast.error(state.message);
      } else {
        toast.success(state.message);
      }
    }
  }, [state]);

  return (
    <>
      <main className="h-screen bg-white dark:bg-gray-950">
        <div className="h-[80vh] w-full bg-white dark:bg-gray-950 flex justify-center items-center">
          <div className="mt-10 text-center flex justify-center flex-col mx-6">
            <h1 className="text-gray-700 text-3xl font-bold dark:text-white">
              <b className="text-sky-400">Link</b>tr3🌲
            </h1>
            <h1 className="mt-12 text-gray-700 dark:text-white font-bold text-[26px]">
              Verify your <b className="text-sky-400">OTP</b>
            </h1>
            <p className="mt-3 text-gray-600 dark:text-gray-300 dark:text-gray-600">
              Hello <b className="text-sky-400">{user.email}</b>{" we've send otp to your email, please enter otp here"}
            </p>
            <form action={formAction}>
              <input type="email" name="email" className="hidden" value={user.email} />
              <input
                name="otp"
                className="outline-none py-2.5 rounded-lg hover:border-sky-400 mt-7 w-full border-[1.5px] border-gray-200 px-4 bg-white dark:bg-gray-800 dark:border-gray-700"
                type="text"
                placeholder="Enter your OTP" 
              />
              <SubmitButton className="mt-4">Continue</SubmitButton>
            </form>
          </div>
        </div>
      </main>
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}
