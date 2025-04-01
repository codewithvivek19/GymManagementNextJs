import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format a date string into a readable format
 */
export function formatDate(dateString: string | Date, locale: string = 'en-IN'): string {
  if (!dateString) return 'N/A';
  
  try {
    const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
    return date.toLocaleDateString(locale, {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  } catch (e) {
    console.error('Error formatting date:', e);
    return String(dateString);
  }
}

/**
 * Format a number as currency
 */
export function formatCurrency(amount: number | string, 
                              currency: string = 'INR', 
                              locale: string = 'en-IN'): string {
  if (amount === null || amount === undefined) return 'N/A';
  
  try {
    const numericAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
    
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(numericAmount);
  } catch (e) {
    console.error('Error formatting currency:', e);
    return String(amount);
  }
}
