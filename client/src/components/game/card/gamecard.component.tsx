import GameInfo from "@/interfaces/GameInfoInterface";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Button,
  Avatar,
  Tooltip,
  Progress,
} from "@nextui-org/react";
import { Badge } from "@nextui-org/badge";
import { HiDownload, HiOutlineFolderRemove } from "react-icons/hi";
import { HiCheckBadge } from "react-icons/hi2";
import { BsPlayFill } from "react-icons/bs";
import { toast } from "react-toastify";
import { ipcRenderer } from "electron";
import gameIcon from "../../../assets/images/ICON_Game.png";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GamesStore } from "@/stores/GamesStore";

interface GameCardProps {
  game: GameInfo;
}

export const GameCard: React.FC<GameCardProps> = ({ game }) => {
  const [downloadStatus, setDownloadStatus] = useState<{
    gameName?: string;
    percentage?: number;
    remainingSize?: number;
    msg?: string;
  }>({});

  const gamesStore = GamesStore;

  const installedGames = gamesStore.installedGames;

  const storedInstalledGames = JSON.parse(
    localStorage.getItem("installedGames")!
  );

  const addInstalledGame = (gameName: string) => {
    const newInstalledGames = [...storedInstalledGames, gameName];

    localStorage.setItem("installedGames", JSON.stringify(newInstalledGames));

    GamesStore.setInstalledGames(newInstalledGames);
  };

  const removeInstalledGame = (gameName: string) => {
    const newInstalledGames = storedInstalledGames.filter(
      (installedGame: string) => installedGame !== gameName
    );

    localStorage.setItem("installedGames", JSON.stringify(newInstalledGames));

    gamesStore.setInstalledGames(newInstalledGames);

    window.location.reload();
  };

  useEffect(() => {
    ipcRenderer.on(
      "downloading",
      (e, { gameName, percentage, remainingSize, msg }) => {
        setDownloadStatus({ gameName, percentage, remainingSize, msg });
      }
    );
  }, []);

  return (
    <Card
      isPressable
      isHoverable
      className="bg-secondaryBG m-5 py-2 px-1 h-fit w-fit"
    >
      <Link to={`/games/${game.name}`} className="text-white">
        <CardHeader>
          <Avatar src={gameIcon} alt={game.name + " Icon"} size="lg" />
          <div className="grid">
            <div>
              <p className="text-2xl font-montserrat font-bold flex items-center leading-2 normal-case">
                {game.name}
                {game.verified && (
                  <Tooltip content="Verified" color="success">
                    <Badge
                      size="sm"
                      color="success"
                      className="ml-1"
                      disableOutline
                      variant="flat"
                    >
                      <HiCheckBadge size="20" />
                    </Badge>
                  </Tooltip>
                )}
              </p>
            </div>
            <div className="flex-row mt-1 normal-case">
              {game.tags.map((tag, i) => (
                <Badge
                  key={i}
                  color="default"
                  className="border-none font-medium mr-1"
                  disableOutline
                  size={"sm"}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardBody className="py-4">
          <p className="font-medium font-inter max-h-20 overflow-ellipsis normal-case">
            {game.description}
          </p>
        </CardBody>

        {downloadStatus.gameName === game.downloadName && (
          <CardBody className="grid justify-left normal-case">
            <p className="mb-2">{downloadStatus.msg}</p>
            {downloadStatus.percentage && downloadStatus.percentage > 0 && (
              <Progress
                size="sm"
                color="primary"
                value={Number(Number(downloadStatus.percentage).toFixed(0))}
              />
            )}
            <p className="mt-2 ">
              {downloadStatus.percentage &&
                downloadStatus.percentage > 0 &&
                Number((downloadStatus.remainingSize || 0) / 1e6).toFixed(1) +
                  " MBs remaining"}
            </p>
          </CardBody>
        )}
      </Link>
      <Divider />

      <CardFooter>
        <div className="flex-row justify-start">
          {installedGames.includes(game.name) ? (
            <div className="flex">
              <Button
                color="secondary"
                className="w-auto"
                onClick={() => {
                  window.gamesAPI.startGame(game.name);
                  toast.success(`Starting ${game.name}`);
                }}
              >
                <BsPlayFill size={20} />
              </Button>
              <Button
                startContent={<HiOutlineFolderRemove size="20" />}
                size="md"
                color="danger"
                variant="flat"
                className="ml-2 w-auto"
                onPress={() => {
                  window.gamesAPI.uninstallGame(game.name);
                  ipcRenderer.on("finish-uninstall", (event, message) => {
                    toast.error(message);
                    removeInstalledGame(game.name);
                  });
                }}
                disabled={downloadStatus && downloadStatus.percentage! > 0}
              >
                uninstall
              </Button>
            </div>
          ) : (
            <Button
              startContent={<HiDownload size="20" />}
              size="md"
              color="primary"
              className="ml-2 shadow-md w-auto font-bold"
              onPressEnd={() => {
                window.gamesAPI.downloadGame(game.downloadName);
                ipcRenderer.once("finish-download", (event, message) => {
                  addInstalledGame(game.name);
                  toast.success(message);
                });
              }}
              disabled={downloadStatus && downloadStatus.percentage! > 0}
            >
              download
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};
