import { SidebarStore } from "@/stores/SidebarStore";
import { User } from "@/stores/UserStore";
import { Avatar, Card, CardBody } from "@nextui-org/react";
import React, { FC } from "react";
import { FaCircle } from "react-icons/fa6";
import { useNavigate } from "react-router";

interface IProps {
  user: User;
}

/**
 * @author
 * @function @SidebarUser
 **/

export const SidebarUser: FC<IProps> = ({ user }) => {
  const navigate = useNavigate();

  return (
    <Card
      isPressable
      isHoverable
      onPress={() => navigate("/settings/account")}
      className="shadow-none w-full mb-10 border-2 border-content2"
    >
      <CardBody>
        <div className="flex items-center justify-center overflow-hidden">
          <Avatar
            src={user?.pfp}
            alt="Account Logo"
            className={
              SidebarStore.open ? "w-12 h-12 rounded-xl" : "w-8 h-8 rounded-xl"
            }
          />

          {SidebarStore.open && (
            <div className="ml-5">
              <p className="text-base font-heading">
                {user?.username.slice(0, 8) + "..."}
              </p>
              <p className="text-xs mt-auto font-medium text-success flex items-center">
                <FaCircle className="mr-1" size={8} /> Online
              </p>
            </div>
          )}
        </div>
      </CardBody>
    </Card>
  );
};
