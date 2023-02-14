import { AppBar, Loader, Sidebar, GameCard } from "@/components";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout, getGameInfo } from "@/handlers/api";
import protectRoute from "@/handlers/api/utils/protectRoute";
import { LoadingState } from "@/components/loader/loader.component";
import GameInfo from "@/interfaces/GameInfoInterface";
import { motion } from "framer-motion";
import { getTokensCookie } from "@/utils/storage";
import CardLoader from "@/components/loader/card/cardloader.component";

export const Home: React.FC = () => {
  const [user, setUser] = useState<any>();
  const cookies = getTokensCookie();

  const [loading, setLoading] = useState<LoadingState>({
    state: true,
    msg: "",
  });
  const [gamesInfo, setGamesInfo] = useState<GameInfo[] | undefined>();
  const [gamesN, setGamesN] = useState<number>(0);
  const navigate = useNavigate();

  const logoutClient = () => {
    cookies && logout(cookies.refreshToken || "", setLoading, navigate);
  };

  useEffect(() => {
    protectRoute(cookies, setUser, setLoading, navigate);

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

  return !loading.state ? (
    <div>
      <motion.div exit={{ opacity: 0 }}>
        <div className="home">
          <AppBar
            dashboard={true}
            user={user}
            logoutFn={logoutClient}
            loggingOut={loading.state}
          />
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
  ) : (
    <Loader msg={loading.msg} />
  );
};
