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
import { HiDownload } from "react-icons/hi";
import { ImBoxRemove } from "react-icons/im";
import { HiCheckBadge } from "react-icons/hi2";
import { BsPlayFill } from "react-icons/bs";
import { toast } from "react-toastify";
import { ipcRenderer } from "electron";

interface GameCardProps {
  game: GameInfo;
}

export const GameCard: React.FC<GameCardProps> = ({ game }) => {
  return (
    <Card
      isPressable
      isHoverable
      css={{ maxWidth: "400px", backgroundColor: "#282A2D" }}
      className="bg-secondary m-5 py-2 px-1 h-fit w-fit"
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
                <Tooltip content="Verified" color="success">
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
                className="border-none font-medium mr-1"
                disableOutline
                size={"sm"}
              >
                {tag}
              </Badge>
            ))}
          </Row>
        </Grid.Container>
      </Card.Header>
      <Card.Body css={{ py: "$4" }}>
        <Text
          className="font-medium font-inter max-h-20"
          css={{
            textOverflow: "ellipsis",
            fontFamily: "'Inter', sans-serif;",
          }}
        >
          {game.description}
        </Text>
      </Card.Body>
      <Card.Divider />
      <Card.Footer>
        <Row justify="flex-end">
          {/* <Button
            size="md"
            className="bg-tertiary"
            css={{
              backgroundColor: "#393C40",
            }}
          >
            Learn more
          </Button> */}
          <Button
            color="success"
            auto
            onClick={() => {
              window.gamesAPI.startGame(game.name);
              toast.success(`Starting ${game.name}`);
            }}
          >
            <BsPlayFill size={20} />
          </Button>
          <Button
            icon={<HiDownload size="20" />}
            size="md"
            color="primary"
            auto
            className="ml-2"
            onClick={() => {
              window.gamesAPI.downloadGame(game.downloadName);
              ipcRenderer.on("finish-download", (event, message) => {
                toast.success(message);
              });
            }}
          >
            download
          </Button>
          <Button
            icon={<ImBoxRemove size="20" />}
            size="md"
            color="error"
            auto
            className="ml-2"
            onClick={() => {
              window.gamesAPI.uninstallGame(game.name);
              ipcRenderer.on("finish-uninstall", (event, message) => {
                toast.error(message);
              });
            }}
          >
            uninstall
          </Button>
        </Row>
      </Card.Footer>
    </Card>
  );
};
