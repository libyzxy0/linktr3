"use client";

import { Link, CheckCheck } from "lucide-react";
import { cn } from "@/utils/lib/cn";
import { useState } from "react";

type CopylinkProps = {
  className?: string;
  user: string;
};

export function Copylink({ user, className }: CopylinkProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (): Promise<void> => {
    if (!copied) {
      try {
        await navigator.clipboard.writeText(
          `${window.location.protocol}//${window.location.host}/me/${user}?from=copylink`,
        );
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 3000);
      } catch (err) {
        console.error("Error copying text to clipboard: ", err);
      }
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={cn(
        "text-gray-700 dark:text-white border-2 border-gray-100 p-2 border-none bg-gray-100 dark:bg-gray-800 transition-all duration-300 rounded-lg",
        className,
      )}
    >
      {copied ? (
        <CheckCheck className="w-5 h-5 text-green-400" />
      ) : (
        <Link className="w-5 h-5" />
      )}
    </button>
  );
}
