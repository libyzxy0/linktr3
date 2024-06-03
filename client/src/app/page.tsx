import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import Image from 'next/image';
import mockup from '@/assets/images/landing_mockup.svg';
import { OneTapGoogleLogin } from '@/components/OneTapGoogleLogin'
export default function Landing() {
  return (
    <>
    <OneTapGoogleLogin />
      <main className="w-full dark:bg-gray-950 h-screen flex flex-col justify-between">
        <Navbar />
        <div className="flex flex-col md:flex-row items-center justify-between h-full px-6 md:px-10">
          <div className="w-full md:w-1/2 pt-24">
            <h1 className="text-4xl text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-blue-400 font-bold">
              Linktr3: Share your links with everyone.
            </h1>
            <p className="text-gray-700 text-md mt-5 dark:text-gray-50">
              Linktr3 is the perfect platform to consolidate and share all your important links in one customizable page. Ideal for content creators, entrepreneurs, and influencers, Linktr3 makes it easy to guide your audience to your social media, websites, and online stores—all from a single, sleek interface.
            </p>
            <div className="mt-12 flex items-center">
              <input
                className="bg-white dark:bg-gray-950 max-w-[12rem] px-4 py-2 rounded-tl-full rounded-bl-full border-[1.5px] focus:border-sky-400 border-gray-200 dark:focus:border-sky-400 dark:border-gray-800 outline-none"
                type="text"
                placeholder="Enter username"
                aria-label="Enter desired username"
              />
              <button
                className="px-4 py-2 bg-sky-400 text-white border-[1.5px] border-l-0 border-sky-400 rounded-tr-full rounded-br-full hover:bg-sky-400 transition-all duration-300 font-medium"
                aria-label="Create Link"
              >
                Create
              </button>
            </div>
          </div>
          <div className="hidden md:flex w-full md:w-1/2 justify-center">
            <Image className="w-auto max-w-full h-auto mt-10 md:mt-20" src={mockup} alt="Landing page mockup" />
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
}
