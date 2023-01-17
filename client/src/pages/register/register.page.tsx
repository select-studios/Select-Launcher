import { AppBar } from "@/components";
import { Button, Input, Link } from "@nextui-org/react";
import { BiUser } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc";
import { HiOutlineEye } from "react-icons/hi";
import { HiOutlineEyeSlash } from "react-icons/hi2";
import { Link as LinkRoute, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { passwordStrength } from "check-password-strength";

import RegisterInterface from "@/interfaces/RegisterInterface";
import fetch from "node-fetch";

interface RegisterProps {}

export const Register: React.FC<RegisterProps> = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const navigate = useNavigate();

  const registerUser = async (data: RegisterInterface) => {
    const res = await fetch("http://localhost:4757/api/accounts/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const resData = await res.json();

    if (res.ok) {
      navigate("/");
      console.log("User created!", resData);
    } else {
      console.error("Error creating user!", resData);
    }
  };

  const onSubmit = (data: RegisterInterface | any) => {
    registerUser(data);
  };

  const validateInputComponent = (component: string, color: boolean) => {
    if (color) return (errors[component] ? "error" : "primary") as any;
    return errors[component]?.message?.toString() || "";
  };

  const checkPasswordStrength = (password: string) => {
    const strength = passwordStrength(password);
    console.log(strength);
    if (strength.id > 2) return true;
  };

  return (
    <div>
      <AppBar />
      <div className="register flex text-white flex-col h-screen items-center justify-center">
        <div
          className="register__box bg-secondary rounded-md shadow-xl"
          style={{ width: "26rem" }}
        >
          <section className="account__strip traking-normal flex items-center justify-center bg-tertiary rounded-t-md">
            <BiUser size={28} />
            <h2 className="font-montserrat text-2xl font-bold ml-2 mt-2">
              Account
            </h2>
          </section>
          <section className="register__content flex flex-col ml-5 mr-5">
            <h2 className="text-lg font-semibold mt-5">
              Create an account to get started!
            </h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="register__credentials">
                <div className="register__credentials.email">
                  <h3 className="text-base font-semibold ml-1">E-mail</h3>
                  <Input
                    placeholder="johndoe@yourmom.com"
                    size="md"
                    color={validateInputComponent("email", true)}
                    helperColor={validateInputComponent("email", true)}
                    helperText={validateInputComponent("email", false)}
                    fullWidth
                    bordered
                    {...register("email", {
                      required: "You need to provide us with an e-mail.",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message:
                          "Oops! That e-mail address does not look right.",
                      },
                    })}
                  />
                </div>
                <div className="register__credentials.username mt-7">
                  <h3 className="text-base font-semibold ml-1">Username</h3>
                  <Input
                    placeholder="johndoe256"
                    size="md"
                    color={validateInputComponent("username", true)}
                    helperColor={validateInputComponent("username", true)}
                    helperText={validateInputComponent("username", false)}
                    fullWidth
                    bordered
                    {...register("username", {
                      required: "You need to provide us with a username.",
                    })}
                  />
                </div>
                <div className="register__credentials.password mt-7">
                  <h3 className="text-base font-semibold ml-1">Password</h3>
                  <Input.Password
                    placeholder="12345"
                    size="md"
                    visibleIcon={<HiOutlineEyeSlash />}
                    hiddenIcon={<HiOutlineEye />}
                    color={validateInputComponent("password", true)}
                    helperColor={validateInputComponent("password", true)}
                    helperText={validateInputComponent("password", false)}
                    fullWidth
                    bordered
                    {...register("password", {
                      required: "You need a password for your account.",
                      minLength: {
                        value: 8,
                        message:
                          "Your password needs to be at least 8 characters long.",
                      },
                      validate: (value) =>
                        checkPasswordStrength(value) ||
                        `Password is ${passwordStrength(
                          value
                        ).value.toLowerCase()}. (It should contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.)`,
                    })}
                  />
                </div>
              </div>
              <Button
                type="submit"
                color="primary"
                className="mb-5 mt-7 mx-14"
                size="lg"
              >
                Register
              </Button>
            </form>

            <p className="text-base text-center font-medium mb-5">
              Have an account?{" "}
              <LinkRoute to="/">
                <Link>Login!</Link>
              </LinkRoute>
            </p>
          </section>
        </div>
        <div className="register__divider inline-flex items-center justify-center w-full">
          <hr
            className="h-1 my-8 bg-tertiary rounded"
            style={{ width: "26rem" }}
          />
          <span className="absolute px-3 font-medium -translate-x-1/2 bg-primary text-tertiary">
            OR
          </span>
        </div>
        <div className="register__google">
          <Button
            icon={<FcGoogle size={30} />}
            size="lg"
            className="bg-tertiary"
          >
            <b className="ml-9">Continue with Google</b>
          </Button>
        </div>
      </div>
    </div>
  );
};
