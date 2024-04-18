import GameInfo from "@/interfaces/GameInfoInterface";
import { Button, Chip } from "@nextui-org/react";
import { FiFlag, FiShare } from "react-icons/fi";

interface IContentFooterProps {
  game: GameInfo | undefined;
  setShareModalVisible: any;
}

export const ContentFooter = ({
  game,
  setShareModalVisible,
}: IContentFooterProps) => {
  return (
    <div className="mb-10  mt-10">
      <div className="genres">
        <p className="uppercase font-heading text-xl">Genres</p>
        <p className="text-base opacity-80 mt-2">
          {game?.tags.map((tag) => (
            <Chip color="primary" className="mr-2">
              <p className="font-heading uppercase tracking-wider">
                {tag[0].toUpperCase() + tag.slice(1)}
              </p>
            </Chip>
          ))}
        </p>
      </div>
      <div className="mt-6 flex items-center">
        <Button
          size="lg"
          className="mr-5"
          onPress={setShareModalVisible}
          startContent={<FiShare size="24" />}
        >
          Share
        </Button>
        <Button
          isDisabled
          size="lg"
          className="mr-5"
          startContent={<FiFlag size={24} />}
        >
          Report
        </Button>
      </div>
    </div>
  );
};
