import GameInfo from "@/interfaces/GameInfoInterface";
import { Card, CardBody } from "@nextui-org/react";
import { ipcRenderer } from "electron";
import { observer } from "mobx-react";
import { useEffect, useState } from "react";
import { LibraryGamecardInfo } from "./components/gamecard-info.library";

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
