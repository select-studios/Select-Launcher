import { GameCard } from "@/components";
import GameInfo from "@/interfaces/GameInfoInterface";
import { Spinner } from "@nextui-org/react";
import React, { FC } from "react";

interface IProps {
  games: GameInfo[] | null;
}

/**
 * @author
 * @function @StoreGames
 **/

export const StoreGames: FC<IProps> = ({ games }) => {
  return games ? (
    <div className="grid grid-cols-6">
      {games.map((gameInfo, i) => {
        return <GameCard key={i} game={gameInfo} />;
      })}
    </div>
  ) : (
    <Spinner size="lg" className="m-5" />
  );
};
