import { AppBar } from "@/components";
import { Button } from "@nextui-org/react";
import { FunctionComponent } from "react";
import { Link } from "react-router-dom";

interface LoginProps {}

export const Login: React.FC<LoginProps> = () => {
  return (
    <div className="login">
      <AppBar />
      <div>Login Page</div>
    </div>
  );
};
