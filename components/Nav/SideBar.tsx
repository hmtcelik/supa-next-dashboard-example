import Link from "next/link";
import { IStaticMethods } from "preline/preline";
import React from "react";
import LogoutButton from "./LogoutButton";
import { cookies } from "next/headers";
import DarkSwitch from "../DarkSwitch";
import SideBarContent from "./SideBarContent";
import { IconBriefcase, IconHome, IconUser } from "@tabler/icons-react";

declare global {
  interface Window {
    HSStaticMethods: IStaticMethods;
  }
}

const navItems = [
  {
    title: "Dashboard",
    icon: <IconHome size={18} />,
    href: "/",
  },
  {
    title: "Users",
    icon: <IconUser size={18} />,
    href: "/users",
  },
  {
    title: "Businesses",
    icon: <IconBriefcase size={18} />,
    href: "/businesses",
  },
];

export default function SideBar({ children }: { children: React.ReactNode }) {
  const theme = cookies().get("theme")?.value === "dark" ? "dark" : "light";

  return (
    <SideBarContent theme={theme} navItems={navItems} children={children} />
  );
}
