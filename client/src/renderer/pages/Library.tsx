import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import { LibraryItem } from '../interfaces/Library';

function Library() {
  const [games, setGames] = useState<LibraryItem[]>();

  useEffect(() => {
    setGames(window.electron.gamesApi.getLibrary());
  }, []);

  // NOTE Sweet Spot for Sidebar adjustment is m-24
  return (
    <div>
      <Sidebar />
      <ul className="ml-24">
        {games?.map((Game) => {
          return <li>{Game.name}</li>;
        })}
      </ul>
    </div>
  );
}

export default Library;
