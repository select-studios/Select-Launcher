import { AppBar } from "@/components";
import {
  Avatar,
  Button,
  Card,
  CardHeader,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import { editAccount } from "@/handlers/api";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { HiCog, HiMail, HiX } from "react-icons/hi";
import { FiEdit3, FiSearch } from "react-icons/fi";
import { UserStore } from "@/stores/UserStore";
import { useForm } from "react-hook-form";
import { observer } from "mobx-react";
import { validateInputColor } from "@/utils/form";
import SettingsCard from "@/components/settings/card/settingscard.component";
import settingsList from "@/handlers/api/utils/data/settingsList";
import { Log } from "@/utils/lib/Log";
import userIcon from "../../assets/images/ICON_User.png";
import { toast } from "react-toastify";

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
        closeEditProfile();

        toast.success("Edited user information.");
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
                Select a setting you want to modify.
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
                CLOSE
              </span>
            </div>
          </div>
          <div className="mx-20 mt-10 grid justify-start">
            <Input
              variant="bordered"
              endContent={<FiSearch size="20" />}
              placeholder="Search for a setting"
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
                <div>
                  <SettingsCard setting={setting} settingN={i} />
                </div>
              ))}
            </div>
            <div className="ml-auto">
              <Card className="bg-secondary p-6">
                <CardHeader className="">
                  <Avatar
                    src={userIcon}
                    className="mr-2"
                    size="lg"
                    isBordered
                    color="primary"
                  />
                  <div className="grid pl-3">
                    <div>
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
                        startContent={<FiEdit3 size="20" />}
                        className="ml-5 w-auto"
                        onPress={openEditProfile}
                      >
                        Edit
                      </Button>
                    </div>
                  </div>
                </CardHeader>{" "}
              </Card>
              <Modal
                closeButton
                aria-labelledby="modal-title"
                isOpen={editProfileVisible}
                onClose={closeEditProfile}
              >
                <form onSubmit={handleSubmitEditProfile(onSubmit)}>
                  <ModalHeader className="justify-start">
                    <p className="text-2xl font-bold flex items-center">
                      <FiEdit3 size="20" className="mr-2" /> Edit Profile
                    </p>
                  </ModalHeader>
                  <ModalHeader>
                    <Avatar src={userIcon} className="size-20" />
                  </ModalHeader>
                  <ModalBody>
                    <Input
                      variant="bordered"
                      fullWidth
                      color={validateInputColor(
                        errorsEditProfile,
                        "username",
                        true
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
                      isClearable
                      variant="bordered"
                      fullWidth
                      color={validateInputColor(
                        errorsEditProfile,
                        "email",
                        true
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
                  </ModalBody>
                  <ModalFooter>
                    <Button className="w-auto" color="primary" type="submit">
                      Edit
                    </Button>
                    <Button
                      variant="flat"
                      color="danger"
                      className="w-auto"
                      onPress={closeEditProfile}
                    >
                      Close
                    </Button>
                  </ModalFooter>
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
