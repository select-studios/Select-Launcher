import { Routes, Route, HashRouter as Router } from "react-router-dom";
import { Register, Home, Login, Verify } from "@/pages";

const App: React.FC = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} index />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register/:id/verify/:token" element={<Verify />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
