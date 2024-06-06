"use client";

import { useRef, useState, useEffect } from "react";
import { Pencil, LoaderCircle } from "lucide-react";
import { updateUser } from "@/app/actions";
import toast, { Toaster } from "react-hot-toast";

// @ts-ignore
import { experimental_useFormState as useFormState } from "react-dom";

export function ButtonProfilePic() {
  const picture = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [state, formAction] = useFormState(updateUser, {
    message: "",
    error: false,
  });

  useEffect(() => {
    if (state?.message) {
      setLoading(false);
    }
  }, [state]);

  const handleFileChange = () => {
    if (picture.current?.files && picture.current.files.length > 0) {
      if (!picture.current.files[0].type.startsWith("image/")) {
        toast.error("Images are only allowed to be upload");
        picture.current.value = "";
        return;
      }
      const formData = new FormData();
      formData.append("avatar", picture.current.files[0]);
      formAction(formData);
      setLoading(true);
    }
  };

  const handleClick = () => {
    picture.current?.click();
  };

  return (
    <div>
      <button
        type="button"
        onClick={handleClick}
        className="absolute bg-gray-50 dark:bg-gray-800 rounded-lg p-1.5 ml-28 top-[1rem] text-gray-700 dark:text-white shadow md:ml-44 md:p-2 md:top-[1.9rem]"
      >
        {loading ? (
          <LoaderCircle className="h-5 w-5 md:w-7 md:h-7 animate-spin" />
        ) : (
          <Pencil className="h-5 w-5 md:w-7 md:h-7" />
        )}
      </button>
      <input
        ref={picture}
        onChange={handleFileChange}
        type="file"
        name="avatar"
        className="hidden"
        accept="image/*"
      />
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}

export function ButtonCoverPic() {
  const picture = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [state, formAction] = useFormState(updateUser, {
    message: "",
    error: false,
  });

  useEffect(() => {
    if (state?.message) {
      setLoading(false);
    }
  }, [state]);

  const handleFileChange = () => {
    if (picture.current?.files && picture.current.files.length > 0) {
      if (!picture.current.files[0].type.startsWith("image/")) {
        toast.error("Images are only allowed to be upload");
        picture.current.value = "";
        return;
      }
      const formData = new FormData();
      formData.append("cover", picture.current.files[0]);
      formAction(formData);
      setLoading(true);
    }
  };

  const handleClick = () => {
    picture.current?.click();
  };

  return (
    <div>
      <button
        type="button"
        onClick={handleClick}
        className="bg-gray-50 dark:bg-gray-800 rounded-lg py-1.5 px-4 shadow"
      >
        <h1 className="font-normal text-lg text-gray-700 dark:text-white md:text-2xl">
          {loading ? (
            <div className="flex flex-row items-center justify-center">
              <LoaderCircle className="h-5 w-5 md:w-7 md:h-7 animate-spin mr-1" />
              Uploading
            </div>
          ) : (
            "Upload cover"
          )}
        </h1>
      </button>
      <input
        ref={picture}
        onChange={handleFileChange}
        type="file"
        name="cover"
        className="hidden"
        accept="image/*"
      />
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}
