import { Button } from "@nextui-org/react";
import { FunctionComponent } from "react";
import { BrandLogo } from "../brand/logo/logo.brand.component";
// @ts-ignore
import { HomeIcon } from "feather-react";

interface AppBarProps {
  type?: "regular" | "other";
}

export const AppBar: FunctionComponent<AppBarProps> = () => {
  return (
    <div className="appbar flex-1 bg-secondary py-2 rounded-b-2xl shadow-xl">
      <div className="flex">
        <div className="flex justify-start items-center">
          <Button></Button>
        </div>
        <div className="flex justify-center items-center">
          <BrandLogo />
        </div>
      </div>
    </div>
  );
};
