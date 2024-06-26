import { ModeToggle } from "@/components/theme-toggle";
import { ButtonBack } from "@/components/ButtonBack";
import Image from "next/image";
import { cookies } from "next/headers";
import { apiBase } from "@/constants";
import ProfileForm from "@/components/ProfileForm";
import axios from "axios";
import type { User } from "@/types";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { ButtonProfilePic, ButtonCoverPic } from "@/components/UploadButtons";
import VerifyOtp from "@/components/VerifyOtp";
import UpdateUsername from "@/components/UpdateUsername";

export default async function EditProfile() {
  let user;

  try {
    const cookieStore = cookies();
    const token = cookieStore.get("authtoken");
    const { data }: { data: User } = await axios.get(
      apiBase + "/api/get-session",
      {
        headers: {
          Authorization: `Bearer ${token?.value}`,
        },
      },
    );
    user = data;
  } catch (error) {
    redirect("/login");
  }

  if (!user.email_verified) {
    return <VerifyOtp user={user} />;
  }

  if (!user.username) {
    return <UpdateUsername user={user} />;
  }

  return (
    <>
      <div className="flex flex-col h-full bg-white dark:bg-gray-950 pb-10">
        <nav className="sticky top-0 flex items-center justify-between h-16 border-b border-gray-200 dark:border-gray-800 z-40 bg-white dark:bg-gray-950">
          <div className="flex flex-row items-center space-x-2 mx-4">
            <ButtonBack loc="/dashboard" />
            <h1 className="font-medium text-[1.4rem] text-gray-700 dark:text-white md:text-3xl">
              Profile
            </h1>
          </div>
          <div className="flex flex-row items-center space-x-3 mx-4">
            <ModeToggle />
          </div>
        </nav>
        <div className="w-full flex flex-col">
          {user.cover ? (
            <Image
              className="w-full h-28 md:h-44 border-b-4 border-gray-300 dark:border-gray-800"
              src={user.cover}
              width={500}
              height={200}
              priority={true}
              alt="Cover"
            />
          ) : (
            <div className="w-full h-28 bg-gradient-to-r from-sky-400 to-sky-300"></div>
          )}

          <div className="relative">
            {user && (
              <Image
                className="rounded-full w-[7rem] h-[7rem] md:h-[12rem] md:w-[12rem] border-4 md:border-8 border-sky-300 absolute top-[-3.5rem] md:top-[-6rem] mx-8"
                src={
                  user.avatar
                    ? user.avatar.replace("s96-c", "s384-c")
                    : `https://www.gravatar.com/avatar/${user.id}?s=500&d=retro&r=PG`
                }
                width={100}
                height={100}
                alt={user ? user.name : "JL"}
              />
            )}
            <ButtonProfilePic />
            <div className="absolute top-0 right-0 mt-4 mr-6">
              <ButtonCoverPic />
            </div>
          </div>
        </div>
        <div className="w-full md:w-[50%]">
          <ProfileForm user={user} />
        </div>
      </div>
    </>
  );
}
