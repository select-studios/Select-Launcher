import { AppBar, Loader, Sidebar, GameCard } from "@/components";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout, getGameInfo } from "@/handlers/api";
import { useCookies } from "react-cookie";
import protectRoute from "@/handlers/api/protectRoute";
import { LoadingState } from "@/components/loader/loader.component";
import GameInfo from "@/interfaces/GameInfoInterface";
import { motion } from "framer-motion";

export const Home: React.FC = () => {
  const [user, setUser] = useState<any>();
  const [cookies, setCookie, removeCookie] = useCookies([
    "accessToken",
    "refreshToken",
  ]);
  const [loading, setLoading] = useState<LoadingState>({
    state: true,
    msg: "",
  });
  const [gamesInfo, setGamesInfo] = useState<GameInfo[] | undefined>();
  const navigate = useNavigate();

  const logoutClient = () => {
    logout(cookies.refreshToken, setLoading, removeCookie, navigate);
  };

  useEffect(() => {
    protectRoute(cookies, setCookie, setUser, setLoading, navigate);

    async function retrieveGameInfo() {
      const fetchedGameInfo = await getGameInfo();

      if (fetchedGameInfo) {
        setGamesInfo(fetchedGameInfo);
      }
    }

    retrieveGameInfo();
  }, []);

  return !loading ? (
    <div>
      <AppBar dashboard={true} user={user} logoutFn={logoutClient} />
      <motion.div exit={{ opacity: 0 }}>
        <div className="home mt-10 inline-block w-full">
          <div className="">
            <Sidebar />
            <div
              style={{
                marginLeft: "15rem",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gridGap: "30px",
                alignItems: "start",
              }}
            >
              {gamesInfo?.map((gameInfo) => {
                return <GameCard game={gameInfo} />;
              })}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  ) : (
    <Loader msg={loading.msg} />
  );
};
