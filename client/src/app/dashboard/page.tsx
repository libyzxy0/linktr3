import { cookies } from "next/headers";
import axios from "axios";
import type { User } from "@/types";
import { apiBase } from "@/constants";
import { ModeToggle } from "@/components/theme-toggle";
import { Footer } from "@/components/Footer";
import UpdateUsername from "@/components/UpdateUsername";
import Link from "next/link";
import { ProfileAvatar } from "@/components/ProfileAvatar";
import { DashboardButtons } from "@/components/DashboardButtons";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Linktr3 | Dashboard",
  description: "Manage your things!",
};

export default async function Dashboard() {
  const cookieStore = cookies();
  const token = cookieStore.get("authtoken");
  const { data: user }: { data: User } = await axios.get(
    apiBase + "/api/get-session",
    {
      params: {
        links: true
      },
      headers: {
        Authorization: `Bearer ${token?.value}`,
      },
    },
  );

  if (!user.username) {
    return <UpdateUsername user={user} />;
  }

  return (
    <>
      <div className="flex flex-col min-h-screen bg-white dark:bg-gray-950">
        <nav className="sticky top-0 flex items-center justify-between h-16 border-b border-gray-200 dark:border-gray-800 z-40 bg-white dark:bg-gray-950">
          <h1 className="font-bold text-[1.7rem] text-gray-700 dark:text-white md:text-3xl mx-4">
            <span className="text-sky-400">Link</span>tr3🌲
          </h1>
          <div className="flex flex-row items-center space-x-3 mx-4">
            <ModeToggle />
            {user && (
              <ProfileAvatar
                avatar={user ? user.avatar : "https://http.cat/404"}
                name={user ? user.name : "AE"}
              />
            )}
          </div>
        </nav>

        <main className="flex-grow pt-8 mx-6 md:mx-10">
          <div>
            <h3 className="font-medium text-[17px] text-gray-700 dark:text-white">
              Welcome back 🎉
            </h3>
            <span>
              <h1 className="text-[25px] text-gray-700 font-bold dark:text-white">
                {user.name}
              </h1>
              <Link
                href={"https://linktr3.vercel.app/me/" + user.username}
                className="text-[14px] text-sky-400 mt-2"
              >
                https://linktr3.vercel.app/me/{user.username}
              </Link>
            </span>
          </div>

          <div className="mt-8 flex flex-col md:flex-row md:justify-between md:space-x-12">
            <ul className="w-full md:w-[50%] flex flex-col space-y-4">
              <h1 className="text-[20px] font-bold text-gray-700 dark:text-white w-full mb-2">
                Analytics
              </h1>
              <li className="flex items-center justify-between">
                <h1 className="text-gray-700 dark:text-white font-medium">
                  Total Visits
                </h1>
                <h1 className="text-gray-700 dark:text-white font-bold">
                  {user.visits}
                </h1>
              </li>
              <li className="flex items-center justify-between">
                <h1 className="text-gray-700 dark:text-white font-medium">
                  Total Clicks
                </h1>
                <h1 className="text-gray-700 dark:text-white font-bold">
                  0
                </h1>
              </li>
              <li className="flex items-center justify-between">
                <h1 className="text-gray-700 dark:text-white font-medium">
                  Total Links
                </h1>
                <h1 className="text-gray-700 dark:text-white font-bold">{user.links ? user.links.length : 0}</h1>
              </li>
              <li className="flex items-center justify-between">
                <h1 className="text-gray-700 dark:text-white font-medium">
                  Total Cards
                </h1>
                <h1 className="text-gray-700 dark:text-white font-bold">0</h1>
              </li>
            </ul>

            <div className="w-full md:w-[50%]">
              <h1 className="mt-7 md:mt-0 text-[20px] font-bold text-gray-700 dark:text-white w-full">
                Manage
              </h1>
              <DashboardButtons />
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
