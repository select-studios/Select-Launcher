import { Routes, Route, HashRouter as Router } from "react-router-dom";
import { Register, Home, Login } from "@/pages";

const App: React.FC = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} index />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
