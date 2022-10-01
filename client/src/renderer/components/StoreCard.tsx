/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import { useNavigate } from 'react-router-dom';
import '../styles/Card.css';

interface StoreCardPropsTypes {
  name: string;
  description: string;
  tags: string[];
  logo: string;
  owned: boolean | undefined;
}

function StoreCard({
  name,
  description,
  tags,
  logo,
  owned,
}: StoreCardPropsTypes) {
  const navigate = useNavigate();

  const onDownload = () => {
    window.electron.gamesApi.downloadGame(name);
  };

  return (
    <section style={{ width: '32rem', marginTop: '6rem' }}>
      <div className="card bg-base-100 bg-opacity-70 backdrop-blur-md shadow-xl mt-5">
        <div className="card-body">
          <div>
            {' '}
            {/* idk why but empty div is needed. */}
            {/* No clue LMFAO */}
            <div className="avatar">
              <div className="w-24 rounded-full">
                <img src={logo} alt="Game Logo" />
              </div>
              <h2 className="card-title ml-1">
                {name}
                <div className="flex flex-row flex-wrap">
                  {tags.map((tag) => {
                    return <div className="badge badge-outline m-1">{tag}</div>;
                  })}
                </div>
              </h2>
            </div>
          </div>
          <p className="card-description">{description}</p>
        </div>
        <div className="card-actions justify-end">
          {owned ? (
            <button
              type="button"
              className="btn gap-2 m-5 mr-right"
              onClick={() => {
                navigate('/library', { replace: true });
              }}
            >
              Go to library
              <div className="badge badge-secondary">Owned</div>
            </button>
          ) : (
            <></>
          )}

          {owned ? (
            <button> </button>
          ) : (
            <button
              onClick={onDownload}
              type="button"
              className="btn btn-success m-5"
            >
              Download
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

export default StoreCard;
