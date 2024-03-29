import { CardHeader } from "@nextui-org/react";
import React, { FC } from "react";

interface IProps {}

/**
 * @author
 * @function @SignupCardHeader
 **/

export const SignupCardHeader: FC<IProps> = (props) => {
  return (
    <CardHeader className="grid justify-center mb-2">
      <h1 className="text-4xl font-heading mt-5 text-center">Sign up</h1>
      <p className="mt-4 font-semibold opacity-70 text-base">
        Create a new Select Studios™️ account today!
      </p>
    </CardHeader>
  );
};
