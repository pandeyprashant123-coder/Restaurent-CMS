import React, { useState } from 'react';
import { RiArrowDropDownLine } from "react-icons/ri";

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className=" relative inline-block text-left z-50 hover:bg-slate-200">
      <button
        onClick={toggleDropdown}
        className="flex gap-x-8 text-black dark:text-white font-semibold text-[12px] px-2 rounded-lg justify-center items-center "
      >
        English
        <RiArrowDropDownLine className='text-4xl'/>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-[#f5f6f8] dark:bg-[#272727] text-[12px] shadow-lg rounded-lg border border-gray-200">
          <ul className="py-1  ">
            <li>
              <a href="/" className="block px-4 py-2 dark:text-white">
                English 
              </a>
            </li>
            <li>
              <a href="/" className="block px-4 py-2 dark:text-white">
                Spanish
              </a>
            </li>
            <li>
              <a href="/" className="block px-4 py-2 dark:text-white">
                Bangali
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
