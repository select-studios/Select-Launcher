/* eslint-disable promise/always-return */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Checkbox } from 'primereact/checkbox';
import axios from 'axios';
import icon from '../../../assets/LauncherLogo.png';

function Login() {
  const [checked, setChecked] = useState<boolean>(false);
  const [username, setUsername] = useState<string>(
    window.electron.store.get('username')
  );
  const [password, setPassword] = useState<string>();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(window.electron.store.path());
    if (window.electron.store.get('rememberMe')) {
      setChecked(window.electron.store.get('rememberMe'));
    } else if (window.electron.store.get('rememberMe') === true) {
      setChecked(window.electron.store.get('rememberMe'));
    }
  }, [setChecked]);

  const onSubmit = () => {
    axios
      .post('http://localhost:5000/api/accounts/login', { username, password })
      .then(() => {
        window.electron.store.set('rememberMe', checked);
        if (checked) {
          window.electron.store.set('username', username);
        }
        navigate('/store', { replace: true });
        console.log(`logged in with username ${username}`);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex align-items-center justify-content-center">
      <div
        className="p-4 shadow-4 border-round w-6 mt-2"
        style={{
          backgroundColor: 'rgba(7, 20, 38, 0.5)',
          backdropFilter: 'blur(24px)',
        }}
      >
        <div className="text-center mb-1">
          <img
            src={icon}
            alt="Logo"
            height="200px"
            width="350px"
            className=""
          />
          <div className="text-900 text-3xl font-medium mb-3">Welcome Back</div>
          <span className="text-600 font-medium line-height-3">
            Don&apos;t have an account?
          </span>
          <a className="font-medium no-underline ml-2 text-blue-500 cursor-pointer">
            Create One!
          </a>
        </div>

        <div>
          <label htmlFor="password" className="block text-900 font-medium mb-2">
            Username
          </label>
          <InputText
            id="username"
            type="text"
            className="w-full mb-3"
            defaultValue={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{
              backgroundColor: 'rgba(4, 13, 25, 0.2)',
              backdropFilter: 'blur(24px)',
            }}
          />

          <label htmlFor="password" className="block text-900 font-medium mb-2">
            Password
          </label>
          <InputText
            id="password"
            type="password"
            className="w-full mb-3"
            onChange={(e) => setPassword(e.target.value)}
            style={{
              backgroundColor: 'rgba(4, 13, 25, 0.2)',
              backdropFilter: 'blur(24px)',
            }}
          />

          <div className="flex align-items-center justify-content-between mb-6">
            <div className="flex align-items-center">
              <Checkbox
                id="rememberme"
                checked={checked}
                onChange={(e) => setChecked(e.checked)}
                className="mr-2"
              />
              <label htmlFor="rememberme">Remember me</label>
            </div>
            <a className="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer">
              Forgot your password?
            </a>
          </div>

          <Button
            label="Sign In"
            icon="pi pi-user"
            className="w-full"
            onClick={onSubmit}
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
