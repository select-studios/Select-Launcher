import { AppBar, Loader, Sidebar, GameCard } from "@/components";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout, getGameInfo } from "@/handlers/api";
import protectRoute from "@/handlers/api/utils/protectRoute";
import { LoadingState } from "@/components/loader/loader.component";
import GameInfo from "@/interfaces/GameInfoInterface";
import { motion } from "framer-motion";
import { getTokensCookie } from "@/utils/storage";
import CardLoader from "@/components/loader/card/cardloader.component";
import { UserStore } from "@/stores/UserStore";
import { observer } from "mobx-react";

interface HomeProps {}

export const logoutClient = (
  refreshToken: string,
  setLoading: any,
  navigate: any
) => {
  logout(UserStore, refreshToken || "", setLoading, navigate);
};

const HomeComp: React.FC<HomeProps> = () => {
  const [gamesInfo, setGamesInfo] = useState<GameInfo[] | undefined>();
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
        setGamesInfo(fetchedGameInfo);
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

            <div className="mt-5">
              <div className="game-grid">
                {gamesInfo ? (
                  gamesInfo.map((gameInfo, i) => {
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
