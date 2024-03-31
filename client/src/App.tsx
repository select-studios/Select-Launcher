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
} from "@nextui-org/react";
import launcherIcon from "./assets/images/ICON_GrayScale.png";
import exportedRoutes from "./routes";
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
        closeButton
        aria-labelledby="modal-title"
        isOpen={updateModalVisible}
        onClose={closeHandler}
      >
        <ModalHeader className="grid">
          <Image
            width={80}
            height={80}
            src={launcherIcon}
            alt="Launcher Logo"
            className="rounded-full"
          />
          <p id="modal-title" className="text-2xl mt-2 font-bold font-heading">
            Launcher Updater
          </p>
        </ModalHeader>
        <ModalBody>
          <p className="font-medium text-center">{updateMessage}</p>
        </ModalBody>
        <ModalFooter>
          <Button
            className="w-auto"
            variant="flat"
            color="danger"
            onPress={closeHandler}
          >
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </AnimatePresence>
  );
};

export default App;
