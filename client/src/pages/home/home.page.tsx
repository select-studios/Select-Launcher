import { AppBar, Sidebar, GameCard } from "@/components";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout, getGameInfo } from "@/handlers/api";
import { motion } from "framer-motion";
import CardLoader from "@/components/loader/card/cardloader.component";
import { UserStore } from "@/stores/UserStore";
import { observer } from "mobx-react";
import { BiCompass } from "react-icons/bi";
import { GamesStore } from "@/stores/GamesStore";

interface HomeProps {}

export const logoutClient = (
  refreshToken: string,
  setLoading: any,
  navigate: any
) => {
  logout(refreshToken, navigate);
};

const HomeComp: React.FC<HomeProps> = () => {
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
    <div>
      <motion.div exit={{ opacity: 0 }}>
        <div className="home">
          <AppBar dashboard={true} user={UserStore.user!} />
          <div className="flex">
            <Sidebar active="home" />

            <div className="mt-5 ">
              <p className="text-3xl flex items-center mt-7 ml-20 mb-5 font-bold font-montserrat">
                <BiCompass size="30" className="mr-1" />
                Discover
              </p>

              <div className="game-grid">
                {games ? (
                  games.map((gameInfo, i) => {
                    return <GameCard key={i} game={gameInfo} />;
                  })
                ) : (
                  <div className="mt-5 flex w-full min-w-fit">
                    {Array.from(Array(gamesN).keys()).map((i) => {
                      return <CardLoader key={i} />;
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export const Home = observer(HomeComp);
