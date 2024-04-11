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

          <ScrollShadow isEnabled className="store__main pr-5">
            {" "}
            {/* TODO figure out why scroll no work */}
            <AppBar pageName="Store" dashboard={true} user={UserStore.user!} />
            <div className="relative h-[300px]">
              <Image
                src="https://cdn.discordapp.com/attachments/1030139297577316464/1227698939390591007/image.png?ex=66295abc&is=6616e5bc&hm=3750b650c7dfabb16c2e4b82c5277d85cc37eae44a7898d4d298de43224d683c&"
                className="store__main-banner blur-0 h-[300px] w-screen object-cover"
              />
              <p className="absolute text-2xl w-full bg-black bg-opacity-30 top-0 p-5 z-50 font-heading uppercase">
                Featured Game
              </p>
              <div className="absolute bottom-0 left-0 p-5 z-50">
                <p className="font-heading text-3xl uppercase">Rosehill</p>
                <p className="font-sans font-semibold text-md max-w-3xl">
                  I can't live with the idea I might never see him again; This
                  is a death mission, but I'm willing...
                </p>
              </div>
              <div className="absolute bottom-0 right-0 p-5 z-10 flex">
                <Button className="mr-2">View Store Page</Button>{" "}
                <Button
                  startContent={<BsPlusCircle size={20} />}
                  color="success"
                >
                  Get Now
                </Button>
              </div>
            </div>
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
          </ScrollShadow>
        </div>
      </div>
    </main>
  );
};

export const Store = observer(StoreComp);
