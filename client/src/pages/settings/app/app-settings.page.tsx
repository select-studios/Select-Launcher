import { AppBar } from "@/components";
import { SidebarObserver } from "@/components/sidebar/sidebar.component";
import { Card, CardBody, CardHeader, Chip, Tooltip } from "@nextui-org/react";
import { observer } from "mobx-react";
import { FC } from "react";
import { AppSettingsThemeCard } from "./components/theme-card.app-settings";
import { ThemeStore } from "@/stores/ThemeStore";
import { HiSparkles } from "react-icons/hi";

interface IProps {}

/**
 * @author
 * @function @AppSettings
 **/

const AppSettingsComp: FC<IProps> = (props) => {
  return (
    <div className="flex h-screen overflow-y-scroll">
      <SidebarObserver settings active="app" />
      <div className="content mt-5 mr-5 w-full h-fit">
        <AppBar pageName="App" settings searchBarVisible={false} />
        <Card className="mt-10 p-2 mb-20">
          <CardHeader className="font-heading flex items-center text-xl">
            <span className="uppercase">themes</span>
            <Tooltip content="Current Theme" showArrow>
              <Chip className="ml-2 bg-background uppercase">
                <p className="tracking-wider">
                  {ThemeStore.theme.split("-").join(" ")}
                </p>
              </Chip>
            </Tooltip>
          </CardHeader>
          <CardBody>
            <div className="grid grid-cols-3">
              <AppSettingsThemeCard theme="midnight" />
              <AppSettingsThemeCard theme="midnight-purple" />
              <AppSettingsThemeCard theme="light" />
              <AppSettingsThemeCard theme="spearmint" />
              <AppSettingsThemeCard theme="aquatica" />
            </div>
            <Card className="mt-10 p-2 max-h-fit bg-content2">
              <CardHeader className="font-heading flex items-center text-xl">
                <span className="uppercase tracking-wide flex items-center">
                  Special Themes{" "}
                  <Tooltip
                    content="We do not endorse any of the titles below."
                    showArrow
                  >
                    <Chip className="ml-2 bg-content1 uppercase">
                      <HiSparkles size={16} />
                    </Chip>
                  </Tooltip>
                </span>
              </CardHeader>
              <CardBody>
                <div>
                  <div className="grid grid-cols-3">
                    <AppSettingsThemeCard theme="minecraft" />
                    <AppSettingsThemeCard theme="discord" />
                  </div>
                </div>
              </CardBody>
            </Card>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export const AppSettings = observer(AppSettingsComp);
