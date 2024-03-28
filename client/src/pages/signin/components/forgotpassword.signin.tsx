import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import React, { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { API_URI } from "@/handlers/api";
import { toast } from "react-toastify";
import { HiOutlineEye } from "react-icons/hi";
import { HiOutlineEyeSlash } from "react-icons/hi2";
import ButtonLoader from "@/components/loader/button/buttonloader.component";

interface IProps {}

/**
 * @author
 * @function @SigninForgotPassword
 **/

export const SigninForgotPassword: FC<IProps> = (props) => {
  const {
    register: registerFP,
    handleSubmit: handleSubmitFP,
    formState: { errors: errorsFP },
  } = useForm({ mode: "onChange" });

  const fpUser = (data: any) => {
    fetch(
      `${API_URI}/accounts/${data.fpEmail}/pswd/verify?newPass=${data.fpPassword}`
    )
      .then((res) => res.json())
      .then((body) => {
        setFPVisible(false);
        toast.success(
          "An e-mail has been sent to your account for further verification."
        );
      });
  };

  const onSubmitFP = (data: any) => {
    console.log("hello");
    fpUser(data);
  };

  const [FPVisible, setFPVisible] = useState(false);

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () =>
    setIsPasswordVisible(!isPasswordVisible);

  return (
    <Modal
      closeButton
      backdrop="blur"
      aria-labelledby="modal-title"
      className="pt-0"
      isOpen={FPVisible}
      onClose={() => setFPVisible(false)}
    >
      <form onSubmit={handleSubmitFP(onSubmitFP)}>
        <ModalHeader className="bg-secondaryBG mb-5">
          <p className="text-xl ">Reset Password</p>{" "}
        </ModalHeader>
        <p>Happens to the best of us</p>
        <p className="text-sm opacity-70 mb-2">This can take a few moments.</p>
        <ModalBody>
          <Input
            isClearable
            variant="bordered"
            fullWidth
            color="primary"
            size="lg"
            placeholder="E-mail"
            {...registerFP("fpEmail")}
          />
          <Input
            variant="bordered"
            fullWidth
            type="password"
            color="primary"
            size="lg"
            placeholder="New Password"
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={togglePasswordVisibility}
              >
                {isPasswordVisible ? (
                  <HiOutlineEye className="text-2xl text-default-400 pointer-events-none" />
                ) : (
                  <HiOutlineEyeSlash className="text-2xl text-default-400 pointer-events-none" />
                )}
              </button>
            }
            {...registerFP("fpPassword")}
          />
        </ModalBody>
        <ModalFooter>
          <Button
            className="w-auto"
            variant="flat"
            color="danger"
            onPress={() => setFPVisible(false)}
          >
            Close
          </Button>
          <ButtonLoader
            button={
              <Button type="submit" className="w-auto">
                Submit
              </Button>
            }
            // loading={loading}
            className="w-auto"
          />
        </ModalFooter>
      </form>
    </Modal>
  );
};
