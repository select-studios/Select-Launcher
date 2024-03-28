import { SettingsCardI } from "@/components/settings/card/settingscard.component";
import { FiMonitor, FiUser } from "react-icons/fi";

const settingIconSize = "40";

const settingsList: SettingsCardI[] = [
  {
    label: "App",
    id: "app",
    icon: <FiMonitor size={settingIconSize} />,
    tags: [
      "download locations",
      "app settings",
      "app preferences",
      "app configuration",
    ],
  },
  {
    label: "User",
    id: "user",
    icon: <FiUser size={settingIconSize} />,
    tags: ["user privacy", "user settings", "profile customization"],
  },
];

export default settingsList;
