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
    <Card className="signin__card bg-secondaryBG w-[428px]">
      <SignupCardHeader />
      <SignupCardBody />
      <SignupCardFooter />
    </Card>
  );
};
