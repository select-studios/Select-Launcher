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
          <CardBody></CardBody>
          <CardFooter>
            All of your games will be published under your
          </CardFooter>
        </Card>
        <Card className="mt-10 px-2 py-1">
          <CardHeader>
            <p className="font-heading text-lg">PUBLISHED GAMES</p>
          </CardHeader>
          <CardBody>
            <Card className="px-2 py-1">
              <CardBody>as</CardBody>
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
