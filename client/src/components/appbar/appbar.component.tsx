import UserDropdown from "../dropdowns/user/userdropdown.component";
import { getTokensCookie } from "@/utils/storage";
import { User } from "@/stores/UserStore";
import { Badge, Button, Input, Tooltip } from "@nextui-org/react";
import { HiCog } from "react-icons/hi";
import { Link } from "react-router-dom";
import { FiArrowLeft, FiArrowRight, FiMenu } from "react-icons/fi";
import { SidebarStore } from "@/stores/SidebarStore";
import { observer } from "mobx-react";
import { SearchStore } from "@/stores/SearchStore";
import { HiBellAlert } from "react-icons/hi2";
import { sendVerificationLink } from "@/handlers/api";
import { useState } from "react";

export interface AppBarProps {
  user?: User;
  dashboard?: boolean;
  pageName: string;
  settings?: boolean;
  searchType?: "game" | "library" | "settings";
  searchBarVisible?: boolean;
}

export const AppBar: React.FC<AppBarProps> = ({
  dashboard,
  user,
  pageName,
  settings,
  searchBarVisible = true,
  searchType,
}) => {
  const cookies = getTokensCookie();
  const [loading, setLoading] = useState(false);

  return (
    <>
      {user && !user?.verified && (
        <div className="bg-warning items-center flex p-2 bg-opacity-10 mb-5 rounded-lg text-warning">
          <HiBellAlert size={20} />{" "}
          <span className="ml-2 font-medium">
            Your account is at risk! Please verify your e-mail to secure your
            account.
          </span>
          <Button
            onPress={() =>
              sendVerificationLink(user?.tokens.accessToken || "", setLoading)
            }
            className="ml-auto"
            color="warning"
            isLoading={loading}
          >
            Resend Verification Link
          </Button>
        </div>
      )}
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
            {searchBarVisible && (
              <Input
                onChange={(e) => {
                  console.log(SearchStore.search);
                  SearchStore.setSearch({
                    type: searchType || "game",
                    query: e.target.value,
                  });
                }}
                className="mr-5"
                placeholder="Search..."
                value={
                  (SearchStore.search.type == searchType || "game") &&
                  SearchStore.search.query
                }
              />
            )}
          </nav>
          <div className="inline-flex lg:justify-end">
            {dashboard && (
              <div className="flex items-center">
                <Tooltip content="Settings" placement="bottom">
                  <Link to="/settings">
                    <Button className="bg-tertiaryBG mr-2" size="md" isIconOnly>
                      <HiCog size="25" className="text-white w-auto" />
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
        </div>
      </header>
    </>
  );
};

export const AppBarObserver = observer(AppBar);
