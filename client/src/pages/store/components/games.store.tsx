import { GameCard } from "@/components";
import GameInfo from "@/interfaces/GameInfoInterface";
import { SearchStore } from "@/stores/SearchStore";
import { Spinner } from "@nextui-org/react";
import { observer } from "mobx-react";
import React, { FC } from "react";

interface IProps {
  games: GameInfo[] | null;
}

/**
 * @author
 * @function @StoreGames
 **/

const StoreGamesComp: FC<IProps> = ({ games }) => {
  const { search } = SearchStore;

  return games ? (
    <div className="grid grid-cols-6">
      {(search.type == "game" && search.query.length
        ? games.filter((game) =>
            game.name.toLowerCase().includes(search.query.toLowerCase())
          )
        : games
      ).map((gameInfo, i) => {
        return <GameCard loading={false} key={i} game={gameInfo} />;
      })}
    </div>
  ) : (
    <GameCard loading={true} />
  );
};

export const StoreGames = observer(StoreGamesComp);
