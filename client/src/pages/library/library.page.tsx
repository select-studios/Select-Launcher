import { AppBar, Sidebar } from "@/components";
import { UserStore } from "@/stores/UserStore";
import { Chip, ScrollShadow } from "@nextui-org/react";
import { observer } from "mobx-react";
import { LibraryGames } from "./components/games.library";
import "./library.styles.css";
import { GamesStore } from "@/stores/GamesStore";
import { useEffect } from "react";
import retrieveGameInfo from "@/handlers/api";
import { SearchStore } from "@/stores/SearchStore";
import { FaSearch } from "react-icons/fa";

const libraryComp = () => {
  useEffect(() => {
    retrieveGameInfo(GamesStore);
  }, []);

  return (
    <main>
      <div className="library">
        <div className="library__content h-screen overflow-scroll">
          <Sidebar active="library" />
          <ScrollShadow isEnabled className="library__main">
            <AppBar
              searchType="library"
              pageName="Library"
              dashboard={true}
              user={UserStore.user!}
            />
            <h1 className="flex items-center text-lg font-heading my-6">
              YOUR GAMES{" "}
              {SearchStore.search.query.length &&
              SearchStore.search.type == "library" ? (
                <Chip
                  className="font-sans font-normal ml-5"
                  startContent={<FaSearch />}
                >
                  {SearchStore.search.query}
                </Chip>
              ) : (
                ""
              )}
            </h1>
            <LibraryGames
              purchasedGames={UserStore.user?.purchasedGames || []}
              games={GamesStore.games}
            />
          </ScrollShadow>
        </div>
      </div>
    </main>
  );
};

export const Library = observer(libraryComp);
