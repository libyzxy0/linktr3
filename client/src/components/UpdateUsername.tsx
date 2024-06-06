"use client";

import Image from "next/image";
import type { User } from "@/types";
import { updateUsername } from "@/app/actions";
import { SubmitButton } from "@/components/SubmitButton";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

// @ts-ignore
import { experimental_useFormState as useFormState } from "react-dom";

export default function UpdateUsername({ user }: { user: User }) {
  const [state, formAction] = useFormState(updateUsername, {
    message: "",
    error: false,
  });

  useEffect(() => {
    if (state.message) {
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
              Setup your <b className="text-sky-400">Username</b>
            </h1>
            <p className="mt-3 text-gray-600 dark:text-gray-300 dark:text-gray-600">
              Hello there <b className="text-sky-400">{user.email}</b> please
              setup your username to continue with Linktr3
            </p>
            <form action={formAction}>
              <input
                name="username"
                className="outline-none py-2.5 rounded-lg hover:border-sky-400 mt-7 w-full border-[1.5px] border-gray-200 px-4 bg-white dark:bg-gray-800 dark:border-gray-700"
                type="text"
                placeholder="Enter your username"
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
