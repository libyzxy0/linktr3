import { ModeToggle } from "@/components/theme-toggle";
import { ButtonBack } from "@/components/ButtonBack";
import { LinkCreateForm } from "@/components/LinkCreateForm";
import Image from "next/image";
import { cookies } from "next/headers";
import type { User } from "@/types";
import { apiBase } from "@/constants";
import axios from "axios";
import { LinkCard } from "@/components/LinkCard";
import VerifyOtp from "@/components/VerifyOtp";
import UpdateUsername from "@/components/UpdateUsername";

export default async function Links() {
  const cookieStore = cookies();
  const token = cookieStore.get("authtoken");

  const { data: user }: { data: User } = await axios.get(
    apiBase + "/api/get-session",
    {
      params: {
        links: true,
      },
      headers: {
        Authorization: `Bearer ${token?.value}`,
      },
    },
  );

  if (!user.email_verified) {
    return <VerifyOtp user={user} />;
  }

  if (!user.username) {
    return <UpdateUsername user={user} />;
  }

  let links = user.links ? user.links.reverse() : [];
  return (
    <>
      <div className="flex flex-col min-h-screen bg-white dark:bg-gray-950">
        <nav className="sticky top-0 flex items-center justify-between h-16 border-b border-gray-200 dark:border-gray-800 z-40 bg-white dark:bg-gray-950">
          <div className="flex flex-row items-center space-x-2 mx-4">
            <ButtonBack loc="/dashboard" />
            <h1 className="font-medium text-[1.4rem] text-gray-700 dark:text-white md:text-3xl">
              My Links
            </h1>
          </div>
          <div className="flex flex-row items-center space-x-3 mx-4">
            <ModeToggle />
          </div>
        </nav>

        <main className="mx-6 w-fufl flex justify-center flex-col mt-10">
          <LinkCreateForm />

          <div className="mt-14">
            <h1 className="font-bold mb-5 text-gray-700 dark:text-white text-xl">
              My Links
            </h1>

            {links &&
              links.length > 0 &&
              links.map((data, index) => (
                <LinkCard
                  key={index}
                  name={data.name}
                  link={data.url}
                  click={data.clicks}
                  logo={data.logo}
                />
              ))}
          </div>
        </main>
      </div>
    </>
  );
}
