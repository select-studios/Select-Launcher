import { BrowserRouter as Router, Routes, Route } from "react-router";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Titlebar from "./components/Titlebar/Titlebar";
import SignUp from "./pages/SignUp/SignUp";

function App() {
  return (
    <Router>
      <Titlebar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
