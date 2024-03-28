import {
  Button,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Image,
  Card,
  CardHeader,
  Divider,
  CardBody,
  CardFooter,
  Link,
} from "@nextui-org/react";
import { AppBar } from "@/components";
import { BiUser } from "react-icons/bi";
import { HiOutlineEye } from "react-icons/hi";
import { HiEyeSlash, HiOutlineEyeSlash } from "react-icons/hi2";
import { FcGoogle } from "react-icons/fc";
import { Link as LinkRoute, useNavigate } from "react-router-dom";
import SigninInterface from "@/interfaces/SigninInterface";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";
import { Log } from "@/utils/lib/Log";
import { API_URI } from "@/handlers/api";
import ButtonLoader from "@/components/loader/button/buttonloader.component";
import { getTokensCookie, setTokensCookie } from "@/utils/storage";
import { UserStore } from "@/stores/UserStore";
import { observer } from "mobx-react";
import { validateInputColor } from "@/utils/form";
import LauncherLogo from "../../../../Resources/ICON_SelectLauncher.png";
import { BsEyeFill, BsGoogle, BsSteam } from "react-icons/bs";
import { SignInCard } from "./components/card.signin";
import { signinUser } from "./functions/signinUser";
import { SelectLauncherImage } from "@/components/images/selectlauncher.component";

interface SigninProps {}

export const SigninComp: React.FC<SigninProps> = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const cookies = getTokensCookie();

    if (cookies)
      if (cookies.accessToken || cookies.refreshToken) {
        navigate("/home");
      }
  }, []);

  return (
    <main>
      <AppBar />
      <section className="signin grid justify-center ">
        <div className="justify-center flex my-5">
          <SelectLauncherImage />
        </div>
        <SignInCard />
      </section>
    </main>
  );
};

export const Login = observer(SigninComp);
