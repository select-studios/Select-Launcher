import { useNavigate } from 'react-router-dom';
import icon from '../../../assets/launcherIcon.png';
import { PanelMenu } from 'primereact/panelmenu';
import { Button } from 'primereact/button';
//import { Avatar } from 'primereact/avatar';
import '../styles/Sidebar.css';

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
  const items = [
    {
      label: 'Store',
      icon: 'pi pi-shopping-bag',
    },
    {
      label: 'Your Library',
      icon: 'pi pi-book',
    },
    {
      label: 'Settings',
      icon: 'pi pi-cog',
    },
  ];

  return (
    <div className="sidebar blur fixed top-0 left-0 text-white font-bold w-16rem h-full">
          <img
            src={icon}
            alt="Logo"
            height="150px"
            width="250px"
            className=""
          />
      <PanelMenu model={items} className="ml-2 sidebar-controls" />
      <Button
        icon="pi pi-sign-out"
        className="p-button-rounded p-button-danger p-button-outlined sidebar-footer"
        aria-label="Logout"
        onClick={onLogout}
      />
    </div>
  );
}

export default Sidebar;
