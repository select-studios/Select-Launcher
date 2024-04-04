import GameInfo from "@/interfaces/GameInfoInterface";
import { UserStore } from "@/stores/UserStore";
import {
  Card,
  CardHeader,
  CardFooter,
  Chip,
  CardBody,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Progress,
  Spinner,
  Tooltip,
} from "@nextui-org/react";
import { ipcRenderer } from "electron";
import { observer } from "mobx-react";
import { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaRegCirclePlay, FaTrashCan } from "react-icons/fa6";
import { GrInstallOption } from "react-icons/gr";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import path from "path";

interface LibraryGameCard {
  game: GameInfo;
}

const installedDropdownItems = [
  {
    key: "visit-store-page",
    label: "Visit store page",
  },
  {
    key: "open-location",
    label: "Locate game files",
  },
];

const notInstalledDropdownItems = [
  {
    key: "visit-store-page",
    label: "Visit store page",
  },
];

const LibraryGameCardComp: React.FC<LibraryGameCard> = ({ game }) => {
  const navigate = useNavigate();

  const installedGames = window.gamesAPI.getInstalledGames();

  const [installedGamesState, setInstalledGamesState] =
    useState(installedGames);
  const isInstalled = installedGamesState.includes(game.name);

  const [downloadStatus, setDownloadStatus] = useState<{
    gameName?: string;
    percentage?: number;
    remainingSize?: number;
    msg?: string;
  }>({});

  const visitStorePage = () => {
    navigate(`/games/${game.name}`);
  };

  const locateGameFiles = () => {
    require("child_process").exec(
      `start "" "${path.join(window.gamesAPI.getStorageLocation(), game.name)}"`
    );
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
    <Card className="bg-secondaryBG mb-5 p-2 w-full h-[250px]">
      <CardBody className="flex flex-row">
        <div className="bg-tertiaryBG rounded-lg flex-start w-64 h-full"></div>
        <div className="ml-4 flex flex-col">
          <div>
            <h1 className="tracking-wider text-3xl uppercase font-heading">
              {game.name}
            </h1>
            <div className="flex flex-row gap-2">
              {game.tags.map((tag) => (
                <Chip
                  color="default"
                  variant="solid"
                  className="mt-1 bg-tertiaryBG"
                >
                  {tag}
                </Chip>
              ))}
            </div>
          </div>
          <p className="overflow-hidden mt-2 font-semibold opacity-70">
            {game.description}
          </p>
          {downloadStatus && downloadStatus.gameName === game.downloadName && (
            <div className="download-progress mt-auto">
              <p className="font-semibold opacity-70">
                {downloadStatus.msg?.length
                  ? downloadStatus.msg
                  : "Installing..."}
              </p>

              <Progress
                className={"mt-5"}
                size="sm"
                color="success"
                isIndeterminate={
                  (downloadStatus.msg?.length || 0) <= 0 || false
                }
                value={Number(Number(downloadStatus.percentage).toFixed(0))}
              />
            </div>
          )}
          <div
            className={
              downloadStatus && downloadStatus.gameName === game.downloadName
                ? "hidden"
                : "Buttons mt-auto"
            }
          >
            {isInstalled ? (
              <div className="flex flex-row">
                <Button
                  color="primary"
                  variant="shadow"
                  className="mr-2"
                  size="lg"
                  onPress={() => {
                    window.gamesAPI.startGame(game.name);
                    toast.success(`Starting ${game.name}`);
                  }}
                  startContent={<FaRegCirclePlay size={20} />}
                >
                  Launch
                </Button>
                <Dropdown size="lg">
                  <DropdownTrigger>
                    <Button isIconOnly size="lg">
                      <BsThreeDotsVertical />
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu>
                    {installedDropdownItems.map((item) => (
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
                <Tooltip content="Uninstall Game">
                  <Button
                    startContent={<FaTrashCan />}
                    color="default"
                    variant="ghost"
                    size="lg"
                    className="ml-auto"
                    isIconOnly
                    onPress={() => {
                      window.gamesAPI.uninstallGame(game.downloadName);
                      ipcRenderer.once("finish-uninstall", (event, message) => {
                        window.gamesAPI.removeInstalledGames(game.name);
                        setInstalledGamesState(
                          window.gamesAPI.getInstalledGames()
                        );
                      });
                    }}
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
                  onPress={() => {
                    window.gamesAPI.downloadGame(game.downloadName);
                    ipcRenderer.once("finish-download", (event, message) => {
                      window.gamesAPI.addInstalledGames(game.name);
                      setInstalledGamesState(
                        window.gamesAPI.getInstalledGames()
                      );
                    });
                  }}
                >
                  Install Now
                </Button>
                <Dropdown size="lg">
                  <DropdownTrigger>
                    <Button isIconOnly size="lg">
                      <BsThreeDotsVertical />
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu>
                    {notInstalledDropdownItems.map((item) => (
                      <DropdownItem
                        onPress={() => {
                          if (item.key === "visit-store-page") {
                            visitStorePage();
                          }
                        }}
                        key={item.key}
                      >
                        {item.label}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </Dropdown>
              </div>
            )}
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export const LibraryGameCard = observer(LibraryGameCardComp);
