import GameInfo from "@/interfaces/GameInfoInterface";
import {
  Card,
  CardHeader,
  CardFooter,
  Chip,
  Skeleton,
  Spinner,
} from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

interface GameCardProps {
  game?: GameInfo;
  loading: boolean;
}

export const GameCard: React.FC<GameCardProps> = ({ game, loading }) => {
  const navigate = useNavigate();

  return (
    <Card
      isPressable={!loading}
      onPress={() => (!loading ? navigate(`/games/${game?.name}`) : null)}
      isHoverable={!loading}
      className="bg-secondaryBG mb-5 flex justify-center p-2 w-40 h-[250px]"
    >
      <CardHeader className="flex justify-end">
        {!loading ? (
          <Chip
            color="success"
            variant="flat"
            className="flex justify-center items-center"
          >
            Free
          </Chip>
        ) : (
          <Spinner color="white" />
        )}
      </CardHeader>
      <CardFooter className="font-heading mt-auto flex justify-center uppercase text-xl">
        {!loading && game?.name}
      </CardFooter>
    </Card>
  );
};
