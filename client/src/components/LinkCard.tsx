import Image from "next/image";
import Link from "next/link";
import { MousePointerClick } from "lucide-react";

type LinkCardProps = {
  click: number;
  name: string;
  link: string;
  logo?: string;
};

export function LinkCard({ click, name, link, logo }: LinkCardProps) {
  return (
    <div className="flex items-center gap-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-950 my-5 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300">
      {logo && (
        <Image
          src={logo}
          alt="Logo"
          className="rounded-md dark:fill-white"
          width={48}
          height={48}
        />
      )}
      <div className="space-y-1">
        <h4 className="text-lg font-medium text-gray-700 dark:text-white">
          {name}
        </h4>
        <Link
          href={link}
          className="text-sm text-gray-500 hover:underline dark:text-gray-400"
          prefetch={false}
        >
          {link}
        </Link>
      </div>
    </div>
  );
}
