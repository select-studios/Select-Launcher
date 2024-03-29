import SignupInterface from "@/interfaces/RegisterInterface";
import { Button, Input } from "@nextui-org/react";
import React, { FC, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signupUser } from "../functions/signupUser";
import { useForm } from "react-hook-form";
import { HiEyeSlash } from "react-icons/hi2";
import { HiEye } from "react-icons/hi";

interface IProps {}

/**
 * @author
 * @function @SignupCardForm
 **/

export const SignupCardForm: FC<IProps> = (props) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmitSignUp = (data: SignupInterface | any) => {
    signupUser(data, navigate, setLoading);
  };

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () =>
    setIsPasswordVisible(!isPasswordVisible);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmitSignUp)}>
        <Input
          isClearable
          type="email"
          label="Email"
          {...register("email", {
            required: { value: true, message: "Required field." },
          })}
          isInvalid={errors.email ? true : false}
          errorMessage={(errors.email?.message as string) || ""}
        />
        <Input
          isClearable
          type="text"
          label="Username"
          className="mt-[14px]"
          {...register("username", {
            required: { value: true, message: "Required field." },
          })}
          isInvalid={errors.username ? true : false}
          errorMessage={(errors.username?.message as string) || ""}
        />
        <Input
          className="mt-[14px] mb-[27px]"
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
        <div className="buttons flex justify-center">
          <Button
            isLoading={loading}
            type="submit"
            className="mr-2"
            color="primary"
            variant="shadow"
          >
            Sign up
          </Button>
          <Link to="/">
            <Button color="primary" variant="flat">
              Sign in instead
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
};
