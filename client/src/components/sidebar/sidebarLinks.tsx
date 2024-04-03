import { BiLibrary, BiMoney, BiMoneyWithdraw } from "react-icons/bi";
import { FiCompass, FiHome, FiMonitor, FiUser } from "react-icons/fi";
import { HiDatabase } from "react-icons/hi";

const iconSize = "20";

interface SidebarLink {
  name: string;
  href: string;
  icon: JSX.Element;
  disabled: boolean;
  moderatorOnly?: boolean;
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
    name: "Moderation",
    href: "/moderator/dashboard",
    icon: <HiDatabase size={iconSize} />,
    disabled: false,
    moderatorOnly: true,
  },
];

export const settingsSidebarLinks: SidebarLink[] = [
  {
    name: "Home",
    icon: <FiHome size="20" />,
    disabled: false,
    href: "/settings",
  },
  {
    name: "App",
    icon: <FiMonitor size="20" />,
    disabled: true,
    href: "/settings/app",
  },
  {
    name: "Account",
    icon: <FiUser size="20" />,
    disabled: true,
    href: "/settings/account",
  },
  {
    name: "Payment",
    icon: <BiMoneyWithdraw size={20} />,
    disabled: true,
    href: "/settings/payment",
  },
];