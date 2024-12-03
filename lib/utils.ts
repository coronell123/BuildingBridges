import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Settings, Plus, Trash, Edit, Eye } from 'lucide-react';
import { ActivityType } from '@/lib/db/schema';

export const iconMap = {
  CREATE: Plus,
  DELETE: Trash,
  UPDATE: Edit,
  VIEW: Eye,
  DEFAULT: Settings,
} as const;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatAction(action: ActivityType): string {
  return action
    .split('_')
    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}