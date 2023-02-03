import GameInfo from "@/interfaces/GameInfoInterface";
import {
  Card,
  Text,
  Grid,
  Badge,
  Button,
  Row,
  Spacer,
  Image,
  Avatar,
  Tooltip,
} from "@nextui-org/react";
import { HiCheckBadge } from "react-icons/hi2";

interface GameCardProps {
  game: GameInfo;
}

export const GameCard: React.FC<GameCardProps> = ({ game }) => {
  return (
    <Card
      isPressable
      isHoverable
      css={{ maxWidth: "400px" }}
      className="bg-secondary m-5 py-2 px-3 h-48"
    >
      <Card.Header>
        <Avatar src={game.image.icon} alt={game.name + " Icon"} size="lg" />
        <Grid.Container css={{ pl: "$6" }}>
          <Grid xs={12}>
            <Text
              className="text-2xl font-montserrat font-bold flex items-center"
              css={{ lineHeight: "$xs" }}
            >
              {game.name}
              {game.verified && (
                <Tooltip content="Verified">
                  <Badge
                    size="sm"
                    color="success"
                    className="ml-1"
                    disableOutline
                    variant="flat"
                  >
                    <HiCheckBadge size="20" />
                  </Badge>
                </Tooltip>
              )}
            </Text>
          </Grid>
          <Row className="mt-1">
            {game.tags.map((tag, i) => (
              <Badge
                key={i}
                color="default"
                className="border-none mr-1"
                disableOutline
                size={"sm"}
              >
                {tag}
              </Badge>
            ))}
          </Row>
        </Grid.Container>
      </Card.Header>
      <Card.Body css={{ py: "$2" }}>
        <Text
          className="font-medium font-inter"
          css={{
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
          }}
        >
          {game.description}
        </Text>
      </Card.Body>
      <Card.Divider />
      <Card.Footer>
        <Row justify="flex-end">
          <Button size="sm" color="primary" auto className="mr-2">
            download
          </Button>
          <Button size="sm" className="bg-tertiary">
            Learn more
          </Button>
        </Row>
      </Card.Footer>
    </Card>
  );
};
