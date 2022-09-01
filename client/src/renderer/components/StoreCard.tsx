import { MdMoreHoriz } from 'react-icons/md';

interface StoreCardPropsTypes {
  name: string;
  description: string;
  tags: string[];
  logo: string;
}

function StoreCard({ name, description, tags, logo }: StoreCardPropsTypes) {
  const onDownload = () => {
    window.electron.gamesApi.downloadGame(name);
  };
  const onUninstall = () => {
    window.electron.gamesApi.uninstallGame(name);
  };

  return (
    <section>
      <div className="card w-fit bg-base-100 bg-opacity-40 backdrop-blur-md shadow-xl mt-5">
        <div className="card-body">
          <div>
            {' '}
            {/* idk why but empty div is needed. */}
            <div className="avatar">
              <div className="w-24 rounded-full">
                <img src={logo} />
              </div>
              <h2 className="card-title ml-1">
                {name}
                <div className="flex flex-row flex-wrap">
                  {tags.map((tag) => {
                    return <div className="badge badge-outline">{tag}</div>;
                  })}
                </div>
              </h2>
            </div>
          </div>
          <p>{description}</p>
        </div>
        <div className="card-actions justify-end">
          <div className="dropdown dropdown-top mt-4 mr-96">
            <label tabIndex={0} className="btn m-1 bg-opacity-10 backdrop-blur-sm">
              <MdMoreHoriz />
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <button onClick={onUninstall}>Uninstall</button>
              </li>
              <li>
                <button>Update</button>
              </li>
            </ul>
          </div>
          <button className="btn btn-success m-5" onClick={onDownload}>
            Download
          </button>
        </div>
      </div>
    </section>
  );
}

export default StoreCard;
