import { Image } from "@nextui-org/react";
import React, { FC } from "react";
import LauncherLogo from "../../../../Resources/ICON_SelectLauncher.png";

interface IProps {}

/**
 * @author
 * @function @SelectLauncherImage
 **/

export const SelectLauncherImage: FC<IProps> = (props) => {
  return (
    <Image src={LauncherLogo} alt="Launcher Logo" width="64px" height="64px" />
  );
};
