import { AppBar, Loader, Sidebar, GameCard } from "@/components";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout, getGameInfo } from "@/handlers/api";
import { useCookies } from "react-cookie";
import protectRoute from "@/handlers/api/utils/protectRoute";
import { LoadingState } from "@/components/loader/loader.component";
import GameInfo from "@/interfaces/GameInfoInterface";
import { motion } from "framer-motion";
import { getTokensCookie } from "@/utils/storage";

export const Home: React.FC = () => {
  const [user, setUser] = useState<any>();
  const cookies = getTokensCookie();

  const [loading, setLoading] = useState<LoadingState>({
    state: true,
    msg: "",
  });
  const [gamesInfo, setGamesInfo] = useState<GameInfo[] | undefined>();
  const navigate = useNavigate();

  const logoutClient = () => {
    cookies && logout(cookies.refreshToken || "", setLoading, navigate);
  };

  useEffect(() => {
    console.log(cookies);
    protectRoute(cookies, setUser, setLoading, navigate);

    async function retrieveGameInfo() {
      const fetchedGameInfo = await getGameInfo();

      if (fetchedGameInfo) {
        setGamesInfo(fetchedGameInfo);
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

            <div className="mt-10">
              <div className="grid w-full ml-16 grid-cols-3">
                {gamesInfo?.map((gameInfo, i) => {
                  return <GameCard key={i} game={gameInfo} />;
                })}
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
