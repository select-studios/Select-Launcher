import ButtonLoader from "@/components/loader/button/buttonloader.component";
import { logout, sendVerificationLink } from "@/handlers/api";
import { Avatar, Badge, Button, Dropdown } from "@nextui-org/react";
import { HiCheck, HiCog, HiDatabase, HiLogout, HiUser } from "react-icons/hi";
import { HiBellAlert } from "react-icons/hi2";
import { useNavigate } from "react-router";
import { observer } from "mobx-react";
import { UserStore } from "@/stores/UserStore";

interface UserDropdownProps {
  user: {
    username: string;
    verified: boolean;
    accessToken: string;
    moderator: boolean;
  };
}

const UserDropdown: React.FC<UserDropdownProps> = ({ user }) => {
  const navigate = useNavigate();

  return (
    <div>
      <Dropdown>
        <Dropdown.Button
          className="bg-tertiary"
          size="lg"
          css={{ background: "#393C40" }}
        >
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
            if (key == "logout") {
              const storedRfToken = localStorage.getItem("refreshToken");
              if (storedRfToken && storedRfToken.length) {
                const refreshToken = JSON.parse(storedRfToken).refreshToken;
                logout(refreshToken, navigate);
              }
            } else if (key == "verified" && !user?.verified) {
              sendVerificationLink(user.accessToken);
            } else if (key == "profile") {
              navigate("/settings/profile");
            } else if (key == "settings") {
              navigate("/settings");
            }
          }}
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
            className={user?.verified ? "animate-none" : ""}
            key="verified"
            color={user?.verified ? "success" : "warning"}
            description={user?.verified ? "" : "Resend verification link."}
          >
            {user?.verified ? "Verified" : "Not verified"}
          </Dropdown.Item>
          {user?.moderator ? (
            <Dropdown.Section title="Admin Zone">
              <Dropdown.Item key="appdashboard" icon={<HiDatabase size="20" />}>
                App Dashboard
              </Dropdown.Item>
            </Dropdown.Section>
          ) : (
            <></>
          )}
          <Dropdown.Section title="Danger Zone">
            <Dropdown.Item
              key="logout"
              color="error"
              icon={<HiLogout size="20" />}
            >
              Logout
            </Dropdown.Item>
          </Dropdown.Section>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default UserDropdown;
