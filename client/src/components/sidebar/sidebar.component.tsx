import { Button } from "@nextui-org/react";
import { HiDatabase, HiHome, HiMenuAlt1, HiShoppingCart } from "react-icons/hi";
import { BiLibrary, BiStore } from "react-icons/bi";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { SidebarStore } from "@/stores/SidebarStore";
import { observer } from "mobx-react";
import { UserStore } from "@/stores/UserStore";
import { FiCompass, FiMonitor } from "react-icons/fi";
import { BsArrowBarLeft, BsHammer } from "react-icons/bs";
import { Link } from "react-router-dom";
import { SelectLauncherImage } from "../images/selectlauncher.component";

interface SidebarProps {
  active: string;
  settings?: boolean;
}

interface SidebarLink {
  name: string;
  href: string;
  icon: JSX.Element;
  disabled: boolean;
  moderatorOnly?: boolean;
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
      name: "Store",
      href: "/home",
      icon: <FiCompass size={iconSize} />,
      disabled: false,
    },
    {
      name: "Library",
      href: "/library",
      icon: <BiLibrary size={iconSize} />,
      disabled: true,
    },
    {
      name: "Moderation",
      href: "/admin/dashboard",
      icon: <HiDatabase size={iconSize} />,
      disabled: false,
      moderatorOnly: true,
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
      <div className="bg-secondaryBG mt-5 h-screen rounded-tr-xl w-[250px] rounded-br-xl">
        <div className="p-5">
          <div className="grid space-y-10 justify-center mt-5">
            <div className="mx-auto">
              <SelectLauncherImage />
            </div>
            {!settings ? (
              <div>
                {sidebarLinks
                  .filter((link) => !link.moderatorOnly)
                  .map((link, i) => (
                    <>
                      <Button
                        onPress={() => navigate(link.href)}
                        isDisabled={link.disabled}
                        className={"mb-6 "}
                        startContent={link.icon}
                        key={i}
                        size="lg"
                        fullWidth
                      >
                        {link.name}
                      </Button>
                    </>
                  ))}
                {user?.moderator &&
                  sidebarLinks
                    .filter((link) => link.moderatorOnly)
                    .map((link, i) => (
                      <>
                        <Button
                          onPress={() => navigate(link.href)}
                          isDisabled={link.disabled}
                          className={"mb-6 "}
                          startContent={link.icon}
                          key={i}
                          size="lg"
                          fullWidth
                        >
                          {link.name}
                        </Button>
                      </>
                    ))}
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
