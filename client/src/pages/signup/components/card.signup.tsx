import { Card } from "@nextui-org/react";
import React, { FC } from "react";
import { SignupCardHeader } from "./card_header.signup";
import { SignupCardBody } from "./card_body.signup";
import { SignupCardFooter } from "./card_footer.signup";

interface IProps {}

/**
 * @author
 * @function @SignupCard
 **/

export const SignupCard: FC<IProps> = (props) => {
  return (
    <Card
      // isBlurred
      className="signin__card mx-auto z-10 backdrop-blur-lg bg-content1 bg-opacity-40 my-8 w-[428px]"
    >
      <SignupCardHeader />
      <SignupCardBody />
      <SignupCardFooter />
    </Card>
  );
};
