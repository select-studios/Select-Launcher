import Sidebar from '../components/Sidebar';
import StoreCard from '../components/StoreCard';
import logo from '../../../assets/icons/128x128.png';
import './Store.css';

function Store() {
  return (
    <div>
      <Sidebar />
      <div
        style={{
          marginLeft: '17rem',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gridGap: '30px',
          alignItems: 'start',
        }}
      >
        <StoreCard
          name="AceRace"
          description="fast pace action experience. Movement designed to immerse you in experience of AceRace. Your objective is to reach the end of the game without
          dying once!"
          tags={['action', 'momentum', 'fast']}
          logo={logo}
        />
        <StoreCard
          name="Rosehill"
          description="coming soon!"
          tags={['indev']}
          logo={logo}
        />
        <StoreCard
          name="Rosehill"
          description="coming soon!"
          tags={['indev']}
          logo={logo}
        />
        <StoreCard
          name="Rosehill"
          description="coming soon!"
          tags={['indev']}
          logo={logo}
        />
        <StoreCard
          name="Rosehill"
          description="coming soon!"
          tags={['indev']}
          logo={logo}
        />
        <StoreCard
          name="Rosehill"
          description="coming soon!"
          tags={['indev']}
          logo={logo}
        />
      </div>
    </div>
  );
}

export default Store;
