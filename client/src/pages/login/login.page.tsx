import { Button, Input, Link, Loading } from "@nextui-org/react";
import { Alert, AppBar } from "@/components";
import { BiUser } from "react-icons/bi";
import { HiOutlineEye } from "react-icons/hi";
import { HiOutlineEyeSlash } from "react-icons/hi2";
import { FcGoogle } from "react-icons/fc";
import { Link as LinkRoute, useNavigate } from "react-router-dom";
import LoginInterface from "@/interfaces/LoginInterface";
import useCookies from "react-cookie/cjs/useCookies";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { useState } from "react";
import { Log } from "@/utils/lib/Log";
import { alertConfig, removeAlert } from "@/components/alert/alert.component";

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [cookies, setCookie] = useCookies(["accessToken", "refreshToken"]);
  const [alert, setAlert] = useState(alertConfig);
  const API_URI =
    process.env.NODE_ENV === "development"
      ? "http://localhost:4757/api"
      : "https://selectlauncherapi.up.railway.app/api";

  const validateInputComponent = (component: string, color: boolean) => {
    if (color) return (errors[component] ? "error" : "primary") as any;
    return errors[component]?.message?.toString() || "";
  };

  const loginUser = async (data: LoginInterface) => {
    setLoading(true);
    const res = await fetch(`${API_URI}/accounts/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const resData = await res.json();

    if (res.ok) {
      const { user } = resData;
      const { accessToken, refreshToken } = user;

      setCookie("accessToken", accessToken, { path: "/", maxAge: 1800 });
      setCookie("refreshToken", refreshToken, {
        path: "/",
        maxAge: 60 * 60 * 24 * 30,
      });

      setLoading(false);
      navigate("/home");
    } else {
      setLoading(false);
      setAlert({ show: true, msg: resData.error, type: "error" });
    }
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
    if (cookies.accessToken || cookies.refreshToken) {
      navigate("/home");
    }
  }, []);

  useEffect(() => removeAlert(setAlert), [alert]);

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
                  <Button
                    type="submit"
                    color="primary"
                    className="my-5 mx-14"
                    size="lg"
                    disabled={loading}
                    bordered={loading}
                  >
                    {loading ? (
                      <Loading
                        type="points-opacity"
                        color="currentColor"
                        size="lg"
                      />
                    ) : (
                      "Login"
                    )}
                  </Button>
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
          <Alert show={alert.show} type={alert.type} msg={alert.msg} />
        </div>
      </motion.div>
    </div>
  );
};
