import GameInfo from "@/interfaces/GameInfoInterface";
import { UserStore } from "@/stores/UserStore";
import {
  Card,
  CardHeader,
  CardFooter,
  Chip,
  CardBody,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { observer } from "mobx-react";
import { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaRegCirclePlay, FaTrashCan } from "react-icons/fa6";
import { GrInstallOption } from "react-icons/gr";

interface LibraryGameCard {
  game: GameInfo;
}

const installedDropdownItems = [
  {
    key: "visit-store-page",
    label: "Visit store page",
    onClick: () => {},
  },
  {
    key: "open-location",
    label: "Locate game files",
    onClick: () => {},
  },
  {
    key: "check-updates",
    label: "Check for updates",
    onClick: () => {},
  },
];

const notInstalledDropdownItems = [
  {
    key: "visit-store-page",
    label: "Visit store page",
    onClick: () => {},
  },
  {
    key: "remove-owned",
    label: "Remove from owned",
    onClick: () => {},
  },
];

const LibraryGameCardComp: React.FC<LibraryGameCard> = ({ game }) => {
  const installedGames = window.gamesAPI.getInstalledGames();

  const [installedGamesState, setInstalledGamesState] =
    useState(installedGames);
  const isInstalled = installedGamesState.includes(game.name);

  return (
    <Card className="bg-secondaryBG mb-5 p-2 w-full h-[250px]">
      <CardBody className="flex flex-row">
        <div className="bg-tertiaryBG rounded-lg flex-start w-56 h-full"></div>
        <div className="ml-4 flex flex-col">
          <div>
            <h1 className="text-white text-3xl uppercase font-heading">
              {game.name}
            </h1>
            <div className="flex flex-row gap-2">
              {game.tags.map((tag) => (
                <Chip
                  color="default"
                  variant="solid"
                  className="mt-1 bg-tertiaryBG"
                >
                  {tag}
                </Chip>
              ))}
            </div>
          </div>
          <p className="overflow-ellipsis mt-4 font-semibold opacity-70">
            {game.description}
          </p>
          <div className="Buttons mt-auto mb-2">
            {isInstalled ? (
              <div className="flex flex-row">
                <Button
                  color="primary"
                  variant="shadow"
                  className="mr-2"
                  size="lg"
                  startContent={<FaRegCirclePlay size={20} />}
                >
                  Launch
                </Button>
                <Dropdown size="lg">
                  <DropdownTrigger>
                    <Button isIconOnly size="lg">
                      <BsThreeDotsVertical />
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu>
                    {installedDropdownItems.map((item) => (
                      <DropdownItem key={item.key}>{item.label}</DropdownItem>
                    ))}
                  </DropdownMenu>
                </Dropdown>
                <Button
                  startContent={<FaTrashCan />}
                  color="danger"
                  size="lg"
                  className="ml-auto"
                >
                  Uninstall
                </Button>
              </div>
            ) : (
              <div className="flex flex-row">
                <Button
                  color="success"
                  variant="shadow"
                  className="mr-2"
                  size="lg"
                  startContent={<GrInstallOption size={20} />}
                  onPress={() => {
                    window.gamesAPI.addInstalledGames(game.name);
                    setInstalledGamesState(window.gamesAPI.getInstalledGames());
                  }}
                >
                  Install Now
                </Button>
                <Dropdown size="lg">
                  <DropdownTrigger>
                    <Button isIconOnly size="lg">
                      <BsThreeDotsVertical />
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu>
                    {notInstalledDropdownItems.map((item) => (
                      <DropdownItem key={item.key}>{item.label}</DropdownItem>
                    ))}
                  </DropdownMenu>
                </Dropdown>
              </div>
            )}
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export const LibraryGameCard = observer(LibraryGameCardComp);
