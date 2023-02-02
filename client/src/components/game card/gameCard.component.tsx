import GameInfo from "@/interfaces/GameInfoInterface";
import {
  Card,
  Text,
  Grid,
  Badge,
  Button,
  Row,
  Spacer,
} from "@nextui-org/react";

interface GameCardProps {
  game: GameInfo;
}

export const GameCard: React.FC<GameCardProps> = ({ game }) => {
  return (
    <Card
      isPressable
      isHoverable
      css={{ maxWidth: "400px" }}
      className="bg-secondary"
    >
      <Card.Header>
        <img src={game.image.icon} alt="game icon" height={34} width={34} />
        <Grid.Container css={{ pl: "$6" }}>
          <Grid xs={12}>
            <Text h4 css={{ lineHeight: "$xs" }}>
              {game.name}
            </Text>
          </Grid>
          <Row>
            {game.tags.map((tag) => {
              if (tag === "verified") {
                return (
                  <>
                    <Badge disableOutline enableShadow color="success">
                      {tag}
                    </Badge>
                    <Spacer x={0.2} />
                  </>
                );
              } else {
                return (
                  <>
                    <Badge disableOutline enableShadow>
                      {tag}
                    </Badge>
                    <Spacer x={0.2} />
                  </>
                );
              }
            })}
          </Row>
        </Grid.Container>
      </Card.Header>
      <Card.Body css={{ py: "$2" }}>
        <Text
          css={{
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
          }}
        >
          {game.description}
        </Text>
      </Card.Body>
      <Card.Footer>
        <Row justify="flex-start">
          <Button size="sm" color="primary">
            download
          </Button>
          <Spacer x={0.5} />
          <Button size="sm" bordered>
            Learn more
          </Button>
        </Row>
      </Card.Footer>
    </Card>
  );
};
