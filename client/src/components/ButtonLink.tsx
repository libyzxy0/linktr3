import Link from "next/link";
import Image from "next/image";
import { cn } from "@/utils/lib/cn";
import React from "react";

type ButtonLinkProps = {
  className?: string;
  children: React.ReactNode;
  link: string;
  logo?: string;
};

export function ButtonLink({
  className,
  children,
  link,
  logo,
}: ButtonLinkProps) {
  return (
    <Link href={link}>
      <button
        className={cn(
          `relative text-white flex items-center text-lg rounded-full font-medium py-3 justify-center w-full transition-all duration-200 hover:opacity-90 my-3 shadow bg-sky-400 md:w-[25rem] md:mx-5`,
          className,
        )}
      >
        {logo && (
          <Image
            className="absolute left-2 rounded-full"
            width={40}
            height={40}
            src={logo}
            alt="Button Logo"
          />
        )}
        <span className="flex-1 text-center">{children}</span>
      </button>
    </Link>
  );
}
