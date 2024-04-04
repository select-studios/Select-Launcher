import React, { FC } from "react";
import { DownloadStatus } from "../gamecard.library";
import GameInfo from "@/interfaces/GameInfoInterface";
import { Progress } from "@nextui-org/react";

interface IProps {
  downloadStatus: DownloadStatus;
  game: GameInfo;
}

/**
 * @author
 * @function @LibraryGamecardDownloading
 **/

export const LibraryGamecardDownloading: FC<IProps> = ({
  downloadStatus,
  game,
}) => {
  return (
    <div className="mt-auto">
      {downloadStatus && downloadStatus.gameName === game.downloadName && (
        <div className="download-progress">
          <p className="font-semibold opacity-70">
            {downloadStatus.msg?.length ? downloadStatus.msg : "Installing..."}
          </p>

          <Progress
            className={"mt-5"}
            size="sm"
            color="success"
            isIndeterminate={(downloadStatus.msg?.length || 0) <= 0 || false}
            value={Number(Number(downloadStatus.percentage).toFixed(0))}
          />
        </div>
      )}
    </div>
  );
};
