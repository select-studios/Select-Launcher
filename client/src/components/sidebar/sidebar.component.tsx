import { Button } from "@nextui-org/react";
import { HiDatabase, HiHome, HiMenuAlt1 } from "react-icons/hi";
import { BiLibrary } from "react-icons/bi";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { SidebarStore } from "@/stores/SidebarStore";
import { observer } from "mobx-react";
import { UserStore } from "@/stores/UserStore";
import { FiMonitor } from "react-icons/fi";
import { BsArrowBarLeft } from "react-icons/bs";
import { Link } from "react-router-dom";

interface SidebarProps {
  active: string;
  settings?: boolean;
}

interface SidebarLink {
  name: string;
  href: string;
  icon: JSX.Element;
  disabled: boolean;
}

const sidebarVariants = {
  sidebarOpen: {
    width: "300px",
    transition: {
      when: "beforeChildren",
    },
  },

  sidebarClosed: {
    width: "",
  },
};

const SidebarComp: React.FC<SidebarProps> = ({ active, settings }) => {
  const navigate = useNavigate();

  const iconSize = SidebarStore.isOpen ? "20" : "25";

  const { user } = UserStore;

  const sidebarLinks: SidebarLink[] = [
    {
      name: "Home",
      href: "/home",
      icon: <HiHome size={iconSize} />,
      disabled: false,
    },
    {
      name: "Library",
      href: "/library",
      icon: <BiLibrary size={iconSize} />,
      disabled: true,
    },
  ];

  const adminSidebarLinks: SidebarLink[] = [
    {
      name: "Dashboard",
      icon: <HiDatabase size={iconSize} />,
      disabled: false,
      href: "/admin/dashboard",
    },
  ];

  const settingsSidebarLinks: SidebarLink[] = [
    {
      name: "App",
      icon: <FiMonitor size="25" />,
      disabled: false,
      href: "/settings/app",
    },
  ];

  return (
    <motion.div
      variants={sidebarVariants}
      initial={false}
      animate={SidebarStore.isOpen ? "sidebarOpen" : "sidebarClosed"}
    >
      <div className="bg-secondaryBG h-screen rounded-tr-xl rounded-br-xl">
        <div className="flex flex-col flex-1 p-5">
          <div>
            <Button
              size="lg"
              color={SidebarStore.isOpen ? "primary" : "default"}
              className="w-auto"
              onClick={() => (SidebarStore.isOpen = !SidebarStore.isOpen)}
            >
              <HiMenuAlt1 size="25" className="font-bold" />
            </Button>
          </div>
          <div className="grid space-y-10 justify-center mt-5">
            {!settings ? (
              <div>
                {sidebarLinks.map((link, i) => (
                  <>
                    <Button
                      onPress={() => navigate(link.href)}
                      isDisabled={link.disabled}
                      className={"mb-2 "}
                      startContent={link.icon}
                      key={i}
                      size="lg"
                    >
                      {SidebarStore.isOpen && link.name}
                    </Button>
                  </>
                ))}
                {user?.moderator && (
                  <div className="admin-zone">
                    <div className="mt-5 opacity-50 uppercase font-bold text-sm">
                      Administrator
                    </div>
                    {adminSidebarLinks.map((link, i) => (
                      <Button
                        onClick={() => navigate(link.href)}
                        disabled={link.disabled}
                        className={
                          `bg-tertiaryBG mt-2 ${
                            link.name.toLowerCase() == active
                              ? "border-l-4 border-y-0 border-r-0 rounded-l-sm border-solid border-primary-base"
                              : ""
                          }` + !SidebarStore.isOpen
                            ? "w-auto"
                            : ""
                        }
                        // css={{
                        //   borderLeftWidth:
                        //     link.name.toLowerCase() == active ? "2px" : "",
                        //   borderTopWidth:
                        //     link.name.toLowerCase() == active ? "0px" : "",
                        //   borderBottomWidth:
                        //     link.name.toLowerCase() == active ? "0px" : "",
                        //   borderRightWidth:
                        //     link.name.toLowerCase() == active ? "0px" : "",
                        //   borderTopLeftRadius:
                        //     link.name.toLowerCase() == active ? "0.125rem" : "",
                        //   borderBottomLeftRadius:
                        //     link.name.toLowerCase() == active ? "0.125rem" : "",
                        //   border:
                        //     link.name.toLowerCase() == active ? "solid" : "",
                        //   borderColor:
                        //     link.name.toLowerCase() == active ? "#9980FA" : "",
                        //   borderTopStyle: "none",
                        //   borderBottomStyle: "none",
                        //   borderRightStyle: "none",
                        // }}
                        startContent={link.icon}
                        key={i}
                        size="lg"
                      >
                        {SidebarStore.isOpen && link.name}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div>
                {settingsSidebarLinks.map((link, i) => (
                  <div>
                    <Link to="/settings">
                      <Button
                        className="bg-tertiaryBG mb-10 w-auto"
                        startContent={<BsArrowBarLeft size="25" />}
                      >
                        {SidebarStore.isOpen ? "Back" : " "}
                      </Button>
                    </Link>

                    <Button
                      onClick={() => navigate(link.href)}
                      disabled={link.disabled}
                      className={
                        `bg-tertiaryBG mt-2 ${
                          link.name.toLowerCase() == active
                            ? "border-l-4 border-y-0 border-r-0 rounded-l-sm border-solid border-primary-base"
                            : ""
                        }` + !SidebarStore.isOpen
                          ? "w-auto"
                          : ""
                      }
                      // css={{
                      //   borderLeftWidth:
                      //     link.name.toLowerCase() == active ? "2px" : "",
                      //   borderTopWidth:
                      //     link.name.toLowerCase() == active ? "0px" : "",
                      //   borderBottomWidth:
                      //     link.name.toLowerCase() == active ? "0px" : "",
                      //   borderRightWidth:
                      //     link.name.toLowerCase() == active ? "0px" : "",
                      //   borderTopLeftRadius:
                      //     link.name.toLowerCase() == active ? "0.125rem" : "",
                      //   borderBottomLeftRadius:
                      //     link.name.toLowerCase() == active ? "0.125rem" : "",
                      //   border:
                      //     link.name.toLowerCase() == active ? "solid" : "",
                      //   borderColor:
                      //     link.name.toLowerCase() == active ? "#9980FA" : "",
                      //   borderTopStyle: "none",
                      //   borderBottomStyle: "none",
                      //   borderRightStyle: "none",
                      // }}
                      startContent={link.icon}
                      key={i}
                      size="lg"
                    >
                      {SidebarStore.isOpen && link.name}
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const Sidebar = observer(SidebarComp);
