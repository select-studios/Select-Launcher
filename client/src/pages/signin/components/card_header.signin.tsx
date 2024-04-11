import { CardHeader } from "@nextui-org/react";
import { FC } from "react";

interface IProps {}

/**
 * @author
 * @function @SigninCardHeader
 **/

export const SigninCardHeader: FC<IProps> = (props) => {
  return (
    <CardHeader className="grid justify-center mb-2">
      <h1 className="text-4xl font-heading mt-5 text-center">Sign in</h1>
      <p className="mt-4 font-semibold opacity-70 text-base">
        Welcome back! We're happy to see you again.
      </p>
    </CardHeader>
  );
};
