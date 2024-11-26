import { AppBar, Sidebar } from "@/components";
import { UserStore } from "@/stores/UserStore";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@nextui-org/react";
import React, { FC } from "react";

interface IProps {}

/**
 * @author
 * @function @IndexDeveloper
 **/

export const IndexDeveloper: FC<IProps> = (props) => {
  const { user } = UserStore;

  return (
    <div className="h-screen flex overflow-y-scroll">
      <Sidebar active="develop" />
      <div className="content w-full mr-5 mt-5">
        <AppBar pageName="DEVELOP" searchBarVisible={false} user={user!} />
        <Card className="mt-10 px-2 py-1">
          <CardHeader>
            <p className="font-heading text-lg">DEVELOPER PROFILE</p>
          </CardHeader>
          <CardBody>
            <div className="grid grid-cols-2">
              <div className="bg-content2 rounded-lg px-4 py-2">
                <p className="text-base font-heading uppercase">
                  Developer Name
                </p>
                <p className="text-base">{user?.username}</p>
              </div>
              <div className="bg-content2 rounded-lg px-4 py-2 ml-5">
                <p className="text-base font-heading uppercase">
                  Publisher Name
                </p>
                <p className="text-base">{user?.username}</p>
              </div>
            </div>
          </CardBody>
          <CardFooter>
            <p className="text-sm font-medium">
              All of your games will be published under your "Publisher Name".
            </p>
          </CardFooter>
        </Card>
        <Card className="mt-10 px-2 py-1">
          <CardHeader>
            <p className="font-heading text-lg">PUBLISHED GAMES</p>
          </CardHeader>
          <CardBody>
            <Card className="px-2 py-1">
              <CardHeader>Game #1</CardHeader>
              <CardBody>
                Kendrick lamar more like kendrick lame-ar. Diss diss me now you
                gotta kiss me
              </CardBody>
            </Card>
          </CardBody>
          <CardFooter>
            <div className="flex">
              <Button color="success" variant="shadow">
                Publish Game
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};
