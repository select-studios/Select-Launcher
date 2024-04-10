import GameInfo from "@/interfaces/GameInfoInterface";
import { Button } from "@nextui-org/react";
import { FiFlag, FiShare } from "react-icons/fi";

interface IContentFooterProps {
  game: GameInfo | undefined;
}

export const ContentFooter = ({ game }: IContentFooterProps) => {
  return (
    <div className="absolute bottom-0 mb-5">
      <div className="genres">
        <p className="uppercase font-heading text-xl">Genres</p>
        <p className="text-base opacity-80">
          {game?.tags
            .map((tag) => tag[0].toUpperCase() + tag.slice(1))
            .join(", ")}
        </p>
      </div>
      <div className="mt-5 flex items-center">
        <Button
          isDisabled
          size="lg"
          className="mr-5"
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
