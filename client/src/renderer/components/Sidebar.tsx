import React from 'react';
import { useNavigate } from 'react-router-dom';

import { PanelMenu } from 'primereact/panelmenu';
import { Button } from 'primereact/button';
import { Avatar } from 'primereact/avatar';
import '../pages/Store.css';

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
    <div className="flex flex-wrap align-items-center justify-content-center card-container blue-container">
      <div className="blur absolute top-0 left-0 text-white font-bold flex flex-column w-16rem h-full">
        <Avatar
          className="ml-8 mt-5"
          label="G"
          shape="circle"
          style={{ backgroundColor: '#2196f3', color: '#ffffff' }}
          size="xlarge"
        />
        <PanelMenu
          model={items}
          style={{ width: '14rem' }}
          className="ml-2 mt-8"
        />
        <div style={{ marginTop: '16rem' }} className="flex flex-row">
          <Button
            icon="pi
              pi-sign-out"
            className="p-button-rounded p-button-danger p-button-outlined ml-2 justify-content-left"
            aria-label="Logout"
            onClick={onLogout}
          />
          <Button
            icon="pi pi-angle-left"
            className="p-button-rounded"
            style={{ marginLeft: '9rem' }}
            aria-label="CloseSidebar"
          />
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
