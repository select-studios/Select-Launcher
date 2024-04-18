import UserDropdown from "../dropdowns/user/userdropdown.component";
import { getTokensCookie } from "@/utils/storage";
import { User, UserStore } from "@/stores/UserStore";
import { Badge, Button, Input, Tooltip } from "@nextui-org/react";
import { HiCog } from "react-icons/hi";
import { Link } from "react-router-dom";
import { FiArrowLeft, FiArrowRight, FiMenu } from "react-icons/fi";
import { SidebarStore } from "@/stores/SidebarStore";
import { observer } from "mobx-react";
import { SearchStore } from "@/stores/SearchStore";
import { HiBellAlert } from "react-icons/hi2";
import { sendVerificationLink } from "@/handlers/api";
import { useState } from "react";
import { SearchInput } from "../search/search-input.component";
import { VerificationBanner } from "./verification-banner.component";
import { AppbarStart } from "./appbar-start.component";
import { AppbarEnd } from "./appbar-end.component";

export interface AppBarProps {
  user?: User;
  dashboard?: boolean;
  pageName: string;
  settings?: boolean;
  searchType?: "game" | "library" | "settings";
  searchBarVisible?: boolean;
}

export const AppBar: React.FC<AppBarProps> = ({
  dashboard,
  user,
  pageName,
  settings,
  searchBarVisible = true,
  searchType,
}) => {
  const cookies = getTokensCookie();
  const [loading, setLoading] = useState(false);

  return (
    <>
      {user && !user?.verified && (
        <VerificationBanner
          loading={loading}
          setLoading={setLoading}
          user={user}
        />
      )}
      <header className="w-full flex items-center py-2 pt-0">
        <AppbarStart
          isSettings={settings || false}
          pageName={pageName}
          searchBarVisible={searchBarVisible}
        />
        {user && (
          <AppbarEnd
            cookies={cookies}
            dashboard={dashboard || true}
            user={user}
          />
        )}
      </header>
    </>
  );
};

export const AppBarObserver = observer(AppBar);
