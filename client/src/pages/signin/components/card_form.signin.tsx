import { Button, Input, toggle } from "@nextui-org/react";
import React, { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { BsEyeFill } from "react-icons/bs";
import { HiEyeSlash } from "react-icons/hi2";
import { signinUser } from "../functions/signinUser";
import SigninInterface from "@/interfaces/SigninInterface";
import { Link, useNavigate } from "react-router-dom";
import { HiEye } from "react-icons/hi";
import { SigninForgotPassword } from "./forgotpassword.signin";

interface IProps {}

/**
 * @author
 * @function @SigninCardForm
 **/

export const SigninCardForm: FC<IProps> = (props) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmitSignIn = (data: SigninInterface | any) => {
    signinUser(data, navigate, setLoading);
  };

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () =>
    setIsPasswordVisible(!isPasswordVisible);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  // fp = Forgot Password
  const [fpVisible, setFpVisible] = useState(false);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmitSignIn)}>
        <Input
          isClearable
          type="text"
          label="Username"
          placeholder="Enter your username"
          {...register("username", {
            required: { value: true, message: "Required field." },
          })}
          isInvalid={errors.username ? true : false}
          errorMessage={(errors.username?.message as string) || ""}
        />
        <Input
          className="mt-5"
          type={isPasswordVisible ? "text" : "password"}
          label="Password"
          placeholder="Enter your password"
          isInvalid={errors.password ? true : false}
          errorMessage={(errors.password?.message as string) || ""}
          endContent={
            <button
              className="focus:outline-none"
              type="button"
              onClick={togglePasswordVisibility}
            >
              {isPasswordVisible ? (
                <HiEyeSlash
                  size={24}
                  className="text-2xl text-default-400 pointer-events-none"
                />
              ) : (
                <HiEye
                  size={24}
                  className="text-2xl text-default-400 pointer-events-none"
                />
              )}
            </button>
          }
          {...register("password", {
            required: { value: true, message: "Required field." },
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters.",
            },
          })}
        />
        <Button
          onPress={() => setFpVisible(true)}
          variant="ghost"
          className="mt-2 mb-[27px]"
          size="sm"
        >
          Forgot password?
        </Button>
        <div className="buttons flex justify-center">
          <Button
            isLoading={loading}
            type="submit"
            className="mr-2"
            color="primary"
            variant="flat"
          >
            Continue
          </Button>
          <Link to="/signup">
            <Button color="primary" variant="shadow">
              Sign up
            </Button>
          </Link>
        </div>
      </form>
      <SigninForgotPassword visible={fpVisible} setVisible={setFpVisible} />
    </div>
  );
};
