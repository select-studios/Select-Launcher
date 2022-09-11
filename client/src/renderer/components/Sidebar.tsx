/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useNavigate, Link } from 'react-router-dom';
import { HiHome, HiOutlineLogout } from 'react-icons/hi';
import { AiOutlineAppstoreAdd } from 'react-icons/Ai';
import { BiLibrary } from 'react-icons/bi';
import { RiSettingsLine } from 'react-icons/ri';
import icon from '../../../assets/launcherIcon.png';

function Sidebar() {
  const navigate = useNavigate();

  const onLogout = () => {
    if (window.electron.store.get('rememberMe') === false) {
      window.electron.store.set('username', '');
    } else if (window.electron.store.get('rememberMe') === true) {
      window.electron.store.set(
        'username',
        window.electron.store.get('username')
      );
    }
    navigate('/', { replace: true });
  };

  return (
    <div className="fixed bg-base-100 h-screen w-20 bg-opacity-40 backdrop-blur-md flex flex-col z-10">
      <div className="tooltip tooltip-right tooltip-info" data-tip="About Us">
        <a href="https://www.select-studios.com/">
          <img src={icon} alt="Logo" className="scale-150 pt-4" />
        </a>
      </div>
      <div className="divider" />
      <ul className="menu p-2 rounded-box w-2 scale-125 z-20">
        <li>
          <a className="tooltip tooltip-right" data-tip="Home">
            <HiHome />
          </a>
        </li>
        <li>
          <Link className="tooltip tooltip-right" data-tip="Store" to="/store">
            <AiOutlineAppstoreAdd />
          </Link>
        </li>
        <li>
          <Link
            className="tooltip tooltip-right"
            data-tip="Library"
            to="/library"
          >
            <BiLibrary />
          </Link>
        </li>
        <li>
          <a className="tooltip tooltip-right" data-tip="Settings">
            <RiSettingsLine />
          </a>
        </li>
      </ul>
      <div className="divider m-auto" />
      <div className="divider" />
      <div className="avatar online m-2 dropdown dropdown-top">
        <ul
          tabIndex={0}
          className="dropdown-content menu p-2 m-2 bg-base-100 rounded-box w-52"
        >
          <li>
            <button
              type="button"
              className="btn btn-error btn-outline"
              onClick={onLogout}
            >
              <HiOutlineLogout /> Sign Out
            </button>
          </li>
        </ul>
        <div
          tabIndex={0}
          className="rounded-full ring ring-base-100 ring-offset-base-100 ring-offset-2"
        >
          <img
            tabIndex={0}
            src="https://placeimg.com/192/192/people"
            alt="Profile"
          />
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
