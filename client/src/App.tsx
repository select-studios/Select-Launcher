//#region Imports
import { useRoutes, useLocation } from "react-router-dom";
import { Register, Home, Login, Settings } from "./pages";
import { AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";
import UserSettings from "./pages/settings/user/usersettings.page";
import { NotFound_E } from "./pages/errors";
import { Detector } from "react-detect-offline";
import AuthAPI from "./handlers/api/components/Auth";
import Offline_E from "./pages/errors/offline/offline.errorpage";
import AdminDashboard from "./pages/admin/dashboard/admindashboard.page";
import AppSettings from "./pages/settings/app/appsettings.page";
import Game from "./pages/games/game/[game]";
import { GamesStore } from "./stores/GamesStore";
import { ipcRenderer } from "electron";
import { Button, Image, Modal } from "@nextui-org/react";
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
      element: <Login />,
    },
    {
      path: "/home",
      element: (
        <AuthAPI>
          <Home />
        </AuthAPI>
      ),
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/settings",
      element: (
        <AuthAPI>
          <Settings />
        </AuthAPI>
      ),
    },
    {
      path: "/settings/user",
      element: (
        <AuthAPI>
          <UserSettings />
        </AuthAPI>
      ),
    },
    {
      path: "/settings/app",
      element: (
        <AuthAPI>
          <AppSettings />
        </AuthAPI>
      ),
    },
    {
      path: "/admin/dashboard",
      element: (
        <AuthAPI>
          <AdminDashboard />
        </AuthAPI>
      ),
    },
    {
      path: "/games/:game",
      element: (
        <AuthAPI>
          <Game />
        </AuthAPI>
      ),
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
        open={updateModalVisible}
        onClose={closeHandler}
      >
        <Modal.Header className="grid">
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
        </Modal.Header>
        <Modal.Body>
          <p className="font-medium text-center">{updateMessage}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onPress={closeHandler}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </AnimatePresence>
  );
};

export default App;
