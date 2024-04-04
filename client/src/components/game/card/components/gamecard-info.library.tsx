import GameInfo from "@/interfaces/GameInfoInterface";
import { Chip } from "@nextui-org/react";
import React, { FC } from "react";
import { LibraryGamecardDownloading } from "./gamecard-downloading.library";
import { LibraryGamecardButtons } from "./gamecard-buttons.library";
import { DownloadStatus } from "../gamecard.library";

interface IProps {
  game: GameInfo;
  downloadStatus: DownloadStatus;
}

/**
 * @author
 * @function @LibraryGamecardInfo
 **/

export const LibraryGamecardInfo: FC<IProps> = ({ game, downloadStatus }) => {
  return (
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
      <LibraryGamecardDownloading game={game} downloadStatus={downloadStatus} />
      <LibraryGamecardButtons downloadStatus={downloadStatus} game={game} />
    </div>
  );
};
