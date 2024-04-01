import GameInfo from "@/interfaces/GameInfoInterface";
import {
  Card,
  CardHeader,
  CardFooter,
  Chip,
} from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

interface GameCardProps {
  game: GameInfo;
}

export const GameCard: React.FC<GameCardProps> = ({ game }) => {
  const navigate = useNavigate();

  return (
    <Card
      isPressable
      onPress={() => navigate(`/games/${game.name}`)}
      isHoverable
      className="bg-secondaryBG mb-5 flex justify-center p-2 w-40 h-[250px]"
    >
      <CardHeader className="flex justify-end">
        <Chip color="success" variant="flat">
          Free
        </Chip>
      </CardHeader>
      <CardFooter className="font-heading mt-auto flex justify-center uppercase text-xl">
        {game.name}
      </CardFooter>
    </Card>
  );
};
