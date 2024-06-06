"use client";

import { cn } from "@/utils/lib/cn";
import React from "react";
import { handleLogout } from "@/app/actions";

export function LogoutButton({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <form action={handleLogout}>
      <button
        type="submit"
        className={cn(
          "w-full border-none rounded-lg bg-red-500 py-2.5 text-white font-medium flex justify-center",
          className,
        )}
      >
        {children}
      </button>
    </form>
  );
}
