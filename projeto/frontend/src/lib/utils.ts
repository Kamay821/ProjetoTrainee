import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Utilitário para juntar classes condicionalmente e evitar conflitos com Tailwind.
 * Exemplo: `cn("p-4", isDark && "bg-black")`
 */
export function cn(...inputs: any[]) {
  return twMerge(clsx(inputs))
}
