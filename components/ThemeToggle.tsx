
import React from 'react';

interface ThemeToggleProps {
  isDarkMode: boolean;
  onToggle: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ isDarkMode, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className="relative inline-flex h-10 w-20 items-center justify-center rounded-full bg-gray-200 p-1 transition-colors duration-300 dark:bg-slate-800"
      aria-label="Toggle Theme"
    >
      <div
        className={`absolute left-1 flex h-8 w-8 items-center justify-center rounded-full bg-white transition-transform duration-300 dark:bg-brand-500 ${
          isDarkMode ? 'translate-x-10' : 'translate-x-0'
        } shadow-sm`}
      >
        <i className={`fas ${isDarkMode ? 'fa-moon text-white' : 'fa-sun text-yellow-500'}`}></i>
      </div>
      <div className="flex w-full items-center justify-around px-2 text-xs font-bold text-gray-400">
        <i className="fas fa-sun"></i>
        <i className="fas fa-moon"></i>
      </div>
    </button>
  );
};

export default ThemeToggle;
