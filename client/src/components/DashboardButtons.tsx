"use client";

import { useRouter } from "next/navigation";

export function DashboardButtons() {
  const router = useRouter();
  return (
    <>
      <div
        onClick={() => router.push("/dashboard/links")}
        className="w-full p-5 bg-indigo-400 shadow rounded-xl mt-7 hover:opacity-90 transition-all duration-300 hover:-translate-y-2"
      >
        <h1 className="text-2xl font-semibold text-white">My Links</h1>
        <p className="font-medium text-md mt-2 text-white">
          Click here to manage all of your links.
        </p>
      </div>
      <div
        onClick={() => router.push("/dashboard/cards")}
        className="w-full p-5 bg-green-400 shadow rounded-xl mt-5 hover:opacity-90 transition-all duration-300 hover:-translate-y-2"
      >
        <h1 className="text-2xl font-semibold text-white">My Cards</h1>
        <p className="font-medium text-md mt-2 text-white">
          Click here to manage all of your cards.
        </p>
      </div>
    </>
  );
}
