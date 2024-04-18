import { Button } from "@nextui-org/react";
import React, { FC } from "react";
import { BiWindowOpen } from "react-icons/bi";
import { BsWindowDock } from "react-icons/bs";
import { CiMaximize1, CiMaximize2, CiSquareMore } from "react-icons/ci";
import {
  FiMaximize2,
  FiMinus,
  FiPlusSquare,
  FiSquare,
  FiX,
} from "react-icons/fi";

interface IProps {}

/**
 * @author
 * @function @TitlebarButtons
 **/

export const TitlebarButtons: FC<IProps> = (props) => {
  return (
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
        <FiSquare size={24} />
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
  );
};
