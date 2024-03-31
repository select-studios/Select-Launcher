import { Button, Chip } from "@nextui-org/react";
import { FaRegWindowMinimize } from "react-icons/fa";
import { CiMaximize2 } from "react-icons/ci";
import { IoCloseOutline } from "react-icons/io5";

const Titlebar = () => {
  return (
    <nav className="titlebar h-[40px] w-screen bg-primaryBG">
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
            color="primary"
          >
            <FaRegWindowMinimize />
          </Button>
          <Button
            isIconOnly
            onClick={() => window.windowControls.maximizeWindow()}
            radius="none"
            variant="light"
            color="warning"
          >
            <CiMaximize2 />
          </Button>
          <Button
            isIconOnly
            onClick={() => window.windowControls.closeWindow()}
            radius="none"
            variant="light"
            color="danger"
          >
            <IoCloseOutline />
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Titlebar;
