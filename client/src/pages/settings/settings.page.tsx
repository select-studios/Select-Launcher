import { AppBar, Sidebar } from "@/components";
import { UserStore } from "@/stores/UserStore";
import {
  Card,
  CardBody,
  CardHeader,
  Checkbox,
  Input,
  Button,
} from "@nextui-org/react";
import { FaFolderOpen } from "react-icons/fa";
import { FC, useState, useEffect } from "react";
import appInfo from "../../../package.json";
import { SidebarStore } from "@/stores/SidebarStore";

interface IProps {}

/**
 * @author
 * @function @Settings
 **/

export const Settings: FC<IProps> = (props) => {
  const { user } = UserStore;
  const [libraryLocation, setLibraryLocation] = useState<string>();

  useEffect(() => {
    SidebarStore.setOpen(true);
    setLibraryLocation(window.gamesAPI.getStorageLocation());
  });

  return (
    <section className="settings">
      <div className="main flex">
        <Sidebar settings active="home" />
        <div className="content mt-5 mr-5 w-full">
          <AppBar settings pageName="Settings" />
          <div className="mt-12">
            <Card className="p-2">
              <CardHeader>
                <p className="font-heading tracking-wider text-xl uppercase">
                  General
                </p>
              </CardHeader>
              <CardBody>
                <Checkbox>Update app automatically</Checkbox>
                <Input
                  label="Download Location"
                  className="mt-10"
                  isReadOnly
                  value={libraryLocation}
                  endContent={
                    <Button
                      className="rounded-full mr-2 cursor-pointer w-6"
                      onClick={async () => {
                        let newLibraryPath = await window.filesAPI.openFolder();
                        if (newLibraryPath) {
                          window.gamesAPI.setStorageLocation(newLibraryPath);
                          setLibraryLocation(
                            window.gamesAPI.getStorageLocation()
                          );
                        }
                      }}
                    >
                      <FaFolderOpen size={20} />
                    </Button>
                  }
                />
              </CardBody>
            </Card>
            <Card className="mt-12 p-2">
              <CardHeader>
                <p className="font-heading tracking-wider text-xl uppercase">
                  App information
                </p>
              </CardHeader>
              <CardBody>
                <div className="grid grid-cols-4">
                  <div className="bg-tertiaryBG rounded-lg px-4 py-2">
                    <p className="text-base font-heading uppercase">Version</p>
                    <p className="text-base">{appInfo.version}</p>
                  </div>
                  <div className="bg-tertiaryBG rounded-lg px-4 py-2 ml-2">
                    <p className="text-base font-heading uppercase">Build</p>
                    <p className="text-base">3000</p>
                  </div>
                  <div className="bg-tertiaryBG rounded-lg px-4 py-2 ml-2">
                    <p className="text-base font-heading uppercase">
                      Developer
                    </p>
                    <p className="text-base">Select Studios</p>
                  </div>
                  <div className="bg-tertiaryBG rounded-lg px-4 py-2 ml-2">
                    <p className="text-base font-heading uppercase">
                      Released on
                    </p>
                    <p className="text-base">03/04/2024</p>
                  </div>
                </div>
              </CardBody>
            </Card>
            <Card className="mt-12 p-2">
              <CardHeader>
                <p className="font-heading tracking-wider text-xl uppercase">
                  Developer tools
                </p>
              </CardHeader>
              <CardBody>
                <div className="grid grid-cols-4">
                  <div className="bg-tertiaryBG rounded-lg px-4 py-2">
                    <p className="text-base font-heading uppercase">User id</p>
                    <p className="text-base">{user?._id}</p>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
