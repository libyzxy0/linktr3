'use client';

import { ChevronLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function ButtonBack({ loc }: { loc: string }) {
  const router = useRouter();
  return (
    <button onClick={() => router.push(loc)} className="border-none text-[1rem] p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all duration-300">
       <ChevronLeft />
     </button>
  )
}