import { Card, CardHeader, CardBody } from "@nextui-org/react";
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
      className="bg-content1 my-2 mr-5 p-6"
      isHoverable
      isPressable
      key={`settingscard-${settingN}`}
      onClick={() => navigate("/settings/" + setting.id)}
    >
      <CardHeader>
        <div className="text-primary-base">{setting.icon}</div>
        <div className="pl-2.5 grid">
          <div className="mw-2">
            <p className="font-heading text-3xl font-semibold">
              {setting.label}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardBody className="py-2">
        <p className="font-inter text-lg opacity-80">
          {setting.tags
            .map((tag) => tag[0].toUpperCase() + tag.slice(1).toLowerCase())
            .join(", ")}
          , etc.
        </p>
      </CardBody>
    </Card>
  );
};

export default SettingsCard;
