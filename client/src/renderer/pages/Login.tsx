/* eslint-disable react/button-has-type */
/* eslint-disable promise/always-return */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import { Button } from 'primereact/button';
// import { InputText } from 'primereact/inputtext';
// import { Checkbox } from 'primereact/checkbox';
import axios from 'axios';
import icon from '../../../assets/launcherIcon.png';

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
      .post(`${window.electron.api.getUrl()}api/accounts/login`, {
        username,
        password,
      })
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
    <div className="overflow-x-hidden">
      <div className="container flex items-center justify-center h-screen ml-12">
        <div className="bg-base-100 bg-opacity-50 rounded-lg p-8 flex flex-col w-7/12 backdrop-blur-md">
          <img
            src={icon}
            alt="Logo"
            height="200px"
            width="350px"
            className="mx-auto"
          />
          <h2 className="text-white text-4xl font-extrabold title-font mb-5 text-center">
            Welcome Back!
          </h2>
          <div className="relative mb-4">
            <label
              htmlFor="username"
              className="leading-7 text-sm text-gray-400"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="w-full bg-gray-600 bg-opacity-10 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 rounded border border-gray-600 focus:border-secondary text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out backdrop-blur-sm"
            />
          </div>
          <div className="relative mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-gray-400">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full bg-gray-600 bg-opacity-10 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 rounded border border-gray-600 focus:border-secondary text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out backdrop-blur-sm"
            />
          </div>
          <button className="btn btn-primary">Sign in</button>
          <p className="text-xs mt-3">
            Don't have an account?{' '}
            <a href="www.google.com/" className="text-secondary underline">
              Create One!
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
