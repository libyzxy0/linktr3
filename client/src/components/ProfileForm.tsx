'use client';

import React, { useEffect, useState } from 'react';
import toast, {Toaster} from 'react-hot-toast';
import { updateUser } from '@/app/actions';
import { SubmitButton } from '@/components/SubmitButton';
import type { User } from '@/types';

// @ts-ignore
import { experimental_useFormState as useFormState } from 'react-dom';

export default function ProfileForm({ user }: { user: User }) {
  const [state, formAction] = useFormState(updateUser, { message: '', error: false });
  const [name, setName] = useState(user.name);
  const [username, setUsername] = useState(user.username);
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
      <form className="mt-24" action={formAction}>
        <div className="flex flex-col mx-8 mt-5">
          <label className="font-medium text-gray-700 dark:text-white">Name</label>
          <input
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="outline-none py-2 rounded-lg hover:border-slate-400 mt-1 border-[1.5px] border-gray-200 px-4 bg-white dark:bg-gray-800 dark:border-gray-700 placeholder-gray-700 dark:placeholder-gray-50"
            type="text"
          />
        </div>
        <div className="flex flex-col mx-8 mt-5">
          <label className="font-medium text-gray-700 dark:text-white">Username</label>
          <input
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="outline-none py-2 rounded-lg hover:border-slate-400 mt-1 border-[1.5px] border-gray-200 px-4 bg-white dark:bg-gray-800 dark:border-gray-700 placeholder-gray-700 dark:placeholder-gray-50"
            type="text"
          />
        </div>
        <div className="flex flex-col mx-8 mt-5">
          <label className="font-medium text-gray-700 dark:text-white">Bio</label>
          <textarea
            name="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="outline-none py-3 rounded-lg hover:border-slate-400 mt-1 border-[1.5px] border-gray-200 px-4 bg-white dark:bg-gray-800 dark:border-gray-700 resize-none placeholder-gray-700 dark:placeholder-gray-50"
            rows={4}
          />
        </div>
        <div className="flex flex-col mx-8 mt-5">
          <label className="font-medium text-gray-700 dark:text-white">Email</label>
          <input
            name="email"
            value={user.email}
            className="outline-none py-2 rounded-lg hover:border-slate-400 mt-1 border-[1.5px] border-gray-200 px-4 bg-white dark:bg-gray-800 dark:border-gray-700"
            type="text"
            disabled
          />
        </div>
        <div className="flex flex-col mx-8 mt-5">
          <SubmitButton
            type="submit"
          >
            Save Changes
          </SubmitButton>
        </div>
      </form>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
    </>
  );
}
