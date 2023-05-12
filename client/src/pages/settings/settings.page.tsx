import { AppBar } from "@/components";
import {
  Avatar,
  Button,
  Card,
  Grid,
  Input,
  Modal,
  Text,
} from "@nextui-org/react";
import { editAccount } from "@/handlers/api";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { HiCog, HiX } from "react-icons/hi";
import { FiEdit3, FiMonitor, FiSearch, FiUser } from "react-icons/fi";
import { UserStore } from "@/stores/UserStore";
import { useForm } from "react-hook-form";
import { observer } from "mobx-react";

interface SettingsProps {}

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

const SettingsComp: React.FC<SettingsProps> = () => {
  const [libraryLocation, setLibraryLocation] = useState<string>();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [visible, setVisible] = useState(false);
  const handler = () => setVisible(true);

  const closeHandler = () => {
    setVisible(false);
  };

  const { user: storedUser } = UserStore;

  useEffect(() => {
    console.log(UserStore);
    setLibraryLocation(window.gamesAPI.getStorageLocation());
  });

  const onSubmit = (data: any) => {
    editAccount(storedUser?.tokens.accessToken as string, data).then(
      (newUser) => {
        console.log("tf");
        UserStore.setUser({ ...newUser });

        window.location.reload();
      }
    );
  };

  return (
    <div>
      <motion.div exit={{ opacity: 0 }}>
        <div className="settings font-inter">
          <AppBar dashboard={true} user={storedUser as any} />
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
                  css={{ p: "$6", mw: "400px", backgroundColor: "#282A2D" }}
                  className="my-2 mr-5"
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
                    src="https://i.pravatar.cc/300"
                    className="mr-2"
                    size="xl"
                    bordered
                    color={"success"}
                  />
                  <Grid.Container css={{ pl: "$3" }}>
                    <Grid xs={12}>
                      <p>
                        <span className="text-xl font-montserrat font-bold">
                          @{storedUser?.username}
                        </span>
                        <br />
                        <span className="text-gray-300 font-inter">
                          {storedUser?.email}
                        </span>
                      </p>
                      <Button className="ml-5" auto onPress={handler}>
                        Edit Profile
                      </Button>
                    </Grid>
                  </Grid.Container>
                </Card.Header>{" "}
              </Card>
              <form onSubmit={() => handleSubmit(onSubmit)}>
                <Modal
                  closeButton
                  aria-labelledby="modal-title"
                  open={visible}
                  onClose={closeHandler}
                >
                  <Modal.Header justify="flex-start">
                    <p className="text-2xl font-bold flex items-center">
                      <FiEdit3 size="20" className="mr-2" /> Edit Profile
                    </p>
                  </Modal.Header>
                  <Modal.Header>
                    <Avatar
                      src="https://i.pravatar.cc/250?u=a042581f4e29026024d"
                      css={{ size: "$20" }}
                    />
                  </Modal.Header>
                  <Modal.Body>
                    <Input
                      clearable
                      bordered
                      fullWidth
                      color="primary"
                      size="lg"
                      label="Username"
                      placeholder={storedUser?.username}
                      {...register("username", {
                        required: "You must enter a username.",
                      })}
                    />
                    <Input
                      clearable
                      bordered
                      fullWidth
                      color="primary"
                      size="lg"
                      label="E-mail"
                      placeholder={storedUser?.email}
                      {...register("email", {
                        required: "You must enter an e-mail.",
                      })}
                    />
                  </Modal.Body>
                  <Modal.Footer>
                    <Button auto color="primary" type="submit">
                      Edit
                    </Button>
                    <Button auto flat color="error" onPress={closeHandler}>
                      Close
                    </Button>
                  </Modal.Footer>
                </Modal>
              </form>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export const Settings = observer(SettingsComp);
