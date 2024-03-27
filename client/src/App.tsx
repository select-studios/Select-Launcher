//#region Imports
import { useRoutes, useLocation } from "react-router-dom";
import { SignIn, SignUp } from "./pages";
import { AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";
import { NotFound_E } from "./pages/errors";
import { Detector } from "react-detect-offline";
import AuthAPI from "@lib/api/Auth";
import Offline_E from "./pages/errors/offline/offline.errorpage";
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
//#endregion

const App: React.FC = () => {
  const location = useLocation();
  const [updateModalVisible, setUpdateModalVisible] = React.useState(false);
  const [updateMessage, setUpdateMessage] = useState("");

  const closeHandler = () => {
    setUpdateModalVisible(false);
  };

  //#region Routes
  const page = useRoutes([
    {
      path: "/",
      element: <SignIn />,
    },
    // {
    //   path: "/home",
    //   element: (
    //     <AuthAPI>
    //       <Home />
    //     </AuthAPI>
    //   ),
    // },
    {
      path: "/register",
      element: <SignUp />,
    },
    { path: "*", element: <NotFound_E /> },
  ]);

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
          <p
            id="modal-title"
            className="text-2xl mt-2 font-bold font-montserrat"
          >
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
