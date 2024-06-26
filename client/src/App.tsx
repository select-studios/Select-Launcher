//#region Imports
import Offline_E from "./pages/errors/offline/offline.errorpage";
import { useRoutes, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Detector } from "react-detect-offline";
import { GamesStore } from "./stores/GamesStore";
import { ipcRenderer } from "electron";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalContent,
  Progress,
} from "@nextui-org/react";
import exportedRoutes from "./routes";
import { SelectLauncherImage } from "./components/images/selectlauncher.component";
import { FiUserCheck } from "react-icons/fi";
import { observer } from "mobx-react";
import { ThemeStore } from "./stores/ThemeStore";
//#endregion

const AppComp: React.FC = () => {
  const location = useLocation();
  const [updateModalVisible, setUpdateModalVisible] = React.useState(false);
  const [updateMessage, setUpdateMessage] = useState("");
  const [updateDownloaded, setUpdateDownloaded] = useState(false);

  const [verificationModalVisible, setVerificationModalVisible] =
    React.useState(false);

  //#region Routes
  const page = useRoutes(exportedRoutes);

  if (!page) return null;

  const navigate = useNavigate();
  //#endregion

  useEffect(() => {
    setUpdateModalVisible(false);

    ipcRenderer.on("update_available", (e, msg) => {
      setUpdateMessage(msg);
      setUpdateModalVisible(true);
    });

    ipcRenderer.on("update_downloaded", (e, msg) => {
      setUpdateMessage(msg);
      setUpdateModalVisible(true);
      setUpdateDownloaded(true);
    });

    ipcRenderer.on("verification-success", (e, msg) => {
      setVerificationModalVisible(true);
    });

    ipcRenderer.on("open-game", (e, msg) => navigate(`/games/${msg}`));

    if (!localStorage.getItem("installedGames")) {
      GamesStore.setInstalledGames([]);
      localStorage.setItem("installedGames", JSON.stringify([]));
    } else {
      const storedGames = JSON.parse(localStorage.getItem("installedGames")!);
      GamesStore.setInstalledGames(storedGames);
      ThemeStore.getTheme();
    }
  }, []);

  return (
    <div>
      <AnimatePresence mode="wait">
        <Detector
          polling={{
            url: "https://api.ipify.org/?format=json",
            timeout: 5000,
            interval: 5000,
            enabled: true,
          }}
          render={({ online }) => {
            if (!online) {
              return <Offline_E />;
            }

            return React.cloneElement(page, { key: location.pathname });
          }}
        />
      </AnimatePresence>{" "}
      <Modal
        backdrop="blur"
        isDismissable={false}
        onClose={() => setUpdateModalVisible(false)}
        isOpen={updateModalVisible}
        // isOpen={true}
        hideCloseButton
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="grid justify-center w-full gap-1">
                <div className="mx-auto">
                  <SelectLauncherImage />
                </div>
                <p className="font-heading tracking-wider mt-5 text-2xl font-extralight">
                  LAUNCHER UPDATER
                </p>
              </ModalHeader>
              <ModalBody className="mt-2 whitespace-pre-wrap">
                <p>{updateMessage}</p>
                {!updateDownloaded && (
                  <div>
                    <Progress size="sm" />
                  </div>
                )}
              </ModalBody>
              {updateDownloaded && (
                <ModalFooter>
                  <Button
                    color="primary"
                    variant="shadow"
                    onPress={() => ipcRenderer.send("restart_app")}
                  >
                    Restart Now
                  </Button>
                </ModalFooter>
              )}
            </>
          )}
        </ModalContent>
      </Modal>
      <Modal
        onClose={() => setVerificationModalVisible(false)}
        isOpen={verificationModalVisible}
        hideCloseButton
        isDismissable={false}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex text-2xl font-light flex-col font-heading gap-1"></ModalHeader>
              <ModalBody>
                <div className="grid text-center justify-center">
                  <FiUserCheck className="mx-auto text-success" size={100} />
                  <p className="text-2xl mt-5 font-heading">
                    VERIFICATION SUCCESSUL!
                  </p>
                  <p className="mt-2 font-semibold">
                    Your account is now verified
                    <div className="br">
                      Please click on the "Restart" button to confirm these
                      changes.
                    </div>
                  </p>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="success"
                  onPress={() => window.location.reload()}
                >
                  Restart
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

const App = observer(AppComp);

export default App;
