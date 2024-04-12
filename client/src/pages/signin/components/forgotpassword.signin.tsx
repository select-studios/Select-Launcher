import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import React, { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { API_URI } from "@/handlers/api";
import { toast } from "react-toastify";
import { HiEye } from "react-icons/hi";
import { HiEyeSlash } from "react-icons/hi2";

interface IProps {
  visible: boolean;
  setVisible: any;
}

/**
 * @author
 * @function @SigninForgotPassword
 **/

export const SigninForgotPassword: FC<IProps> = ({ visible, setVisible }) => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const fpUser = (data: any) => {
    setLoading(true);
    fetch(
      `${API_URI}/accounts/${data.fpEmail}/pswd/verify?newPass=${data.fpPassword}`
    )
      .then((res) => res.json())
      .then((body) => {
        setVisible(false);
        toast.success(
          "An email has been sent to you with instructions to recover your account!"
        );
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setVisible(false);
        toast.error(
          "There was an error in your password reset, please contact support"
        );
      });
  };

  const onSubmit = (data: any) => {
    console.log(data);
    fpUser(data);
  };

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const [passwordInput, setPasswordInput] = useState<string>("");

  const togglePasswordVisibility = () =>
    setIsPasswordVisible(!isPasswordVisible);

  useEffect(() => {
    console.log(errors.fpPassword);
  }, [passwordInput]);

  return (
    <Modal
      className="bg-content1"
      isOpen={visible}
      backdrop="blur"
      onOpenChange={() => setVisible(!visible)}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <form onSubmit={handleSubmit(onSubmit)}>
              <ModalHeader className="font-heading text-xl tracking-wide font-normal grid">
                Reset Password
                <p className="text-sm opacity-60 font-medium font-sans">
                  Happens to the best of us.
                </p>
              </ModalHeader>
              <ModalBody>
                <Input
                  isClearable
                  type="email"
                  label="Email"
                  {...register("fpEmail", {
                    required: { value: true, message: "Required field." },
                  })}
                  isInvalid={errors.email ? true : false}
                  errorMessage={(errors.email?.message as string) || ""}
                />
                <Input
                  className="mt-5"
                  type={isPasswordVisible ? "text" : "password"}
                  label="New Password"
                  onChange={(e) => setPasswordInput(e.target.value)}
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
                />
                <Input
                  className="mt-5"
                  type={isPasswordVisible ? "text" : "password"}
                  label="Confirm New Password"
                  color={errors.fpPassword ? "danger" : "default"}
                  minLength={8}
                  errorMessage={
                    (errors.fpPassword?.message as string) ||
                    (errors.fpPassword?.type === "matchesPassword"
                      ? "Passwords don't match."
                      : "")
                  }
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
                  {...register("fpPassword", {
                    required: { value: true, message: "Required field." },
                    minLength: {
                      value: 8,
                      message: "Password must be atleast 8 characters.",
                    },
                    validate: {
                      matchesPassword: (e) =>
                        e.toLowerCase() === passwordInput.toLowerCase(),
                    },
                  })}
                />
              </ModalBody>
              <ModalFooter>
                <Button onPress={onClose} color="danger" variant="flat">
                  Close
                </Button>
                <Button isLoading={loading} type="submit" color="primary">
                  Continue
                </Button>
              </ModalFooter>
            </form>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
