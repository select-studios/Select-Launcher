import { SidebarStore } from "@/stores/SidebarStore";
import { Button, Tooltip } from "@nextui-org/react";
import React, { FC } from "react";
import { FiArrowLeft, FiMenu } from "react-icons/fi";
import { Link } from "react-router-dom";
import { SearchInput } from "../search/search-input.component";
import { observer } from "mobx-react";

interface IProps {
  isSettings: boolean;
  pageName: string;
  searchBarVisible: boolean;
}

/**
 * @author
 * @function @AppbarStart
 **/

const AppbarStartComp: FC<IProps> = ({
  isSettings,
  pageName,
  searchBarVisible,
}) => {
  const { open } = SidebarStore;

  return (
    <nav className="flex items-center text-base mr-auto">
      {isSettings ? (
        <Link to="/store">
          <Button className="mr-5" startContent={<FiArrowLeft size={20} />}>
            Back
          </Button>
        </Link>
      ) : (
        <Tooltip
          placement="bottom"
          content={open ? "Close Sidebar" : "Open Sidebar"}
        >
          <Button
            onPress={() => SidebarStore.setOpen(!open)}
            className="mr-5"
            isIconOnly
            color={open ? "primary" : "default"}
          >
            {<FiMenu size={24} />}
          </Button>
        </Tooltip>
      )}
      <p className="font-heading text-2xl uppercase mr-10">{pageName}</p>
      {searchBarVisible && <SearchInput searchType="game" />}
    </nav>
  );
};

export const AppbarStart = observer(AppbarStartComp);
