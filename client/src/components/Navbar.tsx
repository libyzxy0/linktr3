'use client';
import { useState } from 'react';
import { AlignJustify, X } from "lucide-react";
import Link from 'next/link';
import { ModeToggle } from '@/components/theme-toggle';

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const toggleMenu = () => {
    setOpen(!open);
  };

  return (
    <>
      <nav className="h-24 md:h-28 bg-white dark:bg-gray-950 md:h-16 flex items-center justify-between px-6 md:px-10">
        <h1 className="font-bold text-[1.7rem] text-gray-700 dark:text-white md:text-3xl">
          <span className="text-sky-400">Link</span>tr🌲
        </h1>
        <button
          onClick={toggleMenu}
          className="text-2xl text-gray-600 dark:text-white md:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X /> : <AlignJustify />}
        </button>
        <div className="hidden md:flex">
          <ModeToggle />
        </div>
        <ul className="hidden md:flex items-center space-x-4">
          <li className="font-medium text-lg text-gray-600 dark:text-white px-2 hover:text-sky-400 transition duration-300">
            Home
          </li>
          <li className="font-medium text-lg text-gray-600 dark:text-white px-2 hover:text-sky-400 transition duration-300">
            About
          </li>
          <Link href="/signup">
            <button className="bg-sky-400 rounded-lg px-4 py-2 font-medium text-white hover:bg-sky-500 transition duration-300">
              Sign up
            </button>
          </Link>
        </ul>
      </nav>
      <ul
        className={`flex flex-col items-center space-y-2 py-4 ${open ? 'block' : 'hidden'} md:hidden absolute top-14 left-0 right-0 bg-white dark:bg-gray-950 px-6 border-b dark:border-gray-800`}
      >
        <li className="w-full text-center py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition duration-300 font-medium text-lg text-gray-600 dark:text-white hover:text-sky-400">
          Home
        </li>
        <li className="w-full text-center py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition duration-300 font-medium text-lg text-gray-600 dark:text-white hover:text-sky-400">
          About
        </li>
        <Link href="/signup" className="w-full mb-5">
          <button className="w-full bg-sky-400 rounded-lg px-4 py-2 font-medium text-white hover:bg-sky-500 transition duration-300">
            Sign up
          </button>
        </Link>
        <div className="pt-3">
          <ModeToggle />
        </div>
      </ul>
    </>
  );
};
