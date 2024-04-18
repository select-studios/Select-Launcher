import { logout } from "@/handlers/api";
import { SidebarStore } from "@/stores/SidebarStore";
import { ThemeStore } from "@/stores/ThemeStore";
import { Button } from "@nextui-org/react";
import React, { FC } from "react";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router";

interface IProps {
  setLoading: any;
  loading: boolean;
}

/**
 * @author
 * @function @SidebarSignout
 **/

export const SidebarSignout: FC<IProps> = ({ loading, setLoading }) => {
  const navigate = useNavigate();

  const signoutClient = () => {
    setLoading(true);
    ThemeStore.setTheme("dark");
    const storedRfToken = localStorage.getItem("refreshToken");
    if (storedRfToken && storedRfToken.length) {
      const refreshToken = JSON.parse(storedRfToken).refreshToken;
      logout(refreshToken, navigate, setLoading);
    }
  };

  return (
    <Button
      fullWidth
      variant="ghost"
      color="danger"
      onPress={signoutClient}
      size="lg"
      isLoading={loading}
      className="mx-auto"
      isIconOnly={!SidebarStore.open}
      startContent={!loading && <FiLogOut size={20} />}
    >
      {SidebarStore.open && "Sign out"}
    </Button>
  );
};
