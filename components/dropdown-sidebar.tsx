"use client";

import { useState } from "react";
import { BsCaretRightFill, BsCaretDownFill } from "react-icons/bs";

interface DropdownProps {
  icon: any;
  title: string;
  options: { icon: any; label: string; link: string }[];
}

const DropdownSidebar: React.FC<DropdownProps> = ({ icon, title, options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        type="button"
        className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 hover:dark:text-slate-100"
        aria-controls={`dropdown-${title}`}
        onClick={toggleDropdown}
      >
        <div className="icon text-slate-900  dark:text-slate-300">{icon}</div>

        <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
          {title}
        </span>

        {isOpen ? <BsCaretDownFill /> : <BsCaretRightFill />}
      </button>
      <ul
        id={`dropdown-${title}`}
        className={`py-2 space-y-2 ${
          isOpen ? "" : "hidden"
        } duration-75 transition dark:bg-slate-800 bg-slate-200 m-2 rounded-xl`}
      >
        {options.map((option, index) => (
          <li key={index}>
            <a
              href={option.link}
              className="flex items-center w-full text-gray-900 transition duration-75 rounded-lg pl-3 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
            >
              <div className="flex items-center gap-3 p-1">
                {option.icon}
                {option.label}
              </div>
            </a>
          </li>
        ))}
      </ul>
    </>
  );
};

export default DropdownSidebar;
