import { Button } from "@nextui-org/react";
import { AppBar } from "@/components";
import { Link } from "react-router-dom";

export const Login: React.FC = () => {
  return (
    <div>
      <AppBar />
      <div className="login grid place-items-center mt-52">
        <div className="login__links">
          <Link to="/home">
            <Button>Login</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
