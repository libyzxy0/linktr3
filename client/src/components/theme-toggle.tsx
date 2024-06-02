'use client';

import * as React from 'react';
import { Sun, Moon, LoaderCircle } from 'lucide-react';
import { useTheme } from 'next-themes';
import { cn } from '@/utils/lib/cn'

type ModeToggleProps = {
  className?: string;
}
export function ModeToggle({ className }: ModeToggleProps) {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  if (!mounted) {
    return (
    <button className={cn("text-gray-700 dark:text-white border-2 border-gray-100 dark:border-gray-800 rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300", className)} onClick={toggleTheme}>
      <LoaderCircle className="w-5 h-5 animate-spin" />
    </button>
    );
  }

  return (
    <button className={cn("text-gray-700 dark:text-white border-2 border-gray-100 dark:border-gray-800 rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300", className)} onClick={toggleTheme}>
      {theme === 'dark' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
    </button>
  );
}
