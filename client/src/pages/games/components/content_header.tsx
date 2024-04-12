import GameInfo from "@/interfaces/GameInfoInterface";
import { Chip, Image } from "@nextui-org/react";

interface IContentHeaderProps {
  game: GameInfo | undefined;
}

export const ContentHeader = ({ game }: IContentHeaderProps) => {
  return (
    <div>
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

      <Image
        className="bg-content1 h-[500px] mt-2 min-w-full w-screen rounded-lg"
        src={game?.image.banner}
      />
      <p className="font-inter min-h-10 max-h-20 overflow-y-auto mt-[30px] font-medium text-xl opacity-70">
        {game?.description}
      </p>
    </div>
  );
};
