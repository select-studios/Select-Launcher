import { Button, Input, toggle } from "@nextui-org/react";
import React, { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { BsEyeFill } from "react-icons/bs";
import { HiEyeSlash } from "react-icons/hi2";
import { signinUser } from "../functions/signinUser";
import SigninInterface from "@/interfaces/SigninInterface";
import { Link, useNavigate } from "react-router-dom";
import { HiEye } from "react-icons/hi";

interface IProps {}

/**
 * @author
 * @function @SigninCardForm
 **/

export const SigninCardForm: FC<IProps> = (props) => {
  const navigate = useNavigate();
  const onSubmitSignIn = (data: SigninInterface | any) => {
    signinUser(data, navigate);
  };

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () =>
    setIsPasswordVisible(!isPasswordVisible);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmitSignIn)}>
      <Input
        isClearable
        type="email"
        label="Email"
        {...register("email", {
          required: { value: true, message: "Required field." },
        })}
        isRequired
        isInvalid={errors.email ? true : false}
        errorMessage={(errors.email?.message as string) || ""}
      />
      <Input
        className="mt-5 mb-[27px]"
        isRequired
        type={isPasswordVisible ? "text" : "password"}
        label="Password"
        placeholder="Enter your password"
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
      <div className="buttons flex justify-center">
        <Button type="submit" className="mr-2" color="primary" variant="flat">
          Continue
        </Button>
        <Link to="/register">
          <Button color="primary" variant="shadow">
            Sign up
          </Button>
        </Link>
      </div>
    </form>
  );
};
