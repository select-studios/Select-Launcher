import { Button, Chip } from "@nextui-org/react";
import { FaRegWindowMinimize } from "react-icons/fa";
import { CiMaximize2 } from "react-icons/ci";
import { IoCloseOutline } from "react-icons/io5";
import { FiMaximize, FiMinus, FiX } from "react-icons/fi";

const Titlebar = () => {
  return (
    <nav className="titlebar h-[40px] backdrop-blur-lg w-screen sticky z-50 top-0 bg-opacity-80 bg-primaryBG">
      <div className="flex flex-row mb-2 text-lg h-full tracking-wider font-heading pl-5">
        <div className="mt-1">
          Select Launcher{" "}
          <Chip size="sm" color="primary" className="ml-2">
            v3
          </Chip>
        </div>
        <div className="ml-auto titlebar-nodrag">
          <Button
            isIconOnly
            onClick={() => window.windowControls.minimizeWindow()}
            radius="none"
            variant="light"
          >
            <FiMinus size={24} />
          </Button>
          <Button
            isIconOnly
            onClick={() => window.windowControls.maximizeWindow()}
            radius="none"
            variant="light"
          >
            <FiMaximize size={24} />
          </Button>
          <Button
            isIconOnly
            onClick={() => window.windowControls.closeWindow()}
            radius="none"
            variant="light"
            color="danger"
          >
            <FiX size={24} />
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Titlebar;
