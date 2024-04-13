import { Card } from "@nextui-org/react";
import { FC } from "react";
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
    <Card
      isBlurred
      className="signin__card my-10 mx-auto max-h-fit z-10 w-[428px]"
    >
      <SigninCardHeader />
      <SigninCardBody />
      <SigninCardFooter />
    </Card>
  );
};
