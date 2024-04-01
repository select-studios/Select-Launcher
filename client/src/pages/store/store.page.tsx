import { AppBar, Sidebar } from "@/components";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getGameInfo } from "@/handlers/api";
import { UserStore } from "@/stores/UserStore";
import { observer } from "mobx-react";
import { GamesStore } from "@/stores/GamesStore";
import { StoreGames } from "./components/games.store";
import { ScrollShadow } from "@nextui-org/react";

import "./store.style.css";

interface HomeProps {}

const StoreComp: React.FC<HomeProps> = () => {
  const { games } = GamesStore;
  const [gamesN, setGamesN] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    const storedGamesN = localStorage.getItem("gamesN");
    if (storedGamesN) {
      setGamesN(parseInt(storedGamesN));
    }

    async function retrieveGameInfo() {
      const fetchedGameInfo = await getGameInfo();

      if (fetchedGameInfo) {
        GamesStore.setGames(fetchedGameInfo);
        localStorage.setItem("gamesN", fetchedGameInfo.length.toString());
      }
    }

    retrieveGameInfo();
  }, []);

  return (
    <main>
      <div className="store">
        <div className="store__content">
          <Sidebar active="store" />

          <ScrollShadow isEnabled className="store__main">
            {" "}
            {/* TODO figure out why scroll no work */}
            <AppBar pageName="Store" dashboard={true} user={UserStore.user!} />
            <div className="store__main-banner"></div>
            <p className="store__main-heading">Popular Now</p>
            <StoreGames games={games} />
          </ScrollShadow>
        </div>
      </div>
    </main>
  );
};

export const Store = observer(StoreComp);
