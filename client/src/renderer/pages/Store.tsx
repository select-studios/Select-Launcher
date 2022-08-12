import { useEffect, useState } from 'react';
// import StoreCard from '../components/StoreCard';
import Sidebar from '../components/Sidebar';

function Store() {
  const [games, setGames] = useState<any[]>();

  useEffect(() => {
    async function FetchGames() {
      const gameData = await window.electron.gamesApi.getFetchedGames();
      setGames(gameData);
    }
    FetchGames();
  });

  return (
    <div>
    <Sidebar />
{/*      <h1 className="ml-5">Store Page!</h1>*/}
    </div>
  );
}

export default Store;
