import { useEffect, useState } from 'react';
// import Sidebar from '../components/Sidebar';
// import StoreCard from '../components/StoreCard';
// import '../styles/Store.css';

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
      {/* <Sidebar />
      <div
        style={{
          marginLeft: '17rem',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gridGap: '30px',
          alignItems: 'start',
        }}
      >
        {games?.map((game) => {
          return (
            <StoreCard
              name={game.name}
              description={game.description}
              tags={game.tags}
              logo={`${game.logo}`}
            />
          );
        })}
      </div> */}
      <h1>Hello!</h1>
    </div>
  );
}

export default Store;
