import { AppBar, Sidebar } from "@/components";
import { GamesStore } from "@/stores/GamesStore";
import { UserStore } from "@/stores/UserStore";
import { Button, Chip } from "@nextui-org/react";
import { FunctionComponent } from "react";
import { FiFlag, FiShare } from "react-icons/fi";
import { useParams } from "react-router";

interface GamesInfoProps {}

const Game: FunctionComponent<GamesInfoProps> = () => {
  const params = useParams();
  const gameName = params.game;

  const { games } = GamesStore;
  const game = games?.find((game) => game.name === gameName);

  const { user } = UserStore;

  return (
    <section className="game-page">
      <div className="main flex mr-5">
        <Sidebar active="home" />
        <div className="content mt-5 w-full">
          {user && <AppBar dashboard user={user} pageName="Game" />}

          <div className="p-2">
            <div className="heading flex items-center mb-10">
              <p className="font-heading text-3xl">{game?.name}</p>
              <div className="genres flex items-center ml-5">
                {game?.tags.map((tag) => (
                  <Chip color="primary" className="mr-2">
                    {tag[0].toUpperCase() + tag.slice(1)}
                  </Chip>
                ))}
              </div>
            </div>

            <div
              className="bg-secondaryBG mt-2 min-w-full rounded-lg"
              style={{ height: "250px" }}
            ></div>
            <p className="font-inter mt-[30px] font-medium text-xl opacity-70">
              {game?.description}
            </p>

            <div className="genres mt-20">
              <p className="uppercase font-heading text-xl">Genres</p>
              <p className="text-base opacity-80">
                {game?.tags
                  .map((tag) => tag[0].toUpperCase() + tag.slice(1))
                  .join(", ")}
              </p>
            </div>
            <div className="mt-5 flex items-center">
              <Button
                size="lg"
                className="mr-5"
                startContent={<FiShare size="24" />}
              >
                Share
              </Button>
              <Button
                size="lg"
                className="mr-5"
                startContent={<FiFlag size={24} />}
              >
                Report
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Game;
