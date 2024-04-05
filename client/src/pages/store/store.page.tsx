import { AppBar, Sidebar } from "@/components";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import retrieveGameInfo, { getGameInfo } from "@/handlers/api";
import { UserStore } from "@/stores/UserStore";
import { observer } from "mobx-react";
import { GamesStore, GamesStore_Impl } from "@/stores/GamesStore";
import { StoreGames } from "./components/games.store";
import { Chip, Image, ScrollShadow } from "@nextui-org/react";

import "./store.style.css";
import { FaSearch } from "react-icons/fa";
import { SearchStore } from "@/stores/SearchStore";

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

          <ScrollShadow isEnabled className="store__main">
            {" "}
            {/* TODO figure out why scroll no work */}
            <AppBar pageName="Store" dashboard={true} user={UserStore.user!} />
            <div className="store__main-banner"></div>
            <p className="store__main-heading flex">
              Popular Now{" "}
              {SearchStore.search.query.length &&
              SearchStore.search.type == "game" ? (
                <Chip
                  className="font-sans font-normal ml-5"
                  startContent={<FaSearch />}
                >
                  {SearchStore.search.query}
                </Chip>
              ) : (
                ""
              )}
            </p>
            <StoreGames games={games} />
          </ScrollShadow>
        </div>
      </div>
    </main>
  );
};

export const Store = observer(StoreComp);
