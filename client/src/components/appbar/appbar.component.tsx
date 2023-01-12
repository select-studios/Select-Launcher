import { Image } from "@nextui-org/react";
import react from "react";

export const AppBar: React.FC = () => {
  return (
    <nav className="grid justify-center bg-secondary py-2 rounded-b-3xl shadow-xl">
      <section id="brand" className="flex items-center">
        <Image
          width={86.61}
          height={55.2}
          src="./src/assets/images/icon.png"
          alt="selectstudios__logo"
        />
        <h1 className="prose text-white font-bold text-2xl pt-2">
          Select Studios
        </h1>
      </section>
    </nav>
  );
};
