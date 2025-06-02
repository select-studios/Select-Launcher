import { BrowserRouter as Router, Routes, Route } from "react-router";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Titlebar from "./components/Titlebar/Titlebar";

function App() {
  return (
    <Router>
      <Titlebar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
