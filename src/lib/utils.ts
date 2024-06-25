import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const parse = (value: string) => {
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
};
