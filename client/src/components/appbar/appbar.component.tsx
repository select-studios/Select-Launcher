import UserDropdown from "../dropdowns/user/userdropdown.component";
import { getTokensCookie } from "@/utils/storage";
import { User } from "@/stores/UserStore";
import { Button } from "@nextui-org/react";
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
      <header className="w-full py-2 rounded-b-3xl shadow-xl pt-0">
        <div className="container mx-auto flex flex-wrap p-2 flex-col md:flex-row items-center">
          <nav className="flex lg:2/5 flex-wrap items-center text-base md:ml-auto"></nav>
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
                  <Button
                    className="bg-tertiaryBG ml-2"
                    size="lg"
                    radius="full"
                  >
                    <HiCog size="25" className="text-white w-auto" />
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
