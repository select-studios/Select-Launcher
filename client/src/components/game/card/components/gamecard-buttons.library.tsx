import React, { FC, useState } from "react";
import { DownloadStatus } from "../gamecard.library";
import GameInfo from "@/interfaces/GameInfoInterface";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Tooltip,
} from "@nextui-org/react";
import { toast } from "react-toastify";
import { FaRegCirclePlay, FaTrashCan } from "react-icons/fa6";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useNavigate } from "react-router";
import path from "path";
import { ipcRenderer } from "electron";
import { GrInstallOption } from "react-icons/gr";

interface IProps {
  downloadStatus: DownloadStatus;
  game: GameInfo;
}

/**
 * @author
 * @function @LibraryGamecardButtons
 **/

const moreDropdownItems = [
  {
    key: "visit-store-page",
    label: "Visit store page",
    installedOnly: false,
  },
  {
    key: "open-location",
    label: "Locate game files",
    installedOnly: true,
  },
];

const MoreDropdownButton = ({
  game,
  installed,
}: {
  game: GameInfo;
  installed: boolean;
}) => {
  const navigate = useNavigate();

  const visitStorePage = () => {
    navigate(`/games/${game.name}`);
  };

  const locateGameFiles = () => {
    require("child_process").exec(
      `start "" "${path.join(window.gamesAPI.getStorageLocation(), game.name)}"`
    );
  };

  return (
    <Dropdown size="lg">
      <DropdownTrigger>
        <Button isIconOnly size="lg">
          <BsThreeDotsVertical />
        </Button>
      </DropdownTrigger>
      <DropdownMenu>
        {installed
          ? moreDropdownItems.map((item) => (
              <DropdownItem
                onPress={() => {
                  if (item.key === "visit-store-page") {
                    visitStorePage();
                  } else if (item.key === "open-location") {
                    locateGameFiles();
                  }
                }}
                key={item.key}
              >
                {item.label}
              </DropdownItem>
            ))
          : moreDropdownItems
              .filter((item) => !item.installedOnly)
              .map((item) => (
                <DropdownItem
                  onPress={() => {
                    if (item.key === "visit-store-page") {
                      visitStorePage();
                    } else if (item.key === "open-location") {
                      locateGameFiles();
                    }
                  }}
                  key={item.key}
                >
                  {item.label}
                </DropdownItem>
              ))}
      </DropdownMenu>
    </Dropdown>
  );
};

export const LibraryGamecardButtons: FC<IProps> = ({
  downloadStatus,
  game,
}) => {
  const installedGames = window.gamesAPI.getInstalledGames();

  const [installedGamesState, setInstalledGamesState] =
    useState(installedGames);
  const isInstalled = installedGamesState.includes(game.name);

  const onUninstallGame = () => {
    window.gamesAPI.uninstallGame(game.name);
    ipcRenderer.once("finish-uninstall", (event, message) => {
      window.gamesAPI.removeInstalledGames(game.name);
      setInstalledGamesState(window.gamesAPI.getInstalledGames());
    });
  };

  const onInstallGame = () => {
    window.gamesAPI.downloadGame(game.downloadName);
    ipcRenderer.once("finish-download", (event, message) => {
      window.gamesAPI.addInstalledGames(game.name);
      setInstalledGamesState(window.gamesAPI.getInstalledGames());
    });
  };

  const onLaunchGame = () => {
    window.gamesAPI.startGame(game.name);
    toast.success(`Starting ${game.name}`);
  };

  return (
    <div
      className={
        downloadStatus && downloadStatus.gameName === game.downloadName
          ? "hidden"
          : "buttons mt-auto"
      }
    >
      {isInstalled ? (
        <div className="flex flex-row">
          <Button
            color="primary"
            variant="shadow"
            className="mr-2"
            size="lg"
            onPress={onLaunchGame}
            startContent={<FaRegCirclePlay size={20} />}
          >
            Launch
          </Button>
          <MoreDropdownButton installed game={game} />
          <Tooltip content="Uninstall Game">
            <Button
              startContent={<FaTrashCan />}
              color="default"
              variant="ghost"
              size="lg"
              className="ml-auto"
              isIconOnly
              onPress={onUninstallGame}
            ></Button>
          </Tooltip>
        </div>
      ) : (
        <div className="flex flex-row">
          <Button
            color="success"
            variant="shadow"
            className="mr-2"
            size="lg"
            isDisabled={downloadStatus && downloadStatus.percentage! > 0}
            startContent={<GrInstallOption size={20} />}
            onPress={onInstallGame}
          >
            Install Now
          </Button>
          <MoreDropdownButton installed={false} game={game} />
        </div>
      )}
    </div>
  );
};
