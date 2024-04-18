import { AppBar, Sidebar } from "@/components";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import retrieveGameInfo, { getGameInfo } from "@/handlers/api";
import { UserStore } from "@/stores/UserStore";
import { observer } from "mobx-react";
import { GamesStore, GamesStore_Impl } from "@/stores/GamesStore";
import { StoreGames } from "./components/games.store";
import { Button, Chip, Image, ScrollShadow } from "@nextui-org/react";

import "./store.style.css";
import { FaPlusCircle, FaSearch } from "react-icons/fa";
import { SearchStore } from "@/stores/SearchStore";
import { FaPlus } from "react-icons/fa6";
import { HiPlusCircle } from "react-icons/hi";
import { BsPlusCircle, BsPlusCircleDotted } from "react-icons/bs";
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
        <div className="store__content h-screen overflow-scroll">
          <Sidebar active="store" />

          <div className="store__main pr-10">
            <AppBar pageName="Store" dashboard={true} user={UserStore.user!} />
            <StoreHeader />
            <p className="store__main-heading text-3xl flex items-center">
              Popular{" "}
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
          </div>
        </div>
      </div>
    </main>
  );
};

export const Store = observer(StoreComp);
