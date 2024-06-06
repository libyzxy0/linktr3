import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-950 m-4">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <Link
            href="/next.svg"
            className="flex items-center mb-4 sm:mb-0 space-x-2 rtl:space-x-reverse"
          >
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-sky-400">
              Link<span className="text-gray-700 dark:text-white">tr3🌲</span>
            </span>
            <p className="text-gray-400">by libyzxy0</p>
          </Link>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <Link href="about" className="hover:underline me-4 md:me-6">
                About
              </Link>
            </li>
            <li>
              <Link
                href="privacy-policy"
                className="hover:underline me-4 md:me-6"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="https://www.libyzxy0.com" className="hover:underline">
                Developer Contact
              </Link>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2024{" "}
          <Link href="https://linktr3.vercel.app" className="hover:underline">
            Linktr3 - libyzxy0
          </Link>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};
