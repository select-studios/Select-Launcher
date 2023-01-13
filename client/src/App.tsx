import {
  HashRouter,
  HashRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import { Home, Login } from "@/pages";

const App: React.FC = () => {
  return (
    <>
      <HashRouter>
        <section className="tracking-normal">
          <Routes>
            <Route path="/" element={<Login />} index />
            <Route path="/home" element={<Home />} />
          </Routes>
        </section>
      </HashRouter>
    </>
  );
};

export default App;
