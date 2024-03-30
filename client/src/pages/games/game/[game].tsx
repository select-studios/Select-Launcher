import { AppBar, Sidebar } from "@/components";
import { GamesStore } from "@/stores/GamesStore";
import { UserStore } from "@/stores/UserStore";
import { Button, Chip } from "@nextui-org/react";
import { FunctionComponent } from "react";
import { BiCheckCircle, BiPlusCircle } from "react-icons/bi";
import { FiFlag, FiShare, FiShoppingBag } from "react-icons/fi";
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
      <div className="main flex">
        <Sidebar active="home" />
        <div className="content mt-5 mr-5 w-full">
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
        <div className="h-screen p-5 sticky top-0 right-0 rounded-tl-lg bg-secondaryBG w-96">
          <div className="bg-tertiaryBG mb-4 min-h-40 rounded-lg p-5"></div>
          <div className="flex items-center mb-8">
            <p className="font-heading opacity-80 text-base">FREE</p>
            <div className="ml-2">
              <Chip
                startContent={<BiCheckCircle size={20} />}
                variant="flat"
                color="success"
              >
                Verified
              </Chip>
            </div>
          </div>
          <div className="buttons">
            <Button
              startContent={<FiShoppingBag size={20} />}
              size="lg"
              color="success"
              fullWidth
            >
              Get now
            </Button>
            <Button
              startContent={<BiPlusCircle size={20} />}
              size="lg"
              className="mt-4"
              fullWidth
            >
              Add to library
            </Button>
          </div>
          <div className="mt-20">
            <div>
              <p className="font-heading text-base uppercase">Developer</p>
              <p className="text-base">Select Studios™️</p>
            </div>
            <div className="mt-6">
              <p className="font-heading text-base uppercase">Platforms</p>
              <p className="text-base">{game?.platforms.join(", ")}</p>
            </div>
            <div className="mt-6">
              <p className="font-heading text-base uppercase">Release Date</p>
              <p className="text-base">01.01.2069</p>
            </div>
            <div className="mt-6">
              <p className="font-heading text-base uppercase">Current Build</p>
              <p className="text-base">1000</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Game;
