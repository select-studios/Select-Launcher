import { AppBar, Sidebar } from "@/components";
import { UserStore } from "@/stores/UserStore";
import { Card, CardBody, CardHeader, Checkbox, Input } from "@nextui-org/react";
import React, { FC } from "react";

interface IProps {}

/**
 * @author
 * @function @Settings
 **/

export const Settings: FC<IProps> = (props) => {
  const { user } = UserStore;

  return (
    <section className="settings">
      <div className="main flex">
        <Sidebar settings active="home" />
        <div className="content mt-5 mr-5 w-full">
          <AppBar settings pageName="Settings" />
          <div className="mt-12">
            <Card className="p-2">
              <CardHeader>
                <p className="font-heading tracking-wider text-xl uppercase">
                  General
                </p>
              </CardHeader>
              <CardBody>
                <Checkbox>Update app automatically</Checkbox>
                <Input label="Download Location" className="mt-10"></Input>
              </CardBody>
            </Card>
            <Card className="mt-12 p-2">
              <CardHeader>
                <p className="font-heading tracking-wider text-xl uppercase">
                  App information
                </p>
              </CardHeader>
              <CardBody>
                <div className="grid grid-cols-4">
                  <div className="bg-tertiaryBG rounded-lg px-4 py-2">
                    <p className="text-base font-heading uppercase">Version</p>
                    <p className="text-base">3</p>
                  </div>
                  <div className="bg-tertiaryBG rounded-lg px-4 py-2 ml-2">
                    <p className="text-base font-heading uppercase">Build</p>
                    <p className="text-base">6900</p>
                  </div>
                  <div className="bg-tertiaryBG rounded-lg px-4 py-2 ml-2">
                    <p className="text-base font-heading uppercase">
                      Developer
                    </p>
                    <p className="text-base">Select Studios</p>
                  </div>
                  <div className="bg-tertiaryBG rounded-lg px-4 py-2 ml-2">
                    <p className="text-base font-heading uppercase">
                      Released on
                    </p>
                    <p className="text-base">01/05/2024</p>
                  </div>
                </div>
              </CardBody>
            </Card>
            <Card className="mt-12 p-2">
              <CardHeader>
                <p className="font-heading tracking-wider text-xl uppercase">
                  Developer tools
                </p>
              </CardHeader>
              <CardBody>
                <div className="grid grid-cols-4">
                  <div className="bg-tertiaryBG rounded-lg px-4 py-2">
                    <p className="text-base font-heading uppercase">User id</p>
                    <p className="text-base">{user?._id}</p>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
