import { AppBar } from "@/components";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getTokensCookie } from "@/utils/storage";
import { observer } from "mobx-react";
import { SignInCard } from "./components/card.signin";
import { SelectLauncherImage } from "@/components/images/selectlauncher.component";

import "./signin.style.css";
import { FloatingSquares } from "@/components/images/floatingsquares.component";

interface SigninProps {}

export const SigninComp: React.FC<SigninProps> = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const cookies = getTokensCookie();

    if (cookies)
      if (cookies.accessToken || cookies.refreshToken) {
        navigate("/store");
      }
  }, []);

  return (
    <main>
      <section className="signin flex flex-col justify-center items-center">
        <div className="signin__sl-image mx-auto">
          <SelectLauncherImage />
        </div>
        <SignInCard />
      </section>
      <FloatingSquares />
    </main>
  );
};

export const Signin = observer(SigninComp);
