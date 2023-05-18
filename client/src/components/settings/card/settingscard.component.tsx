import { Card, Grid, Text } from "@nextui-org/react";
import { useNavigate } from "react-router";

export interface SettingsCardI {
  label: string;
  id: string;
  icon: JSX.Element;
  tags: string[];
}

interface SettingsCardProps {
  setting: SettingsCardI;
  settingN: number;
}

const SettingsCard: React.FC<SettingsCardProps> = ({ setting, settingN }) => {
  const navigate = useNavigate();

  return (
    <Card
      css={{ p: "$6", mw: "400px" }}
      className="bg-secondary my-2 mr-5"
      isHoverable
      isPressable
      key={`settingscard-${settingN}`}
      variant="flat"
      onClick={() => navigate("/settings/" + setting.id)}
    >
      <Card.Header>
        <div className="text-primary-base">{setting.icon}</div>
        <Grid.Container className="pl-2.5">
          <Grid xs={12}>
            <p className="font-montserrat text-3xl font-semibold">
              {setting.label}
            </p>
          </Grid>
        </Grid.Container>
      </Card.Header>
      <Card.Body css={{ py: "$2" }}>
        <Text>
          <p className="font-inter text-lg opacity-80">
            {setting.tags
              .map((tag) => tag[0].toUpperCase() + tag.slice(1).toLowerCase())
              .join(", ")}
            , etc.
          </p>
        </Text>
      </Card.Body>
    </Card>
  );
};

export default SettingsCard;
