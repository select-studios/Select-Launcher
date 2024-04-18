import GameInfo from "@/interfaces/GameInfoInterface";
import { Button, Chip, Image, Tooltip } from "@nextui-org/react";
import { BiArrowBack } from "react-icons/bi";
import { FiArrowLeft } from "react-icons/fi";
import { Link } from "react-router-dom";

interface IContentHeaderProps {
  game: GameInfo | undefined;
}

export const ContentHeader = ({ game }: IContentHeaderProps) => {
  return (
    <div content="mr-5 w-full">
      <div className="heading flex items mb-10">
        <Tooltip placement="bottom" showArrow content="Back">
          <Link to="/store">
            <Button
              // className="mr-5"
              startContent={<FiArrowLeft size={24} />}
              isIconOnly
              content="Store"
            ></Button>
          </Link>
        </Tooltip>
        <p className="font-heading ml-5 text-3xl">{game?.name}</p>
      </div>

      <Image
        className="bg-content1 object-cover h-[500px] mt-2 min-w-full w-screen rounded-lg"
        src={game?.image.banner}
      />
      <p className="font-inter min-h-10 max-h-20 overflow-y-auto mt-[30px] font-medium text-xl opacity-70">
        {game?.description}
      </p>
    </div>
  );
};
