import UserDropdown from "../dropdowns/user/userdropdown.component";
import { getTokensCookie } from "@/utils/storage";
import { User } from "@/stores/UserStore";
import { Button } from "@nextui-org/react";
import { Settings } from "@/pages";
import { ImCogs } from "react-icons/im";
import { FiSettings } from "react-icons/fi";
import { FcSettings } from "react-icons/fc";
import { HiCog } from "react-icons/hi";
import { Link } from "react-router-dom";

export interface AppBarProps {
  user?: User;
  dashboard?: boolean;
}

export const AppBar: React.FC<AppBarProps> = ({ dashboard, user }) => {
  const cookies = getTokensCookie();

  return (
    <>
      <header className="w-full bg-secondary py-2 rounded-b-3xl shadow-xl pt-0">
        <div className="container mx-auto flex flex-wrap p-2 flex-col md:flex-row items-center">
          <nav className="flex lg:2/5 flex-wrap items-center text-base md:ml-auto"></nav>
          <div className="flex order-first lg:order-none lg:w-1/5 title-font font-medium items-center text-gray-900 lg:items-center lg:justify-center mb-4 md:mb-0">
            <p className="text-white font-semibold font-montserrat text-2xl pb-2">
              Select Studios
            </p>
          </div>
          <div className="lg:w-2/5 inline-flex lg:justify-end">
            {dashboard && (
              <div className="flex">
                <UserDropdown
                  user={{
                    username: user?.username || "",
                    verified: user?.verified || false,
                    accessToken: cookies.accessToken || "",
                    moderator: user?.moderator,
                  }}
                />
                <Link to="/settings">
                  <Button className="bg-tertiary ml-2" auto size="lg" rounded>
                    <HiCog size="25" className="text-white" />
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
};
