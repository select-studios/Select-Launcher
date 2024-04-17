import { SidebarStore } from "@/stores/SidebarStore";
import {
  BiCode,
  BiCog,
  BiLibrary,
  BiMoneyWithdraw,
  BiSolidWidget,
} from "react-icons/bi";
import { BsFileBarGraph, BsGraphUp } from "react-icons/bs";
import { FiCompass, FiMonitor, FiUser } from "react-icons/fi";
import { GrStatusPlaceholder } from "react-icons/gr";
import { HiDatabase } from "react-icons/hi";
import { IoAnalytics } from "react-icons/io5";

const iconSize = SidebarStore.open ? "20" : "25";

interface SidebarLink {
  name: string;
  href: string;
  icon: JSX.Element;
  disabled: boolean;
  moderatorOnly?: boolean;
  nestedItems?: SidebarLink[];
}

export const sidebarLinks: SidebarLink[] = [
  {
    name: "Store",
    href: "/store",
    icon: <FiCompass size={iconSize} />,
    disabled: false,
  },
  {
    name: "Library",
    href: "/library",
    icon: <BiLibrary size={iconSize} />,
    disabled: false,
  },
  {
    name: "Settings",
    href: "/Settings",
    icon: <BiCog size={iconSize} />,
    disabled: false,
  },
  {
    name: "Moderation",
    href: "/moderator/dashboard",
    icon: <BiSolidWidget size={iconSize} />,
    disabled: false,
    moderatorOnly: true,
    nestedItems: [
      {
        name: "Dashboard",
        disabled: false,
        href: "/moderator/dashboard",
        icon: <IoAnalytics size={20} />,
      },
    ],
  },
];

export const settingsSidebarLinks: SidebarLink[] = [
  {
    name: "General",
    icon: <BiCode size="24" />,
    disabled: false,
    href: "/settings",
  },
  {
    name: "App",
    icon: <FiMonitor size="20" />,
    disabled: false,
    href: "/settings/app",
  },
  {
    name: "Account",
    icon: <FiUser size="20" />,
    disabled: false,
    href: "/settings/account",
  },
  {
    name: "Payment",
    icon: <BiMoneyWithdraw size={20} />,
    disabled: true,
    href: "/settings/payment",
  },
];
