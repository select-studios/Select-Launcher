import { Button, Image } from "@nextui-org/react";
import React, { FC } from "react";
import { BsPlusCircle } from "react-icons/bs";

interface IProps {}

/**
 * @author
 * @function @StoreHeader
 **/

export const StoreHeader: FC<IProps> = (props) => {
  return (
    <div className="relative mt-5 h-[400px] rounded-lg blur-0 animate__animated animate__fadeIn">
      <Image
        src="https://cdn.discordapp.com/attachments/1030139297577316464/1227698939390591007/image.png?ex=66295abc&is=6616e5bc&hm=3750b650c7dfabb16c2e4b82c5277d85cc37eae44a7898d4d298de43224d683c&"
        className="store__main-banner h-[400px] rounded-md w-screen object-cover"
      />
      <p className="absolute text-2xl w-full text-white rounded-t-md bg-black bg-opacity-30 top-0 p-5 z-50 font-heading uppercase">
        Featured Game
      </p>
      <div className="absolute bottom-0 left-0 p-5 z-50">
        <p className="font-heading text-3xl text-white uppercase">Rosehill</p>
        <p className="text-white font-sans font-semibold text-md max-w-3xl">
          I can't live with the idea I might never see him again; This is a
          death mission, but I'm willing...
        </p>
      </div>
      <div className="absolute bottom-0 right-0 p-5 z-10 flex">
        <Button className="mr-2">View Store Page</Button>{" "}
        <Button startContent={<BsPlusCircle size={20} />} color="success">
          Get Now
        </Button>
      </div>
    </div>
  );
};
