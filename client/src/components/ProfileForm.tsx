"use client";

import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";
import { updateUser } from "@/app/actions";
import { SubmitButton } from "@/components/SubmitButton";
import { LogoutButton } from "@/components/LogoutButton";
import type { User } from "@/types";

// @ts-ignore
import { experimental_useFormState as useFormState } from "react-dom";

export default function ProfileForm({ user }: { user: User }) {
  const [state, formAction] = useFormState(updateUser, {
    message: "",
    error: false,
  });
  const [name, setName] = useState(user.name);
  const [username, setUsername] = useState(user.username);
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [bio, setBio] = useState(user.bio);

  useEffect(() => {
    if (state?.message) {
      if (state.error) {
        toast.error(state?.message);
      } else {
        toast.success(state.message);
      }
    }
  }, [state]);

  return (
    <>
      <form className="mt-20 md:mt-28" action={formAction}>
        <div className="flex flex-col mx-8 mt-5">
          <label className="font-medium text-gray-700 dark:text-white">
            Name
          </label>
          <input
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="outline-none py-2 rounded-lg hover:border-slate-400 mt-1 border-[1.5px] border-gray-200 px-4 bg-white dark:bg-gray-800 dark:border-gray-800"
            type="text"
          />
        </div>
        <div className="flex flex-col mx-8 mt-5">
          <label className="font-medium text-gray-700 dark:text-white">
            Username
          </label>
          <input
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="outline-none py-2 rounded-lg hover:border-slate-400 mt-1 border-[1.5px] border-gray-200 px-4 bg-white dark:bg-gray-800 dark:border-gray-800 placeholder-gray-700 dark:placeholder-gray-50"
            type="text"
          />
        </div>
        <div className="flex flex-col mx-8 mt-5">
          <label className="font-medium text-gray-700 dark:text-white">
            Bio
          </label>
          <textarea
            name="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="outline-none py-3 rounded-lg hover:border-slate-400 mt-1 border-[1.5px] border-gray-200 px-4 bg-white dark:bg-gray-800 dark:border-gray-800 resize-none"
            placeholder="Tell us a little bit of overview about yourself."
            rows={4}
          />
        </div>
        <div className="flex flex-col mx-8 mt-5">
          <label className="font-medium text-gray-700 dark:text-white">
            Email
          </label>
          <input
            name="email"
            value={user.email}
            className="outline-none py-2 rounded-lg hover:border-slate-400 mt-1 border-[1.5px] border-gray-200 px-4 bg-white dark:bg-gray-800 dark:border-gray-800"
            type="text"
            disabled
          />
        </div>
        <div className="flex flex-col mx-8 mt-5 relative">
          <label className="font-medium text-gray-700 dark:text-white">
            Password
          </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            name="password"
            className="outline-none py-2 rounded-lg hover:border-slate-400 mt-2 border-[1.5px] border-gray-200 px-4 bg-white dark:bg-gray-800 dark:border-gray-700"
            type={show ? "text" : "password"}
            placeholder="Enter new password"
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
          <SubmitButton>Save Changes</SubmitButton>
        </div>
      </form>
      <div className="flex flex-col mx-8 mt-5">
        <LogoutButton>Logout</LogoutButton>
      </div>
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}
