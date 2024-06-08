"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
type ProfileAvatarProps = {
  avatar?: string;
  name?: string;
  user_id: string;
};
export function ProfileAvatar({ avatar, name, user_id }: ProfileAvatarProps) {
  const router = useRouter();
  return (
    <Image
      onClick={() => router.push("/dashboard/profile")}
      className="h-10 w-10 rounded-full border-2 border-sky-400"
      height={40}
      width={40}
      src={
        avatar
          ?avatar.replace("s96-c", "s384-c")
          : `https://www.gravatar.com/avatar/${user_id}?s=500&d=retro&r=PG`
      }
      alt={name ? name : "NM"}
    />
  );
}
