"use client";
import { LoaderCircle } from "lucide-react";
import { cn } from "@/utils/lib/cn";
import React from "react";

// @ts-ignore
import { experimental_useFormStatus as useFormStatus } from "react-dom";

export function SubmitButton({
  className,
  ignoreClass,
  children,
}: {
  className?: string;
  ignoreClass?: boolean;
  children: React.ReactNode;
}) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className={
        ignoreClass
          ? className
          : cn(
              "w-full border-none rounded-lg bg-sky-400 py-2.5 text-white font-medium flex justify-center",
              className,
            )
      }
    >
      {pending ? <LoaderCircle className="animate-spin" /> : <p>{children}</p>}
    </button>
  );
}
