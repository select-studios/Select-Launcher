// import { Card } from 'primereact/card';
// import { Chip } from 'primereact/chip';
// import { Avatar } from 'primereact/avatar';
// import { Button } from 'primereact/button';
// import '../styles/Storecard.css';

interface StoreCardPropsTypes {
  name: string;
  description: string;
  tags: string[];
  logo: string;
}

function StoreCard({ name, description, tags, logo }: StoreCardPropsTypes) {
  // const header = (
  //   <div className="flex flex-row -mb-4">
  //     <Avatar image={logo} shape="circle" size="xlarge" className="ml-2 mt-2" />
  //     <div className="flex flex-column">
  //       <h1 className="text-2xl ml-3 mt-3">{name}</h1>
  //       <span>
  //         {tags.map((tag, id) => {
  //           return (
  //             <Chip
  //               // eslint-disable-next-line react/no-array-index-key
  //               key={id}
  //               label={tag}
  //               className="mr-2 mb-2"
  //               style={{
  //                 backgroundColor: 'rgba(11, 33, 63, 0.4)',
  //                 backdropFilter: 'blur(24px)',
  //               }}
  //             />
  //           );
  //         })}
  //       </span>
  //     </div>
  //   </div>
  // );

  return (
    <div>
      {/* <Card header={header} className="store-card">
        <p className="m-0" style={{ lineHeight: '1.5' }}>
          {description}
        </p>
      <Button className="p-button-success mt-3">Get Now!</Button>
      </Card> */}
      <h1>Hello!</h1>
    </div>
  );
}

export default StoreCard;
