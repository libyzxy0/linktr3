import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: (string | undefined)[]) => {
  return twMerge(clsx(inputs));
};
