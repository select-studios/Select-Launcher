import { LibraryGameCard } from "@/components";
import GameInfo from "@/interfaces/GameInfoInterface";
import { SearchStore } from "@/stores/SearchStore";
import { Spinner } from "@nextui-org/react";
import { observer } from "mobx-react";
import { FC } from "react";

interface IProps {
  games: GameInfo[] | null;
  purchasedGames: String[] | null;
}

/**
 * @author
 * @function @LibraryGames
 **/

const LibraryGamesComp: FC<IProps> = ({ games, purchasedGames }) => {
  const { search } = SearchStore;

  return games ? (
    <div className="flex flex-col">
      {(search.type == "library" && search.query.length
        ? games.filter((game) =>
            game.name.toLowerCase().includes(search.query.toLowerCase())
          )
        : games
      )
        .filter((game) => purchasedGames?.includes(game.name))
        .map((game: GameInfo) => (
          <LibraryGameCard game={game} />
        ))}
    </div>
  ) : (
    <Spinner size="lg" className="m-5" />
  );
};

export const LibraryGames = observer(LibraryGamesComp);
