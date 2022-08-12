/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useNavigate } from 'react-router-dom';
import { HiHome } from 'react-icons/hi';
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
    <div className="fixed bg-base-100 h-screen w-20 bg-opacity-40 backdrop-blur-md flex flex-col">
      <img src={icon} alt="Logo" className="scale-150 pt-4" />
      <div className="divider" />
      <ul className="menu p-2 rounded-box w-2 scale-125">
        <li>
          <a>
            <HiHome />
          </a>
        </li>
        <li>
          <a>
            <AiOutlineAppstoreAdd />
          </a>
        </li>
        <li>
          <a>
            <BiLibrary />
          </a>
        </li>
        <li>
          <a>
            <RiSettingsLine />
          </a>
        </li>
      </ul>
      <div className="divider m-auto" />
      <div className="divider" />
      <div className="avatar online m-2 dropdown dropdown-top">
        <ul
          tabIndex={0}
          className="dropdown-content menu p-2 shadow bg-base-100 bg-opacity-40 rounded-box w-52"
        >
          <li>
            <a>Item 1</a>
          </li>
          <li>
            <a>Item 2</a>
          </li>
        </ul>
        <div
          tabIndex={0}
          className="rounded-full ring ring-base-100 ring-offset-base-100 ring-offset-2"
        >
          <img tabIndex={0} src="https://placeimg.com/192/192/people" />
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
