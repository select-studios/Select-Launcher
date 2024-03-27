import { UserStore } from "../../src/stores/UserStore";
import { getTokensCookie } from "../util/cookies/storage";
import { Spinner } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import protectRoute from "./utils/protectRoute";
import { observer } from "mobx-react";
import React from "react";

interface AuthAPIProps {
  children: React.ReactNode;
}

const AuthAPI: React.FC<AuthAPIProps> = ({ children }) => {
  const cookies = getTokensCookie();
  const navigate = useNavigate();

  const [loading, setLoading] = useState({
    state: true,
    msg: "",
  });

  useEffect(() => {
    protectRoute(UserStore, cookies, setLoading, navigate);
  }, []);

  return !loading ? (
    <></>
  ) : (
    <div className="h-screen flex items-center justify-center">
      <Spinner size="lg">{loading.msg}</Spinner>
    </div>
  );
};

export default observer(AuthAPI);
