import React, { useState, useEffect, useRef } from 'react';
// import DeliveryManRegistration from '../delivery-man-registration';
import { RiArrowDropDownLine } from "react-icons/ri";
import { CiUser } from "react-icons/ci";
const JoinUsDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null); // Create a ref to the dropdown

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Close dropdown if clicking outside
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className={` relative inline-block text-left z-50 hover:bg-slate-200 `}>
      <button
        onClick={toggleDropdown}
        className="flex gap-x-8 text-black dark:text-white font-normal text-[12px] pl-4 pr-0 rounded-lg justify-center items-center"
      >
        <CiUser className='text-[16px] -mr-6'/>
        Join Us
        <RiArrowDropDownLine className='text-4xl mr-0' />
      </button>

      {(
          <ul className={`absolute right-0 mt-2 w-48 bg-[#f5f6f8] dark:bg-[#272727] text-[12px] shadow-lg rounded-lg border border-gray-200 overflow-hidden transition-all duration-200 ease-in-out ${isOpen?"max-h-20 opacity-100":"max-h-0 opacity-0"}`}>
            <li>
              <a href="/restaurant-registration" className="mx-1 block px-4 py-2 dark:text-white hover:bg-slate-200">
                Become a Restaurant
              </a>
            </li>
            <li>
              <a href="/delivery-man-registration" className="mx-1 block px-4 py-2 dark:text-white hover:bg-slate-200">
                Become a delivery man
              </a>
            </li>
          </ul>
      )}
    </div>
  );
};

export default JoinUsDropdown;
