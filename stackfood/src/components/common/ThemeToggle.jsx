import React, { useState, useEffect } from 'react';
import { MdSunny } from "react-icons/md";
import { BsMoonStarsFill } from "react-icons/bs";
const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Set initial theme based on system preference or saved preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Toggle theme and save preference
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <div className='bg-white dark:bg-black rounded-full w-6 h-6 outline outline-1 outline-orange-500 flex items-center justify-center'>
          <button
      onClick={toggleTheme}
      className="text-orange-400 dark:bg-black"
    >
      {isDarkMode ?  <BsMoonStarsFill/> :<MdSunny/>}
    </button>
    </div>

  );
};

export default ThemeToggle;
