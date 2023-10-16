import GameInfo from "@/interfaces/GameInfoInterface";
import {
  Card,
  Text,
  Grid,
  Button,
  Row,
  Spacer,
  Image,
  Avatar,
  Tooltip,
  Progress,
} from "@nextui-org/react";
import { Badge } from "@nextui-org/badge";
import {
  HiDownload,
  HiOutlineFolderRemove,
  HiX,
  HiXCircle,
} from "react-icons/hi";
import { ImBoxRemove } from "react-icons/im";
import { HiCheckBadge } from "react-icons/hi2";
import { BsPlayFill } from "react-icons/bs";
import { toast } from "react-toastify";
import { ipcRenderer } from "electron";
import gameIcon from "../../../assets/images/ICON_Game.png";
import uninstallIcon from "../../../assets/images/ICON_Uninstaller.png";
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
    localStorage.getItem("installedGames")!,
  );

  const addInstalledGame = (gameName: string) => {
    const newInstalledGames = [...storedInstalledGames, gameName];

    localStorage.setItem("installedGames", JSON.stringify(newInstalledGames));

    GamesStore.setInstalledGames(newInstalledGames);
  };

  const removeInstalledGame = (gameName: string) => {
    const newInstalledGames = storedInstalledGames.filter(
      (installedGame: string) => installedGame !== gameName,
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
      },
    );
  }, []);

  return (
    <Card
      isPressable
      isHoverable
      css={{ maxWidth: "400px", backgroundColor: "#282A2D" }}
      className="bg-secondary m-5 py-2 px-1 h-fit w-fit"
    >
      <Link to={`/games/${game.name}`} className="text-white">
        <Card.Header>
          <Avatar src={gameIcon} alt={game.name + " Icon"} size="lg" />
          <Grid.Container css={{ pl: "$6" }}>
            <Grid xs={12}>
              <Text
                className="text-2xl font-montserrat font-bold flex items-center"
                css={{ lineHeight: "$xs" }}
              >
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
              </Text>
            </Grid>
            <Row className="mt-1">
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
            </Row>
          </Grid.Container>
        </Card.Header>
        <Card.Body css={{ py: "$4" }}>
          <Text
            className="font-medium font-inter max-h-20"
            css={{
              textOverflow: "ellipsis",
              fontFamily: "'Inter', sans-serif;",
            }}
          >
            {game.description}
          </Text>
        </Card.Body>

        {downloadStatus.gameName === game.downloadName && (
          <Card.Body className="grid justify-left">
            <p className="mb-2">{downloadStatus.msg}</p>
            {downloadStatus.percentage && downloadStatus.percentage > 0 && (
              <Progress
                size="sm"
                color="primary"
                value={Number(Number(downloadStatus.percentage).toFixed(0))}
              />
            )}
            <p className="mt-2">
              {downloadStatus.percentage &&
                downloadStatus.percentage > 0 &&
                Number((downloadStatus.remainingSize || 0) / 1e6).toFixed(1) +
                  " MBs remaining"}
            </p>
          </Card.Body>
        )}
      </Link>
      <Card.Divider />

      <Card.Footer>
        <Row justify="flex-start">
          {installedGames.includes(game.name) ? (
            <div className="flex">
              <Button
                color="secondary"
                auto
                onClick={() => {
                  window.gamesAPI.startGame(game.name);
                  toast.success(`Starting ${game.name}`);
                }}
              >
                <BsPlayFill size={20} />
              </Button>
              <Button
                icon={<HiOutlineFolderRemove size="20" />}
                size="md"
                color="error"
                auto
                flat
                className="ml-2"
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
              icon={<HiDownload size="20" />}
              size="md"
              color="primary"
              auto
              className="ml-2 shadow-md"
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
        </Row>
      </Card.Footer>
    </Card>
  );
};
