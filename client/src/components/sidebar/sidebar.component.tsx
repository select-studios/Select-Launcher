import { Button } from "@nextui-org/react";
import {
  HiCog,
  HiDownload,
  HiHome,
  HiMenuAlt1,
  HiShoppingBag,
} from "react-icons/hi";
import { ImCog, ImDownload } from "react-icons/im";
import { BsFillBagFill } from "react-icons/bs";
import { useLocation } from "react-router";
import { BiShoppingBag } from "react-icons/bi";

interface SidebarProps {
  active: string;
}

interface SidebarLinks {
  name: string;
  href: string;
  icon: JSX.Element;
}

const sidebarLinks: SidebarLinks[] = [
  {
    name: "Home",
    href: "/",
    icon: <HiHome size="20" />,
  },
  {
    name: "Store",
    href: "/store",
    icon: <BiShoppingBag size="20" />,
  },
  {
    name: "Library",
    href: "/library",
    icon: <HiDownload size="20" />,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: <HiCog size="20" />,
  },
];

export const Sidebar: React.FC<SidebarProps> = ({ active }) => {
  return (
    <div className="my-auto bg-secondary mt-10">
      <Button size="lg" auto className="ml-5 mt-5">
        <HiMenuAlt1 size="25" className="font-bold" />
      </Button>
      <div className="flex flex-col h-screen rounded-tr-xl rounded-br-xl p-5">
        <div className="grid justify-center mt-5">
          {sidebarLinks.map((link, i) => (
            <Button
              href={link.href}
              className={`bg-tertiary mt-2 ${
                link.name.toLowerCase() == active
                  ? "border-l-4 border-y-0 border-r-0 rounded-l-md border-solid border-primary-base"
                  : ""
              }`}
              icon={link.icon}
              key={i}
              size="lg"
            >
              {link.name}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};
