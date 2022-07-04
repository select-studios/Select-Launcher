import { Card } from 'primereact/card';
import { Chip } from 'primereact/chip';
import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';
import Sidebar from '../components/Sidebar';
import AceRaceLogo from '../../../assets/AceRace.png';

function Store() {
  const header = (
    <div className="flex flex-row -mb-4">
      <Avatar
        image={AceRaceLogo}
        shape="circle"
        size="xlarge"
        className="ml-2 mt-2"
      />
      <div className="flex flex-column">
        <h1 className="text-2xl ml-3 mt-3">Ace Race</h1>
        <span>
          <Chip
            label="Platformer"
            className="mr-2 mb-2"
            style={{
              backgroundColor: 'rgba(11, 33, 63, 0.4)',
              backdropFilter: 'blur(24px)',
            }}
          />
          <Chip
            label="Movement"
            className="mr-2 mb-2"
            style={{
              backgroundColor: 'rgba(11, 33, 63, 0.4)',
              backdropFilter: 'blur(24px)',
            }}
          />
        </span>
      </div>
    </div>
  );

  return (
    <div>
      <Sidebar />
      <Card
        style={{
          width: '22em',
          marginLeft: '20rem',
          backgroundColor: 'rgba(7, 20, 38, 0.5)',
          backdropFilter: 'blur(24px)',
        }}
        header={header}
      >
        <p className="m-0" style={{ lineHeight: '1.5' }}>
          fast pace action experience. an experience that is hand picked to be
          enjoyed by players. Movement designed to immerse you in the experience
          of AceRace
        </p>
        <Button className="p-button-success mt-3">Get Now!</Button>
      </Card>
    </div>
  );
}

export default Store;
