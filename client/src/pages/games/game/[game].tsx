import { AppBar, Sidebar } from "@/components";
import { GamesStore } from "@/stores/GamesStore";
import { UserStore } from "@/stores/UserStore";
import { Button } from "@nextui-org/react";
import { FunctionComponent } from "react";
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
      {user && <AppBar dashboard user={user} />}
      <div className="main flex">
        <Sidebar active="home" />
        <div className="content mt-10 w-auto ml-10">
          <p className="font-heading font-bold text-2xl mb-10">Overview</p>
          <div
            className="bg-secondaryBG mt-2 min-w-full rounded-lg"
            style={{ height: "250px" }}
          ></div>
          <p className="font-heading mt-5 font-bold text-3xl">{game?.name}</p>
          <p className="font-inter mt-2 font-medium text-lg max-w-2xl opacity-80">
            {game?.description}
          </p>

          <div className="genres mt-5">
            <p className="uppercase font-bold font-heading text-md">Genres</p>
            <p className="text-lg opacity-80">
              {game?.tags
                .map((tag) => tag[0].toUpperCase() + tag.slice(1))
                .join(", ")}
            </p>
          </div>
        </div>
        <div className="game-details ml-auto mr-5 h-fit bg-secondaryBG p-4 mt-20">
          <div className="bg-tertiaryBG rounded-lg w-48 h-36"></div>
          <p className="text-md font-bold mt-2 font-heading opacity-80 uppercase">
            {game?.price === "free" ? "Free" : "$" + game?.price}
          </p>
          <div className="buttons grid max-w-fit mt-5">
            <Button disabled size="md" className="bg-tertiaryBG">
              Get
            </Button>
            <Button disabled className="mt-2" size="md" color="success">
              Install
            </Button>
            <p className="text-md font-bold mt-2 font-heading opacity-80 uppercase">
              ^ Coming soon!
            </p>
          </div>
          <div className="game-info mt-5">
            <div className="mb-2">
              <p className="font-heading font-bold uppercase">Developer</p>
              <p className="font-medium">{game?.developer}</p>
            </div>
            <div className="mb-2">
              <p className="font-heading font-bold uppercase">Publisher</p>
              <p className="font-medium">{game?.developer}</p>
            </div>
            <div className="mb-2">
              <p className="font-heading font-bold uppercase">Platforms</p>
              <p className="font-medium">
                {game?.platforms?.map((platform) => (
                  <span>
                    {platform[0].toUpperCase() +
                      platform.slice(1).toLowerCase()}
                  </span>
                ))}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Game;
