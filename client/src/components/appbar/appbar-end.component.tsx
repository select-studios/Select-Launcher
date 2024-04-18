import { Button, Tooltip } from "@nextui-org/react";
import React, { FC } from "react";
import { HiCog } from "react-icons/hi";
import { Link } from "react-router-dom";
import UserDropdown from "../dropdowns/user/userdropdown.component";
import { User } from "@/stores/UserStore";

interface IProps {
  dashboard: boolean;
  user: User;
  cookies: any;
}

/**
 * @author
 * @function @AppbarEnd
 **/

export const AppbarEnd: FC<IProps> = ({ dashboard, user, cookies }) => {
  return (
    <div className="ml-auto">
      {dashboard && (
        <div className="flex items-center">
          <Tooltip content="Settings" placement="bottom">
            <Link to="/settings">
              <Button className="bg-content2 mr-2" size="md" isIconOnly>
                <HiCog size="25" className="w-auto" />
              </Button>
            </Link>
          </Tooltip>
          <UserDropdown
            user={{
              username: user?.username || "",
              verified: user?.verified || false,
              accessToken: cookies.accessToken || "",
              moderator: user?.moderator,
              pfp: user?.pfp,
            }}
          />
        </div>
      )}
    </div>
  );
};
