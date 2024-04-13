import { logout, sendVerificationLink } from "@/handlers/api";
import {
  Avatar,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
  Image,
  Chip,
  Button,
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
import { Key, useState } from "react";
import { BsFilePerson } from "react-icons/bs";
import { BiUser, BiUserCheck, BiUserCircle } from "react-icons/bi";

interface UserDropdownProps {
  user: {
    username: string;
    verified: boolean;
    accessToken: string | null | number;
    moderator?: boolean;
    pfp?: string;
  };
}

const UserDropdown: React.FC<UserDropdownProps> = ({ user }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  return (
    <div>
      <Dropdown placement="bottom-end" size="lg">
        <DropdownTrigger>
          <Button isIconOnly>
            <BiUserCircle size={24} />
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          disabledKeys={["badges"]}
          onAction={(key: Key) => {
            if (key == "logout") {
              const storedRfToken = localStorage.getItem("refreshToken");
              if (storedRfToken && storedRfToken.length) {
                const refreshToken = JSON.parse(storedRfToken).refreshToken;
                logout(refreshToken, navigate, setLoading);
              }
            } else if (key.toString() == "profile") {
              navigate("/settings/account");
            } else if (key.toString() == "home") {
              navigate("/");
            } else if (key.toString() == "settings") {
              navigate("/settings");
            } else if (key.toString() == "admindashboard") {
              navigate("/moderator/dashboard");
            }
          }}
        >
          {(user?.verified || (user?.moderator as any)) && (
            <DropdownItem key="badges" className="flex mb-2">
              {user?.verified && (
                <Chip
                  startContent={<HiCheck size={16} />}
                  color="success"
                  className="mr-2 bg-opacity-100"
                  variant="flat"
                >
                  Verified
                </Chip>
              )}
              {user?.moderator && (
                <Chip
                  color="warning"
                  startContent={<HiUserPlus size={16} />}
                  variant="flat"
                >
                  Moderator
                </Chip>
              )}
            </DropdownItem>
          )}

          <DropdownSection showDivider={false}>
            <DropdownItem startContent={<HiHome size="20" />} key="home">
              Home
            </DropdownItem>
            <DropdownItem startContent={<HiUser size="20" />} key="profile">
              Profile
            </DropdownItem>
            <DropdownItem key="settings" startContent={<HiCog size="20" />}>
              Settings
            </DropdownItem>
          </DropdownSection>

          {(user?.moderator as Boolean) && (
            <DropdownSection title="Moderator">
              <DropdownItem
                key="admindashboard"
                startContent={<HiDatabase size="20" />}
              >
                Dashboard
              </DropdownItem>
            </DropdownSection>
          )}

          <DropdownSection title="Danger">
            <DropdownItem
              key="logout"
              color="danger"
              className="text-danger"
              startContent={<HiLogout size="20" />}
            >
              Sign out
            </DropdownItem>
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default UserDropdown;
