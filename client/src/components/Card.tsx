import Image from "next/image";
import Link from "next/link";
import { cn } from "@/utils/lib/cn";

type CardProps = {
  className?: string;
  image?: string;
  title: string;
  description: string;
  preview: string;
};

export function Card({
  className,
  image,
  title,
  description,
  preview,
}: CardProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-lg dark:bg-gray-900 border-t-[0.3rem] border-sky-400 md:w-[24rem] my-3 md:mr-6",
        className,
      )}
    >
      {image && (
        <Image
          src={image}
          alt={title}
          width={600}
          height={300}
          className="w-full h-52 object-cover"
        />
      )}
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{description}</p>
        <Link href={preview}>
          <button className="bg-sky-400 font-medium text-white dark:bg-gray-800 py-2 w-full rounded-lg hover:opacity-80">
            Let me See
          </button>
        </Link>
      </div>
    </div>
  );
}
