import { AppBar, Sidebar } from "@/components";
import { Loader, LoadingState } from "@/components/loader/loader.component";
import {
  Avatar,
  Button,
  Card,
  Grid,
  Input,
  Link,
  Text,
} from "@nextui-org/react";
import { logout } from "@/handlers/api";
import protectRoute from "@/handlers/api/utils/protectRoute";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { BsFileEarmarkPlusFill } from "react-icons/bs";
import { getTokensCookie } from "@/utils/storage";
import { HiCog, HiX } from "react-icons/hi";
import { FiMonitor, FiSearch, FiUser } from "react-icons/fi";
import { UserStore_Impl } from "@/stores/UserStore";

interface SettingsProps {
  userStore: UserStore_Impl;
}

const settingIconSize = "40";

const settingsList = [
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

const Settings: React.FC<SettingsProps> = ({ userStore }) => {
  const [libraryLocation, setLibraryLocation] = useState<string>();
  const navigate = useNavigate();

  const { user } = userStore;

  useEffect(() => {
    setLibraryLocation(window.gamesAPI.getStorageLocation());
  });

  return (
    <div>
      <motion.div exit={{ opacity: 0 }}>
        <div className="settings font-inter">
          <AppBar dashboard={true} user={user as any} />
          <div className="settings__content mx-20 mt-20 flex text-white">
            <div className="settings__content+header">
              <p className="text-4xl text-white font-extrabold font-montserrat opacity-100 flex items-center">
                <HiCog size="40" className="mr-2" /> Settings
              </p>
              <p className="text-xl font-inter opacity-80 font-medium">
                Please select what you would want to modify.
              </p>
            </div>
            <div className="grid justify-end items-center flex-1">
              <div
                onClick={() => navigate("/home")}
                onKeyUp={(e) => e.key == "escape" && navigate("/home")}
                className="cursor-pointer border-solid border-2 grid items-center rounded-full p-1 border-gray-400"
              >
                <HiX size="40" />
              </div>
              <span className="grid justify-center mt-2 font-semibold">
                ESC
              </span>
            </div>
          </div>
          <div className="mx-20 mt-10 grid justify-start">
            <Input
              bordered
              contentRight={<FiSearch size="20" />}
              labelPlaceholder="Search for a setting"
              size="lg"
              color="primary"
            />
          </div>
          <div className="flex mx-20 mt-10">
            <div className="flex">
              {settingsList.map((setting, i) => (
                <Card
                  css={{ p: "$6", mw: "400px" }}
                  className="bg-secondary my-2 mr-5"
                  isHoverable
                  isPressable
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
                          .map(
                            (tag) =>
                              tag[0].toUpperCase() + tag.slice(1).toLowerCase()
                          )
                          .join(", ")}
                        , etc.
                      </p>
                    </Text>
                  </Card.Body>
                </Card>
              ))}
            </div>
            <div className="ml-auto">
              <Card css={{ p: "$6" }} className="bg-secondary">
                <Card.Header className="">
                  <Avatar
                    src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                    className="mr-2 "
                    size="xl"
                    bordered
                    color={"success"}
                  />
                  <Grid.Container css={{ pl: "$3" }}>
                    <Grid xs={12}>
                      <p>
                        <span className="text-xl font-montserrat font-bold">
                          @{user?.username}
                        </span>
                        <br />
                        <span className="text-gray-300 font-inter">
                          {user?.email}
                        </span>
                      </p>
                      <Button className="ml-5" auto>
                        Edit Profile
                      </Button>
                    </Grid>
                  </Grid.Container>
                </Card.Header>
                <Card.Divider />
                <Card.Body css={{ py: "$2", mt: "$4" }}>
                  <Button className="bg-tertiary">Library</Button>
                  <Button className="bg-tertiary mt-2">Statistics</Button>
                  <Button className="bg-tertiary mt-2">Community</Button>
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export { Settings };
