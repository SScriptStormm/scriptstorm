import { format, formatDistanceToNow } from 'date-fns';

/**
 * Formats a date to "15 January 2025" format (day-first, unambiguous)
 */
export const formatDate = (date: string | Date): string => {
  return format(new Date(date), 'd MMMM yyyy');
};

/**
 * Formats a date and time to "15 January 2025 at 14:30" format
 */
export const formatDateTime = (date: string | Date): string => {
  return format(new Date(date), 'd MMMM yyyy \'at\' HH:mm');
};

/**
 * Formats a date to "15 Jan 2025" format (compact version)
 */
export const formatDateShort = (date: string | Date): string => {
  return format(new Date(date), 'd MMM yyyy');
};

/**
 * Formats a relative date like "2 days ago" or "in 3 hours"
 */
export const formatRelativeDate = (date: string | Date): string => {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
};

/**
 * Formats to "January 2025" for month displays
 */
export const formatMonthYear = (date: string | Date): string => {
  return format(new Date(date), 'MMMM yyyy');
};

/**
 * Formats time only to "14:30" format
 */
export const formatTime = (date: string | Date): string => {
  return format(new Date(date), 'HH:mm');
};
