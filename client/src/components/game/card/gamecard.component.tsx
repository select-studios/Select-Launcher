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
      className="bg-content1 mb-5 flex justify-center p-2 h-[400px] w-[270px] mr-5"
    >
      <CardHeader className="flex justify-end">
        {!loading ? (
          <Chip
            color="success"
            variant="flat"
            size="sm"
            className="flex uppercase justify-center items-center"
          >
            <p className="font-bold">Free</p>
          </Chip>
        ) : (
          <Spinner color="white" />
        )}
      </CardHeader>
      <CardFooter className="font-heading mt-auto grid justify-center uppercase text-3xl">
        {!loading && game?.name}
        <div className="mt-2 flex justify-center mx-auto w-full">
          {!loading &&
            game?.tags.map((tag) => (
              <Chip
                size="sm"
                color="primary"
                variant="flat"
                className="mx-1 font-sans"
              >
                <p className="font-extrabold">{tag}</p>
              </Chip>
            ))}
        </div>
      </CardFooter>
    </Card>
  );
};
