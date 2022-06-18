/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Store from './pages/Store';
import './App.css';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/store" element={<Store />} />
      </Routes>
    </Router>
  );
}

declare global {
  interface Window {
    electron: {
      ipcRenderer: any;
      store: {
        get: (key: string) => any;
        set: (key: string, val: any) => void;
        path: () => string;
      };
    };
  }
}
