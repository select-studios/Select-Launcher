import { AppBar, Sidebar } from "@/components";
import { UserStore } from "@/stores/UserStore";
import { Button, Input } from "@nextui-org/react";
import { BsFileEarmarkPlusFill } from "react-icons/bs";
import { useState, useEffect } from "react";

interface AppSettingsProps {}

const AppSettings: React.FC<AppSettingsProps> = () => {
  const user = UserStore.user;
  const [libraryLocation, setLibraryLocation] = useState<string>();
  useEffect(() => {
    setLibraryLocation(window.gamesAPI.getStorageLocation());
  });
  return (
    <section>
      <AppBar dashboard user={user!} />
      <div className="flex">
        <Sidebar active="app" settings />
        <div className="settings w-full m-10 mb-20 text-white flex-col items-center justify-center">
          <div className="settings__box bg-secondary rounded-md shadow-xl h-fit">
            <section className="title__strip tracking-normal flex items-center justify-center bg-tertiary rounded-t-md">
              <h2 className="font-montserrat text-2xl font-bold ml-2 mt-2">
                App Settings
              </h2>
            </section>
            <section className="settings__content flex flex-col p-10">
              <h2 className="text-lg font-semibold">
                <Input
                  size="xl"
                  readOnly
                  value={libraryLocation}
                  contentRightStyling={false}
                  contentRight={
                    <Button
                      auto
                      className="rounded-full mr-2 cursor-pointer"
                      css={{ width: "24px" }}
                      onClick={async () => {
                        const newLibraryPath =
                          await window.filesAPI.openFolder();
                        if (newLibraryPath) {
                          window.gamesAPI.setStorageLocation(newLibraryPath);
                          setLibraryLocation(
                            window.gamesAPI.getStorageLocation()
                          );
                        }
                      }}
                    >
                      <BsFileEarmarkPlusFill size={20} />
                    </Button>
                  }
                  css={{
                    width: "100%",
                  }}
                  helperText="Selects the location where your games are downloaded"
                  label="Library Location"
                />
              </h2>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppSettings;
