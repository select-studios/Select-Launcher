import { useEffect } from "react";
import { useNavigate } from "react-router";

function Home() {
  let navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate("/login");
    }, 300);
  });

  return (
    <div>
      <h1>Trust me bro Home page bro</h1>
    </div>
  );
}

export default Home;
