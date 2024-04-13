import { AppBar } from "@/components";
import { SidebarObserver } from "@/components/sidebar/sidebar.component";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Image,
} from "@nextui-org/react";
import { observer } from "mobx-react";
import React, { FC } from "react";
import { FiEdit, FiEdit2, FiEdit3, FiPenTool } from "react-icons/fi";
import UserImage from "../../../../../Resources/ICON_User.png";
import { UserStore } from "@/stores/UserStore";
import { FaAsterisk, FaLock, FaUnlock } from "react-icons/fa6";
import { AppSettingsThemeCard } from "./components/theme-card.app-settings";
import { ThemeStore } from "@/stores/ThemeStore";

interface IProps {}

/**
 * @author
 * @function @AppSettings
 **/

const AppSettingsComp: FC<IProps> = (props) => {
  return (
    <div className="flex h-screen overflow-y-auto">
      <SidebarObserver settings active="account" />
      <div className="content mt-5 mr-5 w-full">
        <AppBar pageName="App" settings searchBarVisible={false} />
        <Card className="mt-10 p-2 max-h-fit">
          <CardHeader className="font-heading flex items-center text-xl">
            <span className="uppercase">themes</span>
            <Chip className="ml-2 bg-background uppercase">
              {ThemeStore.theme}
            </Chip>
          </CardHeader>
          <CardBody>
            <div className="grid grid-cols-5">
              <AppSettingsThemeCard theme="dark" />
              <AppSettingsThemeCard theme="spearmint" />
              <AppSettingsThemeCard theme="light" />
              <AppSettingsThemeCard theme="accent" />
              <AppSettingsThemeCard theme="aquatica" />
            </div>
          </CardBody>
        </Card>
        <Card className="mt-10 p-2 max-h-fit">
          <CardHeader className="font-heading flex items-center text-xl">
            <span className="uppercase">From your favourite titles</span>
          </CardHeader>
          <CardBody>
            <div className="grid grid-cols-4">
              <AppSettingsThemeCard theme="minecraft" />
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export const AppSettings = observer(AppSettingsComp);
