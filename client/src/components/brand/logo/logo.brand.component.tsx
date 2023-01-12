import { Image } from "@nextui-org/react";
import { FunctionComponent } from "react";

interface BrandLogoProps {}

export const BrandLogo: FunctionComponent<BrandLogoProps> = () => {
  return (
    <div className="flex items-center">
      <Image
        width={86.61}
        height={55.2}
        src="./src/assets/images/icon.png"
        alt="selectstudios__logo"
      />
      <span className="ml-2 text-2xl font-bold text-white font-montserrat">
        Select Studios
      </span>
    </div>
  );
};
