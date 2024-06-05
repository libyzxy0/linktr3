import Image from 'next/image';
import { cookies } from 'next/headers'
import axios from 'axios';
import type { User } from '@/types';
import { apiBase } from '@/constants';
import { ModeToggle } from '@/components/theme-toggle'
import { Footer } from '@/components/Footer'
import UpdateUsername from '@/components/UpdateUsername'
import Link from 'next/link'
export default async function Dashboard() {
  const cookieStore = cookies()
  const token = cookieStore.get('authtoken');
  const { data: user }: { data: User } = await axios.get(apiBase + '/api/get-session', {
    headers: {
      'Authorization': `Bearer ${token?.value}`
    }
  });
  
  if(!user.username) {
    return (
      <UpdateUsername user={user} />
    )
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
            <Image className="h-10 w-10 rounded-full border-2 border-sky-400" height={40} width={40} src={user.avatar} />
          </div>
        </nav>
        
        <main className="flex-grow pt-8 mx-6 md:mx-10">
          <div>
            <h3 className="font-medium text-[17px] text-gray-700 dark:text-white">Welcome back 🎉</h3>
            <span>
            <h1 className="text-[25px] text-gray-700 font-bold dark:text-white">{ user.name }</h1>
            <Link href={'https://linktr3.vercel.app/tr/' + user.username } className="text-[14px] text-sky-400 mt-2">https://linktr3.vercel.app/tr/{ user.username }</Link>
            </span>
          </div>
          
          <div className="mt-8 flex flex-col md:flex-row md:justify-between md:space-x-12">
          
            
            <ul className="w-full md:w-[50%] flex flex-col space-y-4">
            <h1 className="text-[20px] font-bold text-gray-700 dark:text-white w-full mb-2">Analytics</h1>
              <li className="flex items-center justify-between">
                <h1 className="text-gray-700 dark:text-white font-medium">Total Visits</h1>
                <h1 className="text-gray-700 dark:text-white font-bold">12,345</h1>
              </li>
              <li className="flex items-center justify-between">
                <h1 className="text-gray-700 dark:text-white font-medium">Total Clicks</h1>
                <h1 className="text-gray-700 dark:text-white font-bold">28,387</h1>
              </li>
              <li className="flex items-center justify-between">
                <h1 className="text-gray-700 dark:text-white font-medium">Total Links</h1>
                <h1 className="text-gray-700 dark:text-white font-bold">9</h1>
              </li>
              <li className="flex items-center justify-between">
                <h1 className="text-gray-700 dark:text-white font-medium">Total Cards</h1>
                <h1 className="text-gray-700 dark:text-white font-bold">6</h1>
              </li>
            </ul>
            
            <div className="w-full md:w-[50%]">
            <h1 className="mt-7 md:mt-0 text-[20px] font-bold text-gray-700 dark:text-white w-full">Manage</h1>
            <div className="w-full p-5 bg-gray-100 shadow dark:bg-gray-800 rounded-xl mt-7 hover:bg-gray-300 dark:hover:bg-gray-900 transition-all duration-300">
              <h1 className="text-2xl font-semibold text-gray-700 dark:text-white">My Links</h1>
              <p className="text-gray-700 font-medium text-md mt-2 dark:text-white">Click here to manage all of your links.</p>
            </div>
            <div className="w-full p-5 bg-gray-100 shadow dark:bg-gray-800 rounded-xl mt-5 hover:bg-gray-300 dark:hover:bg-gray-900 transition-all duration-300">
              <h1 className="text-2xl font-semibold text-gray-700 dark:text-white">My Cards</h1>
              <p className="text-gray-700 font-medium text-md mt-2 dark:text-white">Click here to manage all of your cards.</p>
            </div>
            </div>
            
            
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  )
}
