import { Card, CardBody, CardHeader, Input } from "@nextui-org/react";
import React, { FC } from "react";
import { SigninCardHeader } from "./card_header.signin";
import { SigninCardBody } from "./card_body.signin";
import { SigninCardFooter } from "./card_footer.signin";

interface IProps {}

/**
 * @author
 * @function @SignInCard
 **/

export const SignInCard: FC<IProps> = (props) => {
  return (
    <Card className="bg-secondaryBG w-[428px]">
      <SigninCardHeader />
      <SigninCardBody />
      <SigninCardFooter />
    </Card>
  );
};
