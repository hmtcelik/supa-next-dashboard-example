"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import DarkSwitch from "../DarkSwitch";
import Link from "next/link";
import LogoutButton from "./LogoutButton";

type SideBarContentProps = {
  children: React.ReactNode;
  theme: "dark" | "light";
  navItems: {
    title: string;
    icon: React.ReactNode;
    href: string;
  }[];
};

const SideBarContent = ({ children, theme, navItems }: SideBarContentProps) => {
  const path = usePathname();

  useEffect(() => {
    document?.getElementById("application-sidebar-backdrop")?.remove();
  }, [path]);

  return (
    <>
      <div className="sticky top-0 inset-x-0 z-20 bg-white border-y px-4 sm:px-6 md:px-8 lg:hidden dark:bg-gray-800 dark:border-gray-700">
        <div className="flex items-center py-4">
          {/* Navigation Toggle */}
          <button
            type="button"
            className="text-gray-500 dark:text-white"
            data-hs-overlay="#application-sidebar"
            aria-controls="application-sidebar"
            aria-label="Toggle navigation"
          >
            <span className="sr-only">Toggle Navigation</span>
            <svg
              className="w-5 h-5"
              width={32}
              height={32}
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
              />
            </svg>
          </button>
          {/* End Navigation Toggle */}
        </div>
      </div>
      {/* End Sidebar Toggle */}
      {/* Sidebar */}
      <div
        id="application-sidebar"
        className="hs-overlay hs-overlay-open:translate-x-0 -translate-x-full transition-all duration-300 transform hidden fixed top-0 start-0 bottom-0 z-[60] w-64 bg-white border-e border-gray-200 pt-7 pb-10 overflow-y-auto lg:block lg:translate-x-0 lg:end-auto lg:bottom-0 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-slate-700 dark:[&::-webkit-scrollbar-thumb]:bg-slate-500 dark:bg-gray-800 dark:border-gray-700"
      >
        <div className="flex items-center justify-between px-6">
          <a
            className="flex-none text-xl font-semibold dark:text-white"
            href="#"
            aria-label="SupaNext"
          >
            SupaNext
          </a>
          <DarkSwitch theme={theme} />
        </div>
        <nav
          className="hs-accordion-group p-6 w-full flex flex-col flex-wrap"
          data-hs-accordion-always-open=""
        >
          <ul className="space-y-1.5">
            {navItems.map((item, index) => (
              <li key={index}>
                <Link href={item.href}>
                  <div className="flex items-center gap-x-3.5 py-2 px-2.5 bg-gray-100 text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 dark:bg-gray-800 dark:text-white dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                    {item.icon}
                    {item.title}
                  </div>
                </Link>
              </li>
            ))}
            <li>
              <LogoutButton />
            </li>
          </ul>
        </nav>
      </div>
      <div className="w-full pt-10 px-4 sm:px-6 md:px-8 lg:ps-72">
        {children}
      </div>
      {/* End Sidebar */}
      {/* Content */}
    </>
  );
};

export default SideBarContent;
