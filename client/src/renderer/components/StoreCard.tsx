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
    <div>
      <div className="card w-fit bg-base-100 bg-opacity-40 backdrop-blur-md shadow-xl mt-5 transition-all hover:shadow-2xl hover:scale-105">
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
          <button className="btn btn-success m-5" onClick={onDownload}>
            Download
          </button>
          <button className="btn btn-error m-5" onClick={onUninstall}>
            Uninstall
          </button>
        </div>
      </div>
    </div>
  );
}

export default StoreCard;
