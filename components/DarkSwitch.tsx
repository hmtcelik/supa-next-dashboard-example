"use client";

import { IconMoon, IconSun } from "@tabler/icons-react";
import { FC, useState } from "react";

interface Props {
  theme: "dark" | "light";
}

const DarkSwitch: FC<Props> = ({ theme }) => {
  const [_theme, setTheme] = useState<"dark" | "light">(theme);

  const toogleTheme = () => {
    const root = document.getElementsByTagName("html")[0];
    root.classList.toggle("dark");
    if (root.classList.contains("dark")) {
      setTheme("dark");
      document.cookie = `theme=${"dark"}`;
    } else {
      setTheme("light");
      document.cookie = `theme=${"light"}`;
    }
  };

  return (
    <div
      className="p-1 cursor-pointer inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-white/10 dark:hover:bg-white/20 dark:text-white dark:hover:text-white dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
      aria-current="page"
      onClick={toogleTheme}
    >
      {_theme == "dark" ? <IconSun /> : <IconMoon />}
    </div>
  );
};

export default DarkSwitch;
