import { Button } from "@nextui-org/react";
import { HiHome } from "react-icons/hi";
import { ImCog, ImDownload } from "react-icons/im";
import { BsFillBagFill } from "react-icons/bs";
import { useLocation } from "react-router";

interface SidebarProps {}

export const Sidebar: React.FC<SidebarProps> = () => {
  const location = useLocation();

  return (
    <div className="my-auto">
      <div className="inline float-left fixed h-4/6 rounded-tr-xl rounded-br-xl bg-secondary p-5">
        <div className="grid justify-center mt-5">
          <Button
            size="md"
            icon={<HiHome size="25" />}
            className={`bg-tertiary border-2 border-solid ${
              location.pathname === "/home"
                ? "border-primary-base"
                : "border-none"
            } mb-5`}
          >
            Home
          </Button>
          <Button
            size="md"
            icon={<ImCog size="25" />}
            className={`bg-tertiary border-2 border-solid ${
              location.pathname === "/settings"
                ? "border-primary-base"
                : "border-none"
            } mb-5`}
          >
            Settings
          </Button>
          <Button
            size="md"
            icon={<BsFillBagFill size="25" />}
            className={`bg-tertiary border-2 border-solid ${
              location.pathname === "/store"
                ? "border-primary-base"
                : "border-none"
            } mb-5`}
          >
            Store
          </Button>
          <Button
            size="md"
            icon={<ImDownload size="25" />}
            className={`bg-tertiary border-2 border-solid ${
              location.pathname === "/library"
                ? "border-primary-base"
                : "border-none"
            } mb-5`}
          >
            Library
          </Button>
          <div className="mt-20">Feed</div>
        </div>
      </div>
    </div>
  );
};
