import { AppBar, Sidebar } from "@/components";
import { GamesStore } from "@/stores/GamesStore";
import { UserStore } from "@/stores/UserStore";
import { FunctionComponent, useEffect, useState } from "react";
import { useParams } from "react-router";
import { ContentHeader, ContentFooter } from "./components";
import { observer } from "mobx-react";
import { InfoBarObservable } from "./components/info_bar";
import retrieveGameInfo from "@/handlers/api";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import { FiClipboard } from "react-icons/fi";

interface GamesInfoProps {}

const Game: FunctionComponent<GamesInfoProps> = () => {
  const params = useParams();
  const gameName = params.game;

  const { games } = GamesStore;
  const game = games?.find((game) => game.name === gameName);

  const [copiedText, setCopiedText] = useState(false);

  const gameLink = `select-launcher://game.${game?.name}`;

  const { user } = UserStore;

  useEffect(() => {
    retrieveGameInfo(GamesStore);
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(gameLink);
    setCopiedText(true);

    setTimeout(() => {
      setCopiedText(false);
    }, 2000);
  };

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <section className="game-page">
      <div className="main flex h-screen overflow-scroll">
        <Sidebar active="home" />
        <div className="content mr-10 mt-5 w-full">
          {user && (
            <AppBar
              searchBarVisible={false}
              dashboard
              user={user}
              pageName="Game"
            />
          )}

          <div className="py-2">
            <ContentHeader game={game} />
            <ContentFooter setShareModalVisible={onOpen} game={game} />
          </div>
        </div>
        <InfoBarObservable game={game} />
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <p className="font-heading font-light text-3xl">
                  Share {game?.name} 🎉
                </p>
              </ModalHeader>
              <ModalBody>
                <Input
                  size="lg"
                  value={gameLink}
                  isReadOnly
                  endContent={
                    <Tooltip
                      content={!copiedText ? `Copy the link` : "Copied!"}
                      color={copiedText ? "success" : "default"}
                      showArrow
                      isOpen={true}
                    >
                      <Button
                        onPress={() => copyToClipboard()}
                        variant="light"
                        color="success"
                        isIconOnly
                      >
                        <FiClipboard size={20} />
                      </Button>
                    </Tooltip>
                  }
                />

                <p>
                  Spread the word! Share the game with your friends today. We
                  know you loved it, and we are sure they will too.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </section>
  );
};

export const GameObserver = observer(Game);
