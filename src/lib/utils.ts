import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString: string): string {
  const date: Date = new Date(dateString);
  const now: Date = new Date();
  const diff: number = Math.abs(now.getTime() - date.getTime()) / 1000; // Difference in seconds

  const intervals: { [key: string]: number } = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60
  };

  for (const interval in intervals) {
      if (intervals.hasOwnProperty(interval)) {
          const intervalInSeconds: number = intervals[interval];
          const count: number = Math.floor(diff / intervalInSeconds);

          if (count > 0) {
              return count === 1 ? `1 ${interval} ago` : `${count} ${interval}s ago`;
          }
      }
  }

  return "Just now";
}

export const checkIsLike = (likeList: string[], userId: string) => {
  return likeList.includes(userId);
}

export function formatDateString(dateString: string) {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString("en-US", options);

  const time = date.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });

  return `${formattedDate} at ${time}`;
}