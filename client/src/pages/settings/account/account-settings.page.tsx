import { AppBar } from "@/components";
import { SidebarObserver } from "@/components/sidebar/sidebar.component";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Image,
} from "@nextui-org/react";
import { observer } from "mobx-react";
import React, { FC } from "react";
import { FiEdit, FiEdit2, FiEdit3, FiPenTool } from "react-icons/fi";
import UserImage from "../../../../../Resources/ICON_User.png";
import { UserStore } from "@/stores/UserStore";
import { FaAsterisk, FaLock, FaUnlock } from "react-icons/fa6";

interface IProps {}

/**
 * @author
 * @function @AccountSettings
 **/

const AccountSettingsComp: FC<IProps> = (props) => {
  const { user } = UserStore;
  return (
    <div className="flex">
      <SidebarObserver settings active="account" />
      <div className="content mt-5 mr-5 w-full">
        <AppBar pageName="Account" settings searchBarVisible={false} />
        <Card className="mt-10 p-2">
          <CardHeader className="font-heading flex items-center text-xl">
            <span className="uppercase">profile</span>
            <Button
              size="sm"
              className="font-sans ml-5"
              startContent={<FiEdit2 size={14} />}
            >
              Edit
            </Button>
          </CardHeader>
          <CardBody>
            <div className="flex">
              <Image src={UserImage} className="w-28 rounded-lg" />
              <div className="grid w-full ml-5 grid-cols-2">
                <div className="bg-tertiaryBG mr-5 rounded-lg p-2 px-3">
                  <p className="font-heading text-base uppercase">username</p>
                  <p className="absolute font-heading bottom-0 mb-5 text-2xl">
                    @{user?.username}
                  </p>
                </div>{" "}
                <div className="bg-tertiaryBG rounded-lg p-2 px-3 w-full">
                  <p className="font-heading text-base uppercase">e-mail</p>
                  <div className="absolute flex items-center font-heading bottom-0 mb-5 text-2xl">
                    <p>{user?.email}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
        <Card className="mt-10 p-2">
          <CardHeader className="font-heading flex items-center text-xl">
            <span className="uppercase">auth</span>{" "}
            <Chip className="uppercase ml-2 font-heading tracking-wider">
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
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export const AccountSettings = observer(AccountSettingsComp);
