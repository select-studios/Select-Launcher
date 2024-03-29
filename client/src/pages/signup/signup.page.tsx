import { AppBar } from "@/components";
import { Button, Input, Spinner } from "@nextui-org/react";
import { BiUser } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc";
import { HiOutlineEye } from "react-icons/hi";
import { HiOutlineEyeSlash } from "react-icons/hi2";
import { Link as LinkRoute, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { passwordStrength } from "check-password-strength";
import { motion } from "framer-motion";
import { useState } from "react";

import SignupInterface from "@/interfaces/RegisterInterface";
import fetch from "node-fetch";
import { toast } from "react-toastify";
import { API_URI } from "@/handlers/api";
import ButtonLoader from "@/components/loader/button/buttonloader.component";
import { setTokensCookie } from "@/utils/storage";
import { validateInputColor } from "@/utils/form";
import { signupUser } from "./functions/signupUser";
import { SelectLauncherImage } from "@/components/images/selectlauncher.component";
import { SignupCard } from "./components/card.signup";

interface SignupProps {}

export const Signup: React.FC<SignupProps> = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const [loading, setLoading] = useState<boolean>(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () =>
    setIsPasswordVisible(!isPasswordVisible);

  const navigate = useNavigate();

  const onSubmit = (data: SignupInterface | any) => {
    signupUser(data, navigate, setLoading);
  };

  const checkPasswordStrength = (password: string) => {
    const strength = passwordStrength(password);
    console.log(strength);
    if (strength.id > 2) return true;
  };

  return (
    <main>
      <AppBar />
      <section className="signup grid justify-center">
        <div className="signup__sl-image justify-center flex my-5">
          <SelectLauncherImage />
        </div>
        <SignupCard />
      </section>
    </main>
  );
};
