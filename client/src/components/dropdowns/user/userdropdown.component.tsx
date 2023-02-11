import ButtonLoader from "@/components/loader/button/buttonloader.component";
import { sendVerificationLink } from "@/handlers/api";
import { Avatar, Button, Dropdown } from "@nextui-org/react";
import { HiCheck, HiCog, HiLogout, HiUser } from "react-icons/hi";
import { HiBellAlert } from "react-icons/hi2";
import { useNavigate } from "react-router";

interface UserDropdownProps {
  user: { username: string; verified: boolean; accessToken: string };
  logoutFn: () => void;
  loggingOut: boolean;
}

const UserDropdown: React.FC<UserDropdownProps> = ({
  user,
  logoutFn,
  loggingOut,
}) => {
  const navigate = useNavigate();

  return (
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
              sendVerificationLink(user.accessToken);
            } else if (key == "settings") {
              navigate("/settings");
            }
          }}
          disabledKeys={["profile"]}
        >
          <Dropdown.Item icon={<HiUser size="20" />} key="profile">
            Profile
          </Dropdown.Item>
          <Dropdown.Item key="settings" icon={<HiCog size="20" />}>
            Settings
          </Dropdown.Item>
          <Dropdown.Item
            icon={
              user?.verified ? <HiCheck size="20" /> : <HiBellAlert size="20" />
            }
            key="verified"
            color={user?.verified ? "success" : "warning"}
            description={user?.verified ? "" : "Resend verification link."}
          >
            {user?.verified ? "Verified" : "Not verified"}
          </Dropdown.Item>

          <Dropdown.Item key="logout" withDivider>
            <ButtonLoader
              loading={loggingOut}
              button={
                <Button
                  className="w-full"
                  icon={<HiLogout size="20" />}
                  color="error"
                  flat
                >
                  Logout
                </Button>
              }
            />
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default UserDropdown;
