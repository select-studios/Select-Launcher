import { sendVerificationLink } from "@/handlers/api";
import { Avatar, Button, Dropdown, User } from "@nextui-org/react";
import { useCookies } from "react-cookie";
import { HiCheck, HiChevronDown, HiLogout, HiUser, HiX } from "react-icons/hi";
import { HiBellAlert } from "react-icons/hi2";

export interface AppBarProps {
  user?: {
    username: string;
    email: string;
    verified: boolean;
  };
  dashboard?: boolean;
  logoutFn?: () => void;
}

export const AppBar: React.FC<AppBarProps> = ({
  dashboard,
  user,
  logoutFn,
}) => {
  const [cookies, setCookies, removeCookies] = useCookies([
    "accessToken",
    "refreshToken",
  ]);

  return (
    <>
      <header className="w-full bg-secondary py-2 rounded-b-3xl shadow-xl">
        <div className="container mx-auto flex flex-wrap p-2 flex-col md:flex-row items-center">
          <nav className="flex lg:2/5 flex-wrap items-center text-base md:ml-auto"></nav>
          <div className="flex order-first lg:order-none lg:w-1/5 title-font font-medium items-center text-gray-900 lg:items-center lg:justify-center mb-4 md:mb-0">
            <p className="text-white font-semibold font-montserrat text-2xl">
              Select Studios
            </p>
          </div>
          <div className="lg:w-2/5 inline-flex lg:justify-end">
            {dashboard && (
              <div>
                <Dropdown>
                  <Dropdown.Button className="bg-tertiary" size="lg">
                    <div className="flex items-center">
                      <Avatar
                        text={user?.username.substring(0, 2)}
                        className="mr-2"
                        color="primary"
                        size="md"
                      />
                      <span className="normal-case">@{user?.username}</span>
                    </div>
                  </Dropdown.Button>
                  <Dropdown.Menu
                    className="bg-secondary"
                    onAction={(key) => {
                      if (key == "logout" && logoutFn) {
                        logoutFn();
                      } else if (key == "verified" && !user?.verified) {
                        sendVerificationLink(cookies.accessToken);
                      }
                    }}
                  >
                    <Dropdown.Item icon={<HiUser size="20" />} key="profile">
                      Profile
                    </Dropdown.Item>
                    <Dropdown.Item
                      icon={
                        user?.verified ? (
                          <HiCheck size="20" />
                        ) : (
                          <HiBellAlert size="20" />
                        )
                      }
                      key="verified"
                      color={user?.verified ? "success" : "warning"}
                      description={
                        user?.verified ? "" : "Resend verification link."
                      }
                    >
                      {user?.verified ? "Verified" : "Not verified"}
                    </Dropdown.Item>
                    <Dropdown.Item
                      icon={<HiLogout size="20" />}
                      key="logout"
                      withDivider
                      color="error"
                    >
                      Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
};
