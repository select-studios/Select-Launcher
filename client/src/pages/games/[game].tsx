import { AppBar, Sidebar } from "@/components";
import { GamesStore } from "@/stores/GamesStore";
import { UserStore } from "@/stores/UserStore";
import { FunctionComponent, useEffect } from "react";
import { useParams } from "react-router";
import { InfoBar, ContentHeader, ContentFooter } from "./components";
import { observer } from "mobx-react";
import { InfoBarObservable } from "./components/info_bar";
import retrieveGameInfo from "@/handlers/api";

interface GamesInfoProps {}

const Game: FunctionComponent<GamesInfoProps> = () => {
  const params = useParams();
  const gameName = params.game;

  const { games } = GamesStore;
  const game = games?.find((game) => game.name === gameName);

  const { user } = UserStore;

  useEffect(() => {
    retrieveGameInfo(GamesStore);
  }, []);

  return (
    <section className="game-page">
      <div className="main flex">
        <Sidebar active="home" />
        <div className="content mt-5 mr-5 w-full">
          {user && (
            <AppBar
              searchBarVisible={false}
              dashboard
              user={user}
              pageName="Game"
            />
          )}

          <div className="p-2">
            <ContentHeader game={game} />
            <ContentFooter game={game} />
          </div>
        </div>
        <InfoBarObservable game={game} />
      </div>
    </section>
  );
};

export const GameObserver = observer(Game);
