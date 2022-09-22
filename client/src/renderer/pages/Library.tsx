import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import { LibraryItem } from '../interfaces/Library';
import PageTitle from '../components/PageTitle';
import LibraryCard from '../components/LibraryCard';

function Library() {
  const [games, setGames] = useState<LibraryItem[]>();

  useEffect(() => {
    setGames(window.electron.gamesApi.getLibrary());
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
        {games?.map((game) => {
          return (
            <LibraryCard
              name={game.name}
              description={game.description}
              logo={`${game.logo}`}
              tags={game.tags}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Library;
