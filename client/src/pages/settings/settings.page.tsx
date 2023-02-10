import { AppBar, Sidebar } from "@/components";
import { Loader, LoadingState } from "@/components/loader/loader.component";
import { Button, Input } from "@nextui-org/react";
import { logout } from "@/handlers/api";
import protectRoute from "@/handlers/api/protectRoute";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router";
import { BsFileEarmarkPlusFill } from "react-icons/bs";

interface SettingsProps {}

const Settings: React.FC<SettingsProps> = () => {
  const [cookies, setCookie, removeCookie] = useCookies([
    "accessToken",
    "refreshToken",
  ]);
  const [user, setUser] = useState<any>();
  const [loading, setLoading] = useState<LoadingState>({
    state: true,
    msg: "",
  });
  const [libraryLocation, setLibraryLocation] = useState<string>();

  const navigate = useNavigate();

  useEffect(() => {
    setLibraryLocation(window.gamesAPI.getStorageLocation());
  });

  const logoutClient = () => {
    logout(cookies.refreshToken, setLoading, removeCookie, navigate);
  };

  useEffect(() => {
    protectRoute(cookies, setCookie, setUser, setLoading, navigate);
  }, []);

  return !loading ? (
    <div>
      <motion.div exit={{ opacity: 0 }}>
        <div className="settings">
          <AppBar dashboard={true} user={user} logoutFn={logoutClient} />

          <div className="flex">
            <Sidebar active="settings" />

            <div className="settings w-full m-10 mb-20 text-white flex-col items-center justify-center">
              <div className="settings__box bg-secondary rounded-md shadow-xl h-fit">
                <section className="title__strip tracking-normal flex items-center justify-center bg-tertiary rounded-t-md">
                  <h2 className="font-montserrat text-2xl font-bold ml-2 mt-2">
                    Settings
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
                              window.gamesAPI.setStorageLocation(
                                newLibraryPath
                              );
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
        </div>
      </motion.div>
    </div>
  ) : (
    <Loader msg={loading.msg} />
  );
};

export { Settings };
