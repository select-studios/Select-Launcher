//#region Imports
import Offline_E from "./pages/errors/offline/offline.errorpage";
import { useRoutes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Detector } from "react-detect-offline";
import { GamesStore } from "./stores/GamesStore";
import { ipcRenderer } from "electron";
import {
  Button,
  Image,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalContent,
} from "@nextui-org/react";
import launcherIcon from "./assets/images/ICON_GrayScale.png";
import exportedRoutes from "./routes";
import { SelectLauncherImage } from "./components/images/selectlauncher.component";
//#endregion

const App: React.FC = () => {
  const location = useLocation();
  const [updateModalVisible, setUpdateModalVisible] = React.useState(false);
  const [updateMessage, setUpdateMessage] = useState("");

  const closeHandler = () => {
    setUpdateModalVisible(false);
  };

  //#region Routes
  const page = useRoutes(exportedRoutes);

  if (!page) return null;
  //#endregion

  useEffect(() => {
    ipcRenderer.on("update_available", (e, msg) => {
      setUpdateMessage(msg);
      setUpdateModalVisible(true);
    });

    ipcRenderer.on("update_downloaded", (e, msg) => {
      setUpdateMessage(msg);
      setUpdateModalVisible(true);
    });

    window.gamesAPI.getStorageLocation();

    if (!localStorage.getItem("installedGames")) {
      GamesStore.setInstalledGames([]);
      localStorage.setItem("installedGames", JSON.stringify([]));
    } else {
      const storedGames = JSON.parse(localStorage.getItem("installedGames")!);
      GamesStore.setInstalledGames(storedGames);
    }
  }, []);

  return (
    <AnimatePresence mode="wait">
      <Detector
        render={({ online }) => {
          if (!online) {
            setTimeout(() => {
              return <Offline_E />;
            }, 5000);
          }

          return React.cloneElement(page, { key: location.pathname });
        }}
      />
      <Modal
        isOpen={updateModalVisible}
        onClose={() => setUpdateModalVisible(false)}
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
              <ModalBody className="mt-2">
                <p>A new version of the Select Launcher is now available!</p>
                <p>
                  You can keep playing while we install the update in the
                  background.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={onClose}>
                  Alright!
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </AnimatePresence>
  );
};

export default App;
