'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation'
type ProfileAvatarProps = {
  avatar: string;
  name: string;
}
export function ProfileAvatar({ avatar, name }: ProfileAvatarProps) {
  const router = useRouter();
  return (
    <Image
      onClick={() => router.push('/dashboard/profile')} 
      className="h-10 w-10 rounded-full border-2 border-sky-400"
      height={40}
      width={40}
      src={avatar ? avatar : `https://ui-avatars.com/api/?background=fff&color=38bdf8&bold=true&name=${name}`}
      alt={name}
    />
  )
}