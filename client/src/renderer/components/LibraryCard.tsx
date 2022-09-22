/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import { useNavigate } from 'react-router-dom';

interface LibraryCardPropTypes {
  name: string;
  description: string;
  tags: string[];
  logo: string;
}

function LibraryCard({ name, description, tags, logo }: LibraryCardPropTypes) {
  const navigate = useNavigate();

  const onUninstall = () => {
    window.electron.gamesApi.uninstallGame(name);
  };

  return (
    <section style={{ width: '32rem', marginTop: '6rem' }}>
      <div className="card bg-base-100 bg-opacity-40 backdrop-blur-md shadow-xl mt-5">
        <div className="card-body">
          <div>
            {' '}
            {/* idk why but empty div is needed. */}
            <div className="avatar">
              <div className="w-24 rounded-full">
                <img src={logo} alt="Game Logo" />
              </div>
              <h2 className="card-title ml-1">
                {name}
                <div className="flex flex-row flex-wrap">
                  {tags.map((tag) => {
                    return (
                      <div className="badge badge-outline ml-1">{tag}</div>
                    );
                  })}
                </div>
              </h2>
            </div>
          </div>
          <p>{description}</p>
        </div>
        <div className="card-actions justify-end">
          <button
            type="button"
            className="btn gap-2 m-5 mr-auto"
            onClick={() => {
              navigate('/store', { replace: true });
            }}
          >
            Go to store
            <div className="badge badge-secondary">Owned</div>
          </button>
          <button type="button" className="btn btn-info m-5">
            Update
          </button>
          <button
            onClick={onUninstall}
            type="button"
            className="btn btn-error m-5"
          >
            Uninstall
          </button>
        </div>
      </div>
    </section>
  );
}

export default LibraryCard;
