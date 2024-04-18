import { AppBar, Sidebar } from "@/components";
import React, { useEffect } from "react";
import retrieveGameInfo from "@/handlers/api";
import { UserStore } from "@/stores/UserStore";
import { observer } from "mobx-react";
import { GamesStore } from "@/stores/GamesStore";
import { StoreGames } from "./components/games.store";

import "./store.style.css";
import { StoreHeader } from "./components/header.store";

interface HomeProps {}

const StoreComp: React.FC<HomeProps> = () => {
  const { games } = GamesStore;

  useEffect(() => {
    retrieveGameInfo(GamesStore);
  }, []);

  return (
    <main>
      <div className="store">
        <div className="store__content">
          <Sidebar active="store" />

          <div className="store__content-main pr-10">
            <AppBar pageName="Store" dashboard={true} user={UserStore.user!} />
            <StoreHeader />
            <StoreGames games={games} />
          </div>
        </div>
      </div>
    </main>
  );
};

export const Store = observer(StoreComp);
