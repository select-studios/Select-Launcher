import { GameCard } from "@/components";
import GameInfo from "@/interfaces/GameInfoInterface";
import { SearchStore } from "@/stores/SearchStore";
import { Image, Spinner } from "@nextui-org/react";
import { observer } from "mobx-react";
import React, { FC } from "react";
import gameErrorImg from "../../../../../Resources/ICON_GameError.png";
import { SidebarStore } from "@/stores/SidebarStore";

interface IProps {
  games: GameInfo[] | null;
}

/**
 * @author
 * @function @StoreGames
 **/

const StoreGamesComp: FC<IProps> = ({ games }) => {
  const { search } = SearchStore;

  const filteredGames = (games || []).filter((game) =>
    game.name.toLowerCase().includes(search.query.toLowerCase())
  );

  return games ? (
    <div className="mb-10">
      {(search.type == "game" && search.query.length ? filteredGames : games)
        .length ? (
        <div className="grid grid-flow-col auto-cols-max">
          {(search.type == "game" && search.query.length
            ? filteredGames
            : games
          ).map((gameInfo, i) => {
            return (
              <GameCard index={i} loading={false} key={i} game={gameInfo} />
            );
          })}
        </div>
      ) : (
        <div className="flex items-center">
          <Image className="w-32 h-32" src={gameErrorImg} />
          <div className="ml-5">
            <p className="font-heading text-3xl">
              Hmm. Looks like we don't have that game.
            </p>
            <div className="opacity-70 font-semibold text-lg font-sans mt-2">
              Try searching for a different term.
            </div>
          </div>
        </div>
      )}
    </div>
  ) : (
    <GameCard index={0} loading={true} />
  );
};

export const StoreGames = observer(StoreGamesComp);
