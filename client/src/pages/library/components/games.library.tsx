import { LibraryGameCard } from "@/components";
import GameInfo from "@/interfaces/GameInfoInterface";
import { SearchStore } from "@/stores/SearchStore";
import { Button, Image, Spinner, divider } from "@nextui-org/react";
import { observer } from "mobx-react";
import { FC } from "react";
import gameErrorImg from "../../../../../Resources/ICON_GameError.png";
import { Link } from "react-router-dom";

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
      {purchasedGames?.length ? (
        (search.type == "library" && search.query.length
          ? games.filter((game) =>
              game.name.toLowerCase().includes(search.query.toLowerCase())
            )
          : games
        )
          .filter((game) => purchasedGames?.includes(game.name))
          .map((game: GameInfo) => <LibraryGameCard game={game} />)
      ) : (
        <div className="flex items-center">
          <Image className="w-32 h-32" src={gameErrorImg} />
          <div className="ml-5">
            <p className="font-heading text-3xl">
              Hmm. Looks like you don't have any games yet.
            </p>
            <div className="mt-10">
              <Link to="/store">
                <Button color="primary" size="lg">
                  Visit Store Page
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  ) : (
    <Spinner size="lg" className="m-5" />
  );
};

export const LibraryGames = observer(LibraryGamesComp);
