import { Image } from "@nextui-org/react";

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
        <p className="ml-1 text-white font-semibold font-montserrat text-2xl">
          Select Studios
        </p>
      </section>
    </nav>
  );
};
