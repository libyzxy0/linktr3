"use client";

import { useRef, useState, useEffect } from "react";
import { ModeToggle } from "@/components/theme-toggle";
import { ButtonBack } from "@/components/ButtonBack";
import { SubmitButton } from "@/components/SubmitButton";
import { createLink } from "@/app/actions";
import toast, { Toaster } from "react-hot-toast";

// @ts-ignore
import { experimental_useFormState as useFormState } from "react-dom";

export function LinkCreateForm() {
  const logo = useRef(null);
  const [state, formAction] = useFormState(createLink, {
    message: "",
    error: false,
  });
  const [fileName, setFileName] = useState("Upload logo");

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setFileName(event.target.files[0].name);
    }
  };

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
      <form
        action={formAction}
        className="shadow bg-white dark:bg-gray-900 w-full p-5 rounded-md flex flex-col justify-center"
      >
        <h1 className="text-gray-700 dark:text-white font-medium text-xl mb-3">
          Create New
        </h1>
        <input
          name="name"
          type="text"
          className="w-full px-4 py-2 rounded-lg border-[1.5px] border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 focus:outline-none dark:placeholder-gray-500"
          placeholder="Enter name for this link"
        />
        <input
          name="url"
          type="url"
          className="mt-3 w-full px-4 py-2 rounded-lg border-[1.5px] border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 focus:outline-none dark:placeholder-gray-500"
          placeholder="https://github.com/libyzxy0"
        />

        <button
          onClick={() => logo.current?.click()}
          type="button"
          className={`w-full border-[1.5px] border-gray-200 dark:border-gray-800 rounded-lg py-2 font-medium mt-3 px-4 text-left ${
            fileName !== "Upload logo"
              ? "text-gray-700 dark:text-white"
              : "text-gray-400 dark:text-gray-500"
          }`}
        >
          {fileName}
        </button>

        <input
          ref={logo}
          onChange={handleFileChange}
          type="file"
          name="logo"
          className="hidden"
        />

        <SubmitButton className="mt-4 mb-1 py-2">Create</SubmitButton>
      </form>
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}
