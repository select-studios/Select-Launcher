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
  Chip,
} from "@nextui-org/react";
import { Badge } from "@nextui-org/badge";
import { HiDownload, HiOutlineFolderRemove } from "react-icons/hi";
import { HiCheckBadge } from "react-icons/hi2";
import { BsPlayFill } from "react-icons/bs";
import { toast } from "react-toastify";
import { ipcRenderer } from "electron";
import gameIcon from "../../../assets/images/ICON_Game.png";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GamesStore } from "@/stores/GamesStore";

interface GameCardProps {
  game: GameInfo;
}

export const GameCard: React.FC<GameCardProps> = ({ game }) => {
  const navigate = useNavigate();
  // will be ported to the game page instead

  // const [downloadStatus, setDownloadStatus] = useState<{
  //   gameName?: string;
  //   percentage?: number;
  //   remainingSize?: number;
  //   msg?: string;
  // }>({});

  // const gamesStore = GamesStore;

  // const installedGames = gamesStore.installedGames;

  // const storedInstalledGames = JSON.parse(
  //   localStorage.getItem("installedGames")!
  // );

  // const addInstalledGame = (gameName: string) => {
  //   const newInstalledGames = [...storedInstalledGames, gameName];

  //   localStorage.setItem("installedGames", JSON.stringify(newInstalledGames));

  //   GamesStore.setInstalledGames(newInstalledGames);
  // };

  // const removeInstalledGame = (gameName: string) => {
  //   const newInstalledGames = storedInstalledGames.filter(
  //     (installedGame: string) => installedGame !== gameName
  //   );

  //   localStorage.setItem("installedGames", JSON.stringify(newInstalledGames));

  //   gamesStore.setInstalledGames(newInstalledGames);

  //   window.location.reload();
  // };

  // useEffect(() => {
  //   ipcRenderer.on(
  //     "downloading",
  //     (e, { gameName, percentage, remainingSize, msg }) => {
  //       setDownloadStatus({ gameName, percentage, remainingSize, msg });
  //     }
  //   );
  // }, []);

  return (
    <Card
      isPressable
      onPress={() => navigate(`/games/${game.name}`)}
      isHoverable
      className="bg-secondaryBG mb-5 flex justify-center p-2 w-40 h-[250px]"
    >
      <CardHeader className="flex justify-end">
        <Chip color="success" variant="flat">
          Free
        </Chip>
      </CardHeader>
      <CardFooter className="font-heading mt-auto flex justify-center uppercase text-xl">
        {game.name}
      </CardFooter>
    </Card>
  );
};
