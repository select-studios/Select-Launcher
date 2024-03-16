import { logout, sendVerificationLink } from "@/handlers/api";
import {
  Avatar,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
} from "@nextui-org/react";
import { Badge } from "@nextui-org/react";
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
    accessToken: string | null | number;
    moderator?: boolean;
  };
}

const UserDropdown: React.FC<UserDropdownProps> = ({ user }) => {
  const navigate = useNavigate();

  return (
    <div>
      <Dropdown>
        <DropdownTrigger>
          <Avatar src={userImg} size="lg" className="mr-2 cursor-pointer" />
        </DropdownTrigger>
        <DropdownMenu
          className="bg-secondary"
          disabledKeys={["badges"]}
          onAction={(key: string) => {
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
            <DropdownItem key="badges" className="flex mb-2">
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
            </DropdownItem>
          )}

          <DropdownItem icon={<HiHome size="20" />} key="home">
            Home
          </DropdownItem>
          <DropdownItem icon={<HiUser size="20" />} key="profile">
            Profile
          </DropdownItem>
          <DropdownItem key="settings" icon={<HiCog size="20" />}>
            Settings
          </DropdownItem>
          {(!user?.verified as Boolean) && (
            <DropdownItem
              icon={<HiBellAlert size="20" />}
              key="verified"
              color="warning"
              description="Resend verification link."
            >
              Not verified
            </DropdownItem>
          )}

          {(user?.moderator as Boolean) && (
            <DropdownSection title="Admin Zone">
              <DropdownItem
                key="admindashboard"
                icon={<HiDatabase size="20" />}
              >
                Dashboard
              </DropdownItem>
            </DropdownSection>
          )}
          <DropdownSection title="Danger Zone">
            <DropdownItem
              key="logout"
              color="danger"
              icon={<HiLogout size="20" />}
            >
              Logout
            </DropdownItem>
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default UserDropdown;
