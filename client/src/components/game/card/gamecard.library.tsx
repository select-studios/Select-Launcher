import GameInfo from "@/interfaces/GameInfoInterface";
import { Card, CardBody, Image } from "@nextui-org/react";
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
    <Card className="bg-content1 mb-5 p-2 w-full h-[250px]">
      <CardBody className="flex flex-row">
        <Image
          src={game.image.banner}
          className="bg-content2 rounded-lg object-cover flex-start h-full w-[270px]"
        />
        <LibraryGamecardInfo downloadStatus={downloadStatus} game={game} />
      </CardBody>
    </Card>
  );
};

export const LibraryGameCard = observer(LibraryGameCardComp);
