import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Store from './pages/Store';
import './styles/App.css';
import 'tailwindcss/tailwind.css';

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
      api: {
        getUrl: () => string;
      };
      gamesApi: {
        getFetchedGames: () => {
          name: string;
          description: string;
          tags: string[];
          logo: string;
        }[];
        downloadGame: (gameName: string) => void;
      };
    };
  }
}
