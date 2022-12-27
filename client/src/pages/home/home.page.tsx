import { Button } from "@nextui-org/react";
import { FunctionComponent } from "react";
import { Link } from "react-router-dom";

interface HomeProps {}

export const Home: FunctionComponent<HomeProps> = () => {
  return (
    <div className="home h-screen grid justify-center items-center">
      <div className="home__links">
        <Link to="/login">
          <Button>Login</Button>
        </Link>
      </div>
    </div>
  );
};
