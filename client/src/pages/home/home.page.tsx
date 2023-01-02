import { AppBar } from "@/components";
import { Button } from "@nextui-org/react";
import { Link } from "react-router-dom";

export const Home: React.FC = () => {
  return (
    <div className="Home">
      <AppBar />
      <div className="grid place-items-center mt-2">
        <div className="text-center">Home Page</div>
        <div className="login__links mt-52">
          <Link to="/">
            <Button>Logout</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
