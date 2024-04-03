import { CardFooter } from "@nextui-org/react";
import React, { FC } from "react";

interface IProps {}

/**
 * @author
 * @function @SignupCardFooter
 **/

export const SignupCardFooter: FC<IProps> = (props) => {
  return (
    <CardFooter className="px-10 mb-5 opacity-50">
      <p>By signing up, you agree to our EULA and Privacy Policy.</p>
    </CardFooter>
  );
};
