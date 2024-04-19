import {
  Avatar,
  Button,
  Card,
  CardBody,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Image,
  Tooltip,
} from "@nextui-org/react";
import { useNavigate } from "react-router";
import { UserStore } from "@/stores/UserStore";
import {
  FiChevronDown,
  FiChevronRight,
  FiCode,
  FiHome,
  FiLogOut,
  FiSettings,
} from "react-icons/fi";
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
import {
  BiCircle,
  BiHome,
  BiSolidDashboard,
  BiSolidWidget,
} from "react-icons/bi";
import { ThemeStore } from "@/stores/ThemeStore";
import { SidebarLink } from "./components/link.sidebar";
import { SidebarUser } from "./components/user.sidebar";
import { SidebarSignout } from "./components/signout.sidebar";

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

  return (
    <div className="bottom-0 sticky top-0 left-0 max-h-screen">
      <motion.div
        variants={sidebarVariants}
        initial={false}
        animate={SidebarStore.open ? "sidebarOpen" : "sidebarClosed"}
        className="bg-content1 backdrop-blur-lg mr-10 h-full rounded-br-xl"
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
            <div>
              {!settings ? (
                <div className={SidebarStore.open ? "" : "grid"}>
                  {sidebarLinks
                    .filter((link) => !link.moderatorOnly)
                    .map((link, i) => (
                      <Tooltip placement="right" content={link.name}>
                        <SidebarLink
                          key={i}
                          active={active}
                          link={{
                            i,
                            ...link,
                          }}
                        />
                      </Tooltip>
                    ))}
                  {user?.moderator &&
                    sidebarLinks
                      .filter((link) => link.moderatorOnly)
                      .map((link, i) =>
                        !link.nestedItems ? (
                          <SidebarLink
                            color="warning"
                            active={active}
                            link={{
                              i,
                              ...link,
                            }}
                          />
                        ) : (
                          <Dropdown placement="right">
                            <DropdownTrigger>
                              <Button
                                variant="bordered"
                                startContent={link.icon}
                                size="lg"
                                className="mx-auto mb-6"
                                endContent={
                                  SidebarStore.open && (
                                    <FiChevronRight size={20} />
                                  )
                                }
                                isIconOnly={!SidebarStore.open}
                                fullWidth
                              >
                                {SidebarStore.open ? link.name : ""}
                              </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                              onAction={(key) => navigate(key.toString())}
                              aria-label="Static Actions"
                            >
                              {link.nestedItems.map((item) => (
                                <DropdownItem
                                  startContent={item.icon}
                                  key={item.href}
                                >
                                  {item.name}
                                </DropdownItem>
                              ))}
                            </DropdownMenu>
                          </Dropdown>
                        )
                      )}
                </div>
              ) : (
                <div className="mx-auto">
                  {settingsSidebarLinks.map((link, i) => (
                    <div className="grid">
                      <SidebarLink link={{ i, ...link }} active={active} />
                    </div>
                  ))}
                </div>
              )}
              <div className="mx-auto grid">
                <SidebarLink
                  active={active}
                  color="success"
                  link={{
                    i: 0,
                    disabled: false,
                    href: "/developer",
                    icon: <FiCode size={20} />,
                    name: "Develop",
                  }}
                />
                <SidebarSignout loading={loading} setLoading={setLoading} />
              </div>
            </div>
          </div>
          <div className="mt-auto">{user && <SidebarUser user={user} />}</div>
        </div>
      </motion.div>
    </div>
  );
};

export const SidebarObserver = observer(Sidebar);
