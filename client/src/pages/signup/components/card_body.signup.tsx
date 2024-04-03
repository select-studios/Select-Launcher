import { Button, CardBody, Divider } from "@nextui-org/react";
import React, { FC } from "react";
import { SignupCardForm } from "./card_form.signup";
import { BsGoogle } from "react-icons/bs";
import { BiDotsVerticalRounded, BiMenu } from "react-icons/bi";

interface IProps {}

/**
 * @author
 * @function @SignupCardBody
 **/

export const SignupCardBody: FC<IProps> = (props) => {
  return (
    <CardBody className="px-10">
      <SignupCardForm />
      <Divider className="mt-[23px] mb-[17px]" />
      <div className="buttons flex">
        <Button isDisabled className="mt-[14px]" fullWidth>
          <BsGoogle size={24} /> Google
        </Button>
        <Button isDisabled isIconOnly className="mt-[14px] ml-2">
          <BiDotsVerticalRounded size={24} />
        </Button>
      </div>
    </CardBody>
  );
};
