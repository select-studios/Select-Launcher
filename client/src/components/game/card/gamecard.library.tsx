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
import { LibraryGamecardInfo } from "./components/gamecard-info.library";
import { LibraryGamecardDownloading } from "./components/gamecard-downloading.library";
import { LibraryGamecardButtons } from "./components/gamecard-buttons.library";

interface LibraryGameCard {
  game: GameInfo;
}

export interface DownloadStatus {
  gameName?: string;
  percentage?: number;
  remainingSize?: number;
  msg?: string;
}

const LibraryGameCardComp: React.FC<LibraryGameCard> = ({ game }) => {
  const [downloadStatus, setDownloadStatus] = useState<DownloadStatus>({});

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
        <LibraryGamecardInfo downloadStatus={downloadStatus} game={game} />
      </CardBody>
    </Card>
  );
};

export const LibraryGameCard = observer(LibraryGameCardComp);
