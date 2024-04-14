import {
  Avatar,
  Button,
  Card,
  CardBody,
  Dropdown,
  Image,
} from "@nextui-org/react";
import { useNavigate } from "react-router";
import { UserStore } from "@/stores/UserStore";
import { FiHome, FiLogOut, FiSettings } from "react-icons/fi";
import { BsArrowBarLeft } from "react-icons/bs";
import { Link } from "react-router-dom";
import { SelectLauncherImage } from "../images/selectlauncher.component";
import { logout } from "@/handlers/api";
import { useState } from "react";
import { settingsSidebarLinks, sidebarLinks } from "./sidebarLinks";
import { motion } from "framer-motion";
import AccountLogo from "../../../../Resources/ICON_User.png";
import { SidebarStore } from "@/stores/SidebarStore";
import { observer } from "mobx-react";
import { FaCircle, FaHammer } from "react-icons/fa6";
import { GrAnalytics } from "react-icons/gr";
import { BiCircle, BiHome, BiSolidDashboard } from "react-icons/bi";
import { ThemeStore } from "@/stores/ThemeStore";

interface SidebarProps {
  active: string;
  settings?: boolean;
}

const sidebarVariants = {
  sidebarOpen: {
    width: "250px",
    transition: {
      when: "beforeChildren",
    },
  },

  sidebarClosed: {
    width: "100px",
  },
};

export const Sidebar: React.FC<SidebarProps> = ({ active, settings }) => {
  const navigate = useNavigate();

  const { user } = UserStore;

  const [loading, setLoading] = useState(false);

  const logoutClient = () => {
    setLoading(true);
    ThemeStore.setTheme("dark");
    const storedRfToken = localStorage.getItem("refreshToken");
    if (storedRfToken && storedRfToken.length) {
      const refreshToken = JSON.parse(storedRfToken).refreshToken;
      logout(refreshToken, navigate, setLoading);
    }
  };

  return (
    <div className="bottom-0 sticky top-0 left-0 max-h-screen">
      <motion.div
        variants={sidebarVariants}
        initial={false}
        animate={SidebarStore.open ? "sidebarOpen" : "sidebarClosed"}
        className={
          SidebarStore.open
            ? "bg-content1 mr-10 rounded-tr-xl h-full rounded-br-xl"
            : "bg-content1 mr-10 rounded-tr-xl h-full rounded-br-xl"
        }
      >
        <div className="h-[85vh] p-5">
          <div className="h-full">
            <div
              className={`grid justify-center mb-12 ${
                !SidebarStore.open && "w-12 mx-auto"
              }`}
            >
              <SelectLauncherImage />
            </div>
            <div className="">
              {!settings ? (
                <div className={SidebarStore.open ? "" : "grid"}>
                  {sidebarLinks
                    .filter((link) => !link.moderatorOnly)
                    .map((link, i) => (
                      <Button
                        onPress={() => navigate(link.href)}
                        isDisabled={link.disabled}
                        className={"mb-6 mx-auto"}
                        startContent={link.icon}
                        isIconOnly={!SidebarStore.open}
                        key={i}
                        variant={
                          active.toLowerCase() === link.name.toLowerCase()
                            ? "solid"
                            : "ghost"
                        }
                        size="lg"
                        fullWidth
                      >
                        {SidebarStore.open && link.name}
                      </Button>
                    ))}
                  {user?.moderator && (
                    <Button
                      onPress={() => navigate("/moderator/dashboard")}
                      className={"mb-6 mx-auto"}
                      startContent={<BiSolidDashboard size={20} />}
                      color="warning"
                      isIconOnly={!SidebarStore.open}
                      variant={
                        active.toLowerCase() === "moderation" ? "flat" : "flat"
                      }
                      size="lg"
                      fullWidth
                    >
                      {SidebarStore.open && "Moderation"}
                    </Button>
                  )}
                </div>
              ) : (
                <div className="mx-auto">
                  {settingsSidebarLinks.map((link, i) => (
                    <div>
                      <Button
                        fullWidth
                        onClick={() => navigate(link.href)}
                        isDisabled={link.disabled}
                        className="mb-6"
                        variant="bordered"
                        startContent={link.icon}
                        key={i}
                        size="lg"
                      >
                        {link.name}
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="grid justify-center">
              <Button
                onPress={logoutClient}
                startContent={!loading && <FiLogOut size={20} />}
                color="danger"
                className={SidebarStore.open ? "mt-auto w-52" : "mt-auto mb-10"}
                size="lg"
                isIconOnly={!SidebarStore.open}
                isLoading={loading}
              >
                {SidebarStore.open && "Sign out"}
              </Button>
            </div>
          </div>

          <div
            className="mt-auto"
            onClick={() => navigate("/settings/account")}
          >
            <div className=" transition-all ease-in-out duration-300">
              <Card className="shadow-none mb-10 border-2 border-content2">
                <CardBody>
                  <div className="flex items-center justify-center overflow-hidden">
                    <Avatar
                      src={user?.pfp}
                      alt="Account Logo"
                      className={
                        SidebarStore.open
                          ? "w-12 h-12 rounded-xl"
                          : "w-8 h-8 rounded-xl"
                      }
                    />

                    {SidebarStore.open && (
                      <div className="ml-5">
                        <p className="text-base font-heading">
                          {user?.username.slice(0, 8) + "..."}
                        </p>
                        <p className="text-xs mt-auto font-medium text-success flex items-center">
                          <FaCircle className="mr-1" size={8} /> Online
                        </p>
                      </div>
                    )}
                  </div>
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export const SidebarObserver = observer(Sidebar);
