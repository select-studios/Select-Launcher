import { Button, Card, CardBody, Image } from "@nextui-org/react";
import { useNavigate } from "react-router";
import { UserStore } from "@/stores/UserStore";
import { FiHome, FiLogOut, FiSettings } from "react-icons/fi";
import { BsArrowBarLeft } from "react-icons/bs";
import { Link } from "react-router-dom";
import { SelectLauncherImage } from "../images/selectlauncher.component";
import { logout } from "@/handlers/api";
import { useState } from "react";
import { settingsSidebarLinks, sidebarLinks } from "./sidebarLinks";

import AccountLogo from "../../../../Resources/ICON_User.png";

interface SidebarProps {
  active: string;
  settings?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ active, settings }) => {
  const navigate = useNavigate();

  const { user } = UserStore;

  const [loading, setLoading] = useState(false);

  const logoutClient = () => {
    setLoading(true);
    const storedRfToken = localStorage.getItem("refreshToken");
    if (storedRfToken && storedRfToken.length) {
      const refreshToken = JSON.parse(storedRfToken).refreshToken;
      logout(refreshToken, navigate, setLoading);
    }
  };

  return (
    <div className="sticky flex left-0 mt-0 top-0 h-screen">
      <div className="bg-secondaryBG mr-10 rounded-tr-xl w-[250px] rounded-br-xl">
        <div className="p-5">
          <div className="mt-5">
            <div className="grid justify-center mb-12">
              <SelectLauncherImage />
            </div>
            <div>
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
                          variant={
                            active.toLowerCase() === link.name.toLowerCase()
                              ? "solid"
                              : "ghost"
                          }
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
                            variant={
                              active.toLowerCase() === link.name.toLowerCase()
                                ? "solid"
                                : "ghost"
                            }
                            size="lg"
                            fullWidth
                          >
                            {link.name}
                          </Button>
                        </>
                      ))}
                </div>
              ) : (
                <div className="mx-auto">
                  <Card className="mb-10 shadow-none bg-tertiaryBG">
                    <CardBody>
                      <div className="flex items-center overflow-hidden">
                        <Image
                          className="w-12 h-12"
                          src={AccountLogo}
                          alt="Account Logo"
                        />

                        <div className="ml-2">
                          <p className="text-[14px] font-heading">
                            {user?.username}
                          </p>
                          <p className="text-[8px]">{user?.email}</p>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                  {settingsSidebarLinks.map((link, i) => (
                    <div>
                      <Button
                        fullWidth
                        onClick={() => navigate(link.href)}
                        isDisabled={link.disabled}
                        className="mb-6"
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

            <div className="mt-auto">
              <Button
                onPress={logoutClient}
                startContent={!loading && <FiLogOut size={20} />}
                color="danger"
                variant="flat"
                size="lg"
                fullWidth
                isLoading={loading}
              >
                Sign out
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
