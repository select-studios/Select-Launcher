import { Card } from 'primereact/card';
import { Chip } from 'primereact/chip';
import Sidebar from '../components/Sidebar';
import AceRaceLogo from '../../../assets/AceRace.png';

function Store() {
  const header = (
    <img
      alt="Card"
      src={AceRaceLogo}
      height={256}
      width={256}
      className="border-round-top"
    />
  );
  const footer = (
    <span>
      <Chip label="Platformer" className="mr-2 mb-2" />
      <Chip label="Movement" className="mr-2 mb-2" />
      <Chip label="Grapple" className="mr-2 mb-2" />
    </span>
  );

  return (
    <div>
      <h1 className="flex align-items-center justify-content-center">
        Welcome to the Store
      </h1>
      <Sidebar />
      <Card
        title="Ace Race"
        style={{ width: '22em', marginLeft: '20rem' }}
        footer={footer}
        header={header}
      >
        <p className="m-0" style={{ lineHeight: '1.5' }}>
          fast pace action experience. an experience that is hand picked to be
          enjoyed by players. Movement designed to immerse you in the experience
          of AceRace
        </p>
      </Card>
    </div>
  );
}

export default Store;
