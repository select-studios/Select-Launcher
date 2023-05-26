import ButtonLoader from "@/components/loader/button/buttonloader.component";
import { logout, sendVerificationLink } from "@/handlers/api";
import { Avatar, Badge, Button, Dropdown } from "@nextui-org/react";
import {
  HiCheck,
  HiCog,
  HiDatabase,
  HiHome,
  HiLogout,
  HiUser,
} from "react-icons/hi";
import { HiBellAlert, HiUserPlus } from "react-icons/hi2";
import { useNavigate } from "react-router";
import userImg from "../../../assets/images/ICON_User.png";

interface UserDropdownProps {
  user: {
    username: string;
    verified: boolean;
    accessToken: string;
    moderator?: boolean;
  };
}

const UserDropdown: React.FC<UserDropdownProps> = ({ user }) => {
  const navigate = useNavigate();

  return (
    <div>
      <Dropdown>
        <Dropdown.Trigger>
          <Avatar src={userImg} size="lg" className="mr-2 cursor-pointer" />
        </Dropdown.Trigger>
        <Dropdown.Menu
          className="bg-secondary"
          disabledKeys={["badges"]}
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
            } else if (key == "home") {
              navigate("/");
            } else if (key == "settings") {
              navigate("/settings");
            } else if (key == "admindashboard") {
              navigate("/admin/dashboard");
            }
          }}
        >
          {(user?.verified || (user?.moderator as any)) && (
            <Dropdown.Item key="badges" className="flex mb-2">
              {user?.verified && (
                <Badge color="success" className="mr-2">
                  <HiCheck className="mr-1" /> Verified
                </Badge>
              )}
              {user?.moderator && (
                <Badge variant="flat" color="warning" className="mr-2">
                  <HiUserPlus className="mr-1" />
                  Moderator
                </Badge>
              )}
            </Dropdown.Item>
          )}

          <Dropdown.Item icon={<HiHome size="20" />} key="home">
            Home
          </Dropdown.Item>
          <Dropdown.Item icon={<HiUser size="20" />} key="profile">
            Profile
          </Dropdown.Item>
          <Dropdown.Item key="settings" icon={<HiCog size="20" />}>
            Settings
          </Dropdown.Item>
          {(!user?.verified as Boolean) && (
            <Dropdown.Item
              icon={<HiBellAlert size="20" />}
              key="verified"
              color="warning"
              description="Resend verification link."
            >
              Not verified
            </Dropdown.Item>
          )}

          {(user?.moderator as Boolean) && (
            <Dropdown.Section title="Admin Zone">
              <Dropdown.Item
                key="admindashboard"
                icon={<HiDatabase size="20" />}
              >
                Dashboard
              </Dropdown.Item>
            </Dropdown.Section>
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
