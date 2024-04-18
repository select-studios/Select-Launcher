import { Button, Chip, Image, Tooltip } from "@nextui-org/react";
import { FiShoppingBag } from "react-icons/fi";
import GameInfo from "@/interfaces/GameInfoInterface";
import {
  BiCheckCircle,
  BiLogoApple,
  BiLogoWindows,
  BiPlusCircle,
  BiWindows,
} from "react-icons/bi";
import { API_URI } from "@/handlers/api";
import { useState } from "react";
import { User, UserStore } from "@/stores/UserStore";
import { Link } from "react-router-dom";
import { BsRobot } from "react-icons/bs";
import { observer } from "mobx-react";

interface IInfoBarProps {
  game: GameInfo | undefined;
}

export const InfoBar = ({ game }: IInfoBarProps) => {
  const { user } = UserStore;
  const [loading, setLoading] = useState(false);

  const platformNames = [
    {
      id: "windows",
      name: "Windows",
      icon: <BiLogoWindows size="20" />,
    },
    {
      id: "linux",

      name: "Linux",
      icon: <BsRobot size={20} />,
    },
    {
      id: "macos",
      name: "MacOS",
      icon: <BiLogoApple size="20" />,
    },
  ];

  const addGame = async () => {
    setLoading(true);
    const res = await fetch(`${API_URI}/accounts/account/edit/addgame`, {
      method: "PUT",

      headers: {
        Authorization: `Bearer ${user?.tokens.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ newGame: game?.name }),
    });

    if (res.ok) {
      res.json().then((data: any) => {
        UserStore.setPurchasedGames(data.newUser.purchasedGames);
        setLoading(false);
      });
    }
  };

  return (
    <div className="max-h-screen p-5 sticky top-0 right-0 bg-content1 w-96">
      <div>
        <Image
          src={game?.image.icon}
          className="mb-4 w-screen object-cover h-40 rounded-lg"
        />
        <div className="flex items-center mb-4">
          <p className="font-heading opacity-80 text-base">FREE</p>
          <div className="flex items-center ml-2">
            {game?.verified && (
              <Chip
                color="success"
                startContent={<BiCheckCircle size={20} />}
                variant="flat"
              >
                Verified
              </Chip>
            )}

            {user?.purchasedGames.includes(game?.name || "") && (
              <Chip
                startContent={<BiCheckCircle size={20} />}
                variant="flat"
                color="warning"
                className="ml-2"
              >
                Owned
              </Chip>
            )}
          </div>
        </div>
        <div className="buttons">
          {!user?.purchasedGames.includes(game?.name || "") ? (
            <Button
              startContent={!loading && <FiShoppingBag size={20} />}
              size="lg"
              color="success"
              isLoading={loading}
              fullWidth
              isDisabled={!user?.verified}
              onPress={async () => await addGame()}
            >
              Get now
            </Button>
          ) : (
            <div>
              <Link to="/library">
                <Button
                  startContent={<FiShoppingBag size={20} />}
                  size="lg"
                  fullWidth
                >
                  See in Library
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className="absolute mb-12 bottom-0">
        <div>
          <p className="font-heading text-lg uppercase">Developer</p>
          <p className="text-base">{game?.developer}</p>
        </div>
        <div className="mt-6">
          <p className="font-heading text-lg uppercase">Publisher</p>
          <p className="text-base">{game?.publisher}</p>
        </div>
        <div className="mt-6">
          <p className="font-heading text-lg uppercase">Platforms</p>
          <p className="text-base">
            {game?.platforms.map((platform) => {
              const platformName = platformNames.find(
                (name) => name.id.toLowerCase() === platform
              );
              return (
                <div className="flex items-center">
                  {platformName?.icon}
                  <p className="ml-1">{platformName?.name}</p>
                </div>
              );
            })}
          </p>
        </div>
        <div className="mt-6">
          <p className="font-heading text-lg uppercase">Release Date</p>
          <p className="text-base">01.01.2069</p>
        </div>
        <div className="mt-6">
          <p className="font-heading text-lg uppercase">Current Build</p>
          <p className="text-base">6900</p>
        </div>
      </div>
    </div>
  );
};

export const InfoBarObservable = observer(InfoBar);
