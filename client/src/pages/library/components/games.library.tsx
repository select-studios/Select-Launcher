import { LibraryGameCard } from "@/components";
import GameInfo from "@/interfaces/GameInfoInterface";
import { Spinner } from "@nextui-org/react";
import { FC } from "react";

interface IProps {
  games: GameInfo[] | null;
  purchasedGames: String[] | null;
}

/**
 * @author
 * @function @LibraryGames
 **/

export const LibraryGames: FC<IProps> = ({ games, purchasedGames }) => {
  console.log(games);

  return games ? (
    <div className="flex flex-col">
      {games
        .filter((game) => purchasedGames?.includes(game.name))
        .map((game: GameInfo) => (
          <LibraryGameCard game={game} />
        ))}
    </div>
  ) : (
    <Spinner size="lg" className="m-5" />
  );
};
