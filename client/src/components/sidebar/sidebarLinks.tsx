import { BiLibrary } from "react-icons/bi";
import { FiCompass, FiMonitor } from "react-icons/fi";
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
    name: "App",
    icon: <FiMonitor size="25" />,
    disabled: false,
    href: "/settings/app",
  },
];
