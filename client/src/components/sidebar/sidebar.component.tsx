import { Button } from "@nextui-org/react";
import { HiCog, HiDownload, HiHome, HiMenuAlt1 } from "react-icons/hi";
import { BiShoppingBag } from "react-icons/bi";
import { useState } from "react";
import { motion } from "framer-motion";

interface SidebarProps {
  active: string;
}

interface SidebarLinks {
  name: string;
  href: string;
  icon: JSX.Element;
}

const sidebarVariants = {
  sidebarOpen: {
    width: "300px",
    transition: {
      when: "beforeChildren",
    },
  },

  sidebarClosed: {
    width: "",
  },
};

export const Sidebar: React.FC<SidebarProps> = ({ active }) => {
  const [isOpen, setOpen] = useState(true);

  const iconSize = isOpen ? "20" : "25";

  const sidebarLinks: SidebarLinks[] = [
    {
      name: "Home",
      href: "/",
      icon: <HiHome size={iconSize} />,
    },
    {
      name: "Store",
      href: "/store",
      icon: <BiShoppingBag size={iconSize} />,
    },
    {
      name: "Library",
      href: "/library",
      icon: <HiDownload size={iconSize} />,
    },
    {
      name: "Settings",
      href: "/settings",
      icon: <HiCog size={iconSize} />,
    },
  ];

  return (
    <motion.div
      variants={sidebarVariants}
      animate={isOpen ? "sidebarOpen" : "sidebarClosed"}
    >
      <div className="bg-secondary mt-10 rounded-tr-xl rounded-br-xl">
        <div className="flex flex-col flex-1 p-5">
          <div>
            <Button
              size="lg"
              color="primary"
              className={!isOpen ? "bg-tertiary" : ""}
              auto
              onClick={() => setOpen(!isOpen)}
            >
              <HiMenuAlt1 size="25" className="font-bold" />
            </Button>
          </div>
          <div className="grid justify-center mt-5">
            {sidebarLinks.map((link, i) => (
              <Button
                href={link.href}
                className={`bg-tertiary mt-2 ${
                  link.name.toLowerCase() == active
                    ? "border-l-2 border-y-0 border-r-0 rounded-l-sm border-solid border-primary-base"
                    : ""
                }`}
                icon={link.icon}
                key={i}
                size="lg"
                auto={!isOpen}
              >
                {isOpen && link.name}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
