import { AppBar } from "@/components";
import { SidebarObserver } from "@/components/sidebar/sidebar.component";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Tooltip,
} from "@nextui-org/react";
import { observer } from "mobx-react";
import React, { FC, useState } from "react";
import { FiEdit, FiEdit2, FiEdit3, FiPenTool } from "react-icons/fi";
import UserImage from "../../../../../Resources/ICON_User.png";
import { UserStore } from "@/stores/UserStore";
import { FaAsterisk, FaLock, FaUnlock } from "react-icons/fa6";
import { editAccount } from "@/handlers/api";
import { useForm } from "react-hook-form";
import { HiUserPlus } from "react-icons/hi2";
import { HiCheck } from "react-icons/hi";

const { ipcRenderer } = window.require("electron");
import "../account/account-settings.style.css";

interface IProps {}

/**
 * @author
 * @function @AccountSettings
 **/

const AccountSettingsComp: FC<IProps> = (props) => {
  const { user } = UserStore;
  const [loading, setLoading] = useState(false);
  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm({ mode: "onBlur" });
  const [editAccountVisible, setEditAccountVisible] = useState(false);

  const [image, setImage] = useState<any>("");
  const [removedAvatar, setRemovedAvatar] = useState(false);

  const showImage = image ? image : !removedAvatar ? user?.pfp : image;

  const onEditUserSubmit = (data: any) => {
    setLoading(true);
    handleSubmit(data);
    editAccount(
      user?.tokens.accessToken || "",
      {
        username: data.username,
        pfp: showImage,
      },
      setLoading
    ).then(() => {
      setEditAccountVisible(false);
    });
  };

  const convertToBase64 = (e: any) => {
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setImage(reader.result);
    };
  };

  return (
    <div className="flex h-screen overflow-y-scroll">
      <SidebarObserver settings active="account" />
      <div className="content mb-10 mt-5 mr-5 w-full h-fit">
        <AppBar pageName="Account" settings searchBarVisible={false} />
        <Card className="mt-10 p-2 max-h-fit">
          <CardHeader className="font-heading flex items-center text-xl">
            <span className="uppercase">profile</span>
            <Button
              size="sm"
              className="font-sans ml-5"
              onPress={() => setEditAccountVisible(true)}
              startContent={<FiEdit2 size={14} />}
            >
              Edit
            </Button>
          </CardHeader>
          <CardBody>
            <div className="flex">
              <Avatar src={user?.pfp} className="h-32 w-36 rounded-lg" />
              <div className="grid w-full ml-5 grid-cols-1">
                <div className="bg-content2 rounded-lg p-2 px-3">
                  <p className="font-heading text-base uppercase header">
                    username
                  </p>
                  <p className="font-heading bottom-0 mb-5 text-2xl">
                    {user?.username}
                  </p>
                  <p>
                    {user?.moderator && (
                      <Chip
                        color="warning"
                        startContent={<HiUserPlus size={16} />}
                        className="mr-2"
                        variant="shadow"
                      >
                        Moderator
                      </Chip>
                    )}

                    {user?.verified && (
                      <Chip
                        startContent={<HiCheck size={16} />}
                        color="success"
                        className="mr-2 bg-opacity-100"
                        variant="shadow"
                      >
                        Verified
                      </Chip>
                    )}
                  </p>
                </div>{" "}
              </div>
            </div>
          </CardBody>
        </Card>
        <Card className="mt-10 p-2">
          <CardHeader className="font-heading flex items-center text-xl">
            <span className="uppercase">Account Security</span>{" "}
            <Chip
              className="uppercase ml-2 font-heading tracking-wider"
              color="primary"
            >
              Coming soon
            </Chip>
          </CardHeader>
          <CardBody>
            <div className="flex">
              <Button
                startContent={<FaUnlock size={16} />}
                isDisabled
                size="lg"
                color="danger"
              >
                Change Password
              </Button>
              <Button
                startContent={<FaUnlock size={16} />}
                className="ml-2"
                isDisabled
                size="lg"
                color="danger"
              >
                Change E-mail
              </Button>
            </div>
            <div className="bg-content2 h-28 mt-5 rounded-lg p-2 px-3">
              <p className="font-heading text-base uppercase header">E-mail</p>
              <p className="absolute font-heading bottom-0 mb-5 text-2xl">
                {user?.email}
              </p>
            </div>{" "}
          </CardBody>
        </Card>
        <Card className="mt-12 mb-10 p-2">
          <CardHeader>
            <p className="font-heading tracking-wider text-xl uppercase">
              Developer tools
            </p>
          </CardHeader>
          <CardBody>
            <div className="grid grid-cols-4">
              <div className="bg-content2 rounded-lg px-4 py-2">
                <p className="text-base font-heading uppercase header">
                  User id
                </p>
                <p className="text-base">{user?._id}</p>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
      <Modal
        closeButton
        backdrop="opaque"
        aria-labelledby="modal-title"
        isDismissable={loading ? false : true}
        isOpen={editAccountVisible}
        onClose={() => setEditAccountVisible(false)}
      >
        <ModalContent>
          <form onSubmit={handleSubmit(onEditUserSubmit)}>
            <ModalHeader className="justify-start">
              <p className="text-2xl font-heading font-thin flex items-center">
                Edit Profile
              </p>
            </ModalHeader>
            <ModalBody className="mt-2">
              <div className="grid items-center justify-center">
                <Avatar
                  src={image ? image : !removedAvatar ? user?.pfp : image}
                  className="mr-2 mb-5 mx-auto w-28 h-28 rounded-xl"
                />

                <div className="buttons mb-2   flex items-center justify-center">
                  <Button
                    className="mr-2"
                    color={image ? "default" : "primary"}
                    variant="shadow"
                    size="sm"
                  >
                    <label className="cursor-pointer" htmlFor="pfp-upload">
                      <input
                        accept="image/*"
                        type="file"
                        className="hidden"
                        id="pfp-upload"
                        onChange={convertToBase64}
                      />{" "}
                      {image ? "Change" : "Edit"} Avatar
                    </label>
                  </Button>
                  <Button
                    onPress={() => {
                      setImage("");
                      setRemovedAvatar(true);
                    }}
                    size="sm"
                    color="danger"
                  >
                    Remove Avatar
                  </Button>
                </div>
              </div>

              <Input
                className="w-full"
                label="Username"
                description={errors.username?.message?.toString() || ""}
                isInvalid={errors.username?.message?.toString() ? true : false}
                color={errors.username ? "danger" : "default"}
                variant="flat"
                defaultValue={user?.username}
                {...register("username", {
                  required: { value: true, message: "Username is required." },
                })}
              />
            </ModalBody>
            <ModalFooter>
              <Button
                className="w-auto"
                color="primary"
                variant="shadow"
                type="submit"
                isLoading={loading}
              >
                Proceed
              </Button>
              <Button
                variant="flat"
                className="w-auto"
                isDisabled={loading}
                onPress={() => {
                  setEditAccountVisible(false);
                  reset();
                }}
              >
                Close
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </div>
  );
};

export const AccountSettings = observer(AccountSettingsComp);
