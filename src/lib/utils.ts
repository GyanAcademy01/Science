import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** ગુજરાતી અંક (૦-૯) માં ફેરવે — badge અને counter માટે */
const GU_DIGITS = ["૦", "૧", "૨", "૩", "૪", "૫", "૬", "૭", "૮", "૯"];

export function toGujaratiDigits(value: number | string): string {
  return String(value).replace(/\d/g, (d) => GU_DIGITS[Number(d)]);
}

export const OPTION_LABELS = ["A", "B", "C", "D"] as const;
