import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';

function Store() {
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
    <div>
      <h1>Store</h1>
      <Button className="p-button-danger" onClick={onLogout}>
        Logout
      </Button>
    </div>
  );
}

export default Store;
