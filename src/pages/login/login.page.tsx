import { Button } from "@nextui-org/react";
import { FunctionComponent } from "react";
import { Link } from "react-router-dom";

interface LoginProps {}

export const Login: React.FC<LoginProps> = () => {
  return (
    <div className="home">
      <div>Login Page</div>
      <div className="h-screen grid justify-center items-center">
        <div className="home__links">
          <Link to="/">
            <Button>Home</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
