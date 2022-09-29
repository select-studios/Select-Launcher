import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import { LibraryItem } from '../interfaces/Library';
import PageTitle from '../components/PageTitle';
import LibraryCard from '../components/LibraryCard';

function Library() {
  const [games, setGames] = useState<LibraryItem[]>();

  useEffect(() => {
    async function setLibraryGames() {
      const libraryGameData = await window.electron.gamesApi.getLibrary();
      setGames(libraryGameData);
    }
    setLibraryGames();
  }, []);

  // NOTE Sweet Spot for Sidebar adjustment is m-24
  return (
    <div>
      <Sidebar />
      <PageTitle pageTitle="Library" />
      <div
        style={{
          marginLeft: '6rem',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr 1fr',
          gridGap: '30px',
          alignItems: 'start',
        }}
      >
        {games?.length <= 0 ? (
          <h1
            className="prose prose-slate font-extrabold text-4xl ml-8 mt-28 w-full"
            style={{ fontSize: '52px', whiteSpace: 'nowrap' }}
          >
            You have no games! Head over to the store to check some out!
          </h1>
        ) : (
          games?.map((game) => {
            return (
              <LibraryCard
                name={game.name}
                description={game.description}
                logo={`${game.logo}`}
                tags={game.tags}
              />
            );
          })
        )}
      </div>
    </div>
  );
}

export default Library;
