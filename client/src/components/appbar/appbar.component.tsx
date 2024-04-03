import UserDropdown from "../dropdowns/user/userdropdown.component";
import { getTokensCookie } from "@/utils/storage";
import { User } from "@/stores/UserStore";
import { Button, Input, Tooltip } from "@nextui-org/react";
import { HiCog } from "react-icons/hi";
import { Link } from "react-router-dom";
import { FiArrowLeft, FiArrowRight, FiMenu } from "react-icons/fi";
import { SidebarStore } from "@/stores/SidebarStore";
import { observer } from "mobx-react";

export interface AppBarProps {
  user?: User;
  dashboard?: boolean;
  pageName: string;
  settings?: boolean;
}

export const AppBar: React.FC<AppBarProps> = ({
  dashboard,
  user,
  pageName,
  settings,
}) => {
  const cookies = getTokensCookie();

  return (
    <>
      <header className="w-full py-2 rounded-b-3xl shadow-xl pt-0">
        <div className="container mx-auto flex py-2 items-center">
          <nav className="flex items-center text-base mr-auto">
            {settings ? (
              <Link to="/store">
                <Button className="mr-5" isIconOnly>
                  <FiArrowLeft size={25} />
                </Button>
              </Link>
            ) : (
              <Tooltip
                placement="bottom"
                content={SidebarStore.open ? "Close Sidebar" : "Open Sidebar"}
              >
                <Button
                  onPress={() => SidebarStore.setOpen(!SidebarStore.open)}
                  className="mr-5"
                  isIconOnly
                  color={SidebarStore.open ? "primary" : "default"}
                >
                  {<FiMenu size={24} />}
                </Button>
              </Tooltip>
            )}
            <p className="font-heading text-2xl uppercase mr-10">{pageName}</p>
            <Input isDisabled className="mr-5" placeholder="Search..." />
          </nav>
          <div className="inline-flex lg:justify-end">
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
                <Tooltip content="Settings" placement="bottom">
                  <Link to="/settings">
                    <Button className="bg-tertiaryBG ml-2" size="lg" isIconOnly>
                      <HiCog size="25" className="text-white w-auto" />
                    </Button>
                  </Link>
                </Tooltip>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export const AppBarObserver = observer(AppBar);
