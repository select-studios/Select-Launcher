import { Button, Chip } from "@nextui-org/react";
import { FaRegWindowMinimize } from "react-icons/fa";
import { CiMaximize2 } from "react-icons/ci";
import { IoCloseOutline } from "react-icons/io5";
import { FiMaximize, FiMinus, FiX } from "react-icons/fi";
import { TitlebarButtons } from "./components/buttons.titlebar";

const Titlebar = () => {
  return (
    <nav className="titlebar h-[40px] z-50 filter bg-opacity-100 backdrop-blur-lg w-screen sticky top-0 bg-content1">
      <div className="flex flex-row text-[17px] h-full tracking-wider font-heading pl-5">
        <div className="items-center flex">
          Select Launcher{" "}
          <Chip size="sm" color="primary" className="ml-2">
            v3
          </Chip>
        </div>
        <TitlebarButtons />
      </div>
    </nav>
  );
};

export default Titlebar;
