import { SidebarStore } from "@/stores/SidebarStore";
import { BaseColors, Button, ThemeColors } from "@nextui-org/react";
import React, { FC } from "react";
import { useNavigate } from "react-router";

interface Link {
  href: string;
  i: number;
  disabled: boolean;
  icon: JSX.Element;
  name: string;
}

interface IProps {
  link: Link;
  active: string;
  color?: "default" | "primary" | "warning" | "danger" | "success";
  disableHref?: boolean;
}

/**
 * @author
 * @function @SidebarLink
 **/

export const SidebarLink: FC<IProps> = ({
  link,
  active,
  color,
  disableHref,
}) => {
  const navigate = useNavigate();

  return (
    <Button
      onPress={!disableHref ? () => navigate(link.href) : () => {}}
      isDisabled={link.disabled}
      className={"mb-6 mx-auto"}
      startContent={link.icon}
      isIconOnly={!SidebarStore.open}
      color={color || "default"}
      key={link.i}
      variant={
        active.toLowerCase() === link.name.toLowerCase() ? "solid" : "ghost"
      }
      size="lg"
      fullWidth
    >
      {SidebarStore.open && link.name}
    </Button>
  );
};
