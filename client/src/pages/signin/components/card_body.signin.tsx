import { Button, CardBody, Divider, Input } from "@nextui-org/react";
import React, { FC } from "react";
import { SigninCardForm } from "./card_form.signin";
import { BsGoogle, BsSteam } from "react-icons/bs";

interface IProps {}

/**
 * @author
 * @function @SigninCardBody
 **/

export const SigninCardBody: FC<IProps> = (props) => {
  return (
    <CardBody className="px-10">
      <SigninCardForm />
      <Divider className="mt-[23px] mb-[17px]" />
      <div className="buttons">
        <Button fullWidth>
          <BsSteam size={24} /> Steam
        </Button>
        <Button className="mt-[14px]" fullWidth>
          <BsGoogle size={24} /> Google
        </Button>
      </div>
    </CardBody>
  );
};
