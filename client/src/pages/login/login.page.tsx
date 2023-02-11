import { Button, Input, Link, Loading } from "@nextui-org/react";
import { AppBar } from "@/components";
import { BiUser } from "react-icons/bi";
import { HiOutlineEye } from "react-icons/hi";
import { HiOutlineEyeSlash } from "react-icons/hi2";
import { FcGoogle } from "react-icons/fc";
import { Link as LinkRoute, useNavigate } from "react-router-dom";
import LoginInterface from "@/interfaces/LoginInterface";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";
import { Log } from "@/utils/lib/Log";
import { API_URI } from "@/handlers/api";
import ButtonLoader from "@/components/loader/button/buttonloader.component";
import { getTokensCookie, setTokensCookie } from "@/utils/storage";

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const validateInputComponent = (component: string, color: boolean) => {
    if (color) return (errors[component] ? "error" : "primary") as any;
    return errors[component]?.message?.toString() || "";
  };

  const loginUser = async (data: LoginInterface) => {
    setLoading(true);
    await fetch(`${API_URI}/accounts/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(async (res) => {
      const resData = await res.json();

      if (res.ok) {
        const { accessToken, refreshToken } = resData.user;
        console.log(resData);

        setTokensCookie(accessToken, refreshToken);

        setLoading(false);
        navigate("/home");
      } else {
        setLoading(false);
        toast.error(resData.error);
      }
    });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: LoginInterface | any) => {
    loginUser(data);
  };

  useEffect(() => {
    const cookies = getTokensCookie();

    if (cookies)
      if (cookies.accessToken || cookies.refreshToken) {
        navigate("/home");
      }
  }, []);

  return (
    <div>
      <AppBar />
      <motion.div exit={{ opacity: 0 }}>
        <div>
          <div className="login flex text-white flex-col h-screen items-center justify-center">
            <div
              className="login__box bg-secondary rounded-md shadow-xl"
              style={{ width: "26rem" }}
            >
              <section className="account__strip traking-normal flex items-center justify-center bg-tertiary rounded-t-md">
                <BiUser size={28} />
                <h2 className="font-montserrat text-2xl font-bold ml-2 mt-2">
                  Account
                </h2>
              </section>
              <section className="login__content flex flex-col ml-5 mr-5">
                <h2 className="text-lg font-semibold mt-5">
                  We are so glad to have you back!
                </h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="login__username/password mt-5">
                    <div className="login__username">
                      <h3 className="text-base font-semibold ml-1">Username</h3>
                      <Input
                        placeholder="User123"
                        size="md"
                        aria-label="Username"
                        color={validateInputComponent("username", true)}
                        helperText={validateInputComponent("username", false)}
                        helperColor={validateInputComponent("username", true)}
                        fullWidth
                        bordered
                        {...register("username", {
                          required: "You must enter a username.",
                        })}
                      />
                    </div>
                    <div className="login__password mt-5">
                      <h3 className="text-base font-semibold ml-1">Password</h3>
                      <Input.Password
                        placeholder="12345"
                        size="md"
                        fullWidth
                        bordered
                        color={validateInputComponent("password", true)}
                        aria-label="Username"
                        helperText={validateInputComponent("password", false)}
                        helperColor={validateInputComponent("password", true)}
                        visibleIcon={<HiOutlineEyeSlash />}
                        hiddenIcon={<HiOutlineEye />}
                        {...register("password", {
                          required: "You must enter a password.",
                          minLength: {
                            value: 8,
                            message: "Password must be at least 8 characters.",
                          },
                        })}
                      />
                    </div>
                  </div>
                  <ButtonLoader
                    className="my-5 mx-14"
                    size="lg"
                    button={
                      <Button
                        type="submit"
                        color="primary"
                        className="my-5 mx-14"
                        size="lg"
                      >
                        Login
                      </Button>
                    }
                    loading={loading}
                  />
                </form>
                <p className="text-base text-center font-medium mb-5">
                  No account? <LinkRoute to="/register">Create one!</LinkRoute>
                </p>
              </section>
            </div>
            <div className="login__divider inline-flex items-center justify-center w-full">
              <hr
                className="h-1 my-8 bg-tertiary rounded"
                style={{ width: "26rem" }}
              />
              <span className="absolute px-3 font-medium -translate-x-1/2 bg-primary text-tertiary">
                OR
              </span>
            </div>
            <div className="login__google">
              <Button
                icon={<FcGoogle size={30} />}
                size="lg"
                className="bg-tertiary"
                disabled
              >
                <b className="ml-9">Continue with Google</b>
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
