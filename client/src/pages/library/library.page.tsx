import { AppBar, Sidebar } from "@/components";
import { UserStore } from "@/stores/UserStore";
import { ScrollShadow } from "@nextui-org/react";
import { observer } from "mobx-react";
import { LibraryGames } from "./components/games.library";
import "./library.styles.css";
import { GamesStore } from "@/stores/GamesStore";

const libraryComp = () => {
  return (
    <main>
      <div className="library">
        <div className="library__content">
          <Sidebar active="library"></Sidebar>
          <ScrollShadow isEnabled className="library__main">
            <AppBar
              pageName="Library"
              dashboard={true}
              user={UserStore.user!}
            />
            <h1 className="opacity-60 font-bold my-6">Your games</h1>
            <LibraryGames
              purchasedGames={UserStore.user?.purchasedGames}
              games={GamesStore.games}
            />
          </ScrollShadow>
        </div>
      </div>
    </main>
  );
};

export const Library = observer(libraryComp);
