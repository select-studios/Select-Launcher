import { AppBar } from "@/components";
import { Avatar, Button, Card, Grid, Input, Modal } from "@nextui-org/react";
import { editAccount } from "@/handlers/api";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { HiCog, HiMail, HiX } from "react-icons/hi";
import { FiEdit3, FiSearch } from "react-icons/fi";
import { UserStore } from "@/stores/UserStore";
import { useForm } from "react-hook-form";
import { observer } from "mobx-react";
import { validateInputComponent } from "@/utils/form";
import SettingsCard from "@/components/settings/card/settingscard.component";
import settingsList from "@/handlers/api/utils/data/settingsList";
import { Log } from "@/utils/lib/Log";

interface SettingsProps {}

const SettingsComp: React.FC<SettingsProps> = () => {
  const [libraryLocation, setLibraryLocation] = useState<string>();
  const [settingsSF, setSettingsSF] = useState<string>("");
  const navigate = useNavigate();

  const {
    register: registerEditProfile,
    handleSubmit: handleSubmitEditProfile,
    formState: { errors: errorsEditProfile },
  } = useForm({ mode: "onChange" });

  const [editProfileVisible, setEditProfileVisible] = useState(false);

  const openEditProfile = () => setEditProfileVisible(true);
  const closeEditProfile = () => {
    setEditProfileVisible(false);
  };

  const { user: storedUser } = UserStore;

  useEffect(() => {
    setLibraryLocation(window.gamesAPI.getStorageLocation());
    Log.success("Local library location has been set.");
  });

  const onSubmit = (data: any) => {
    editAccount(storedUser?.tokens.accessToken as string, data).then(
      ({ email, password, username }) => {
        UserStore.setUser({ ...storedUser!, email, password, username });
        console.log(storedUser);
        closeEditProfile();
      }
    );
  };

  const handleEscPress = (e: any) => {
    if (e.key === "Escape") {
      navigate("/home");
    }
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
                onKeyUp={(e) => handleEscPress(e)}
                tabIndex={-1}
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
              onChange={(e) => setSettingsSF(e.target.value)}
            />
          </div>
          <div className="flex mx-20 mt-10">
            <div className="flex">
              {(settingsSF.length
                ? settingsList.filter(
                    (setting) =>
                      settingsSF.includes(setting.id) ||
                      setting.tags.join(", ").includes(settingsSF)
                  )
                : settingsList
              ).map((setting, i) => (
                <SettingsCard setting={setting} settingN={i} />
              ))}
            </div>
            <div className="ml-auto">
              <Card css={{ p: "$6" }} className="bg-secondary">
                <Card.Header className="">
                  <Avatar
                    src="https://github.com/select-studios/Select-Launcher/blob/main/Resources/ICON_User.png?raw=true"
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
                        <span className="text-gray-300 font-inter flex items-center">
                          <HiMail size="20" className="mr-1" />{" "}
                          {storedUser?.email}
                        </span>
                      </p>
                      <Button
                        icon={<FiEdit3 size="20" />}
                        className="ml-5"
                        auto
                        onPress={openEditProfile}
                      >
                        Edit
                      </Button>
                    </Grid>
                  </Grid.Container>
                </Card.Header>{" "}
              </Card>
              <Modal
                closeButton
                aria-labelledby="modal-title"
                open={editProfileVisible}
                onClose={closeEditProfile}
              >
                <form onSubmit={handleSubmitEditProfile(onSubmit)}>
                  <Modal.Header justify="flex-start">
                    <p className="text-2xl font-bold flex items-center">
                      <FiEdit3 size="20" className="mr-2" /> Edit Profile
                    </p>
                  </Modal.Header>
                  <Modal.Header>
                    <Avatar
                      src="https://github.com/select-studios/Select-Launcher/blob/main/Resources/ICON_User.png?raw=true"
                      css={{ size: "$20" }}
                    />
                  </Modal.Header>
                  <Modal.Body>
                    <Input
                      bordered
                      fullWidth
                      color={validateInputComponent(
                        errorsEditProfile,
                        "username",
                        true
                      )}
                      helperColor={validateInputComponent(
                        errorsEditProfile,
                        "username",
                        true
                      )}
                      helperText={validateInputComponent(
                        errorsEditProfile,
                        "username",
                        false
                      )}
                      size="lg"
                      label="Username"
                      placeholder={storedUser?.username}
                      {...registerEditProfile("username", {
                        required: "You must enter a username.",
                        minLength: 2,
                      })}
                    />
                    <span className="my-1"></span>
                    <Input
                      clearable
                      bordered
                      fullWidth
                      color={validateInputComponent(
                        errorsEditProfile,
                        "email",
                        true
                      )}
                      helperColor={validateInputComponent(
                        errorsEditProfile,
                        "email",
                        true
                      )}
                      helperText={validateInputComponent(
                        errorsEditProfile,
                        "email",
                        false
                      )}
                      size="lg"
                      label="E-mail"
                      placeholder={storedUser?.email}
                      {...registerEditProfile("email", {
                        required: "You need to provide us with an e-mail.",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message:
                            "Oops! That e-mail address does not look right.",
                        },
                      })}
                    />
                  </Modal.Body>
                  <Modal.Footer>
                    <Button auto color="primary" type="submit">
                      Edit
                    </Button>
                    <Button auto flat color="error" onPress={closeEditProfile}>
                      Close
                    </Button>
                  </Modal.Footer>
                </form>
              </Modal>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export const Settings = observer(SettingsComp);
