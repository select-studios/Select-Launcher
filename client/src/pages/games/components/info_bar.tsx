import { Button, Chip } from "@nextui-org/react";
import { FiShoppingBag } from "react-icons/fi";
import GameInfo from "@/interfaces/GameInfoInterface";
import { BiCheckCircle, BiPlusCircle } from "react-icons/bi";

interface IInfoBarProps {
  game: GameInfo | undefined;
}

export const InfoBar = ({ game }: IInfoBarProps) => {
  return (
    <div className="h-screen p-5 sticky top-0 right-0 rounded-tl-lg bg-secondaryBG w-96">
      <div className="bg-tertiaryBG mb-4 min-h-40 rounded-lg p-5"></div>
      <div className="flex items-center mb-8">
        <p className="font-heading opacity-80 text-base">FREE</p>
        <div className="ml-2">
          <Chip
            startContent={<BiCheckCircle size={20} />}
            variant="flat"
            color="success"
          >
            Verified
          </Chip>
        </div>
      </div>
      <div className="buttons">
        <Button
          startContent={<FiShoppingBag size={20} />}
          size="lg"
          color="success"
          fullWidth
        >
          Get now
        </Button>
        <Button
          startContent={<BiPlusCircle size={20} />}
          size="lg"
          className="mt-4"
          fullWidth
        >
          Add to library
        </Button>
      </div>
      <div className="mt-20">
        <div>
          <p className="font-heading text-base uppercase">Developer</p>
          <p className="text-base">Select Studios™️</p>
        </div>
        <div className="mt-6">
          <p className="font-heading text-base uppercase">Platforms</p>
          <p className="text-base">{game?.platforms.join(", ")}</p>
        </div>
        <div className="mt-6">
          <p className="font-heading text-base uppercase">Release Date</p>
          <p className="text-base">01.01.2069</p>
        </div>
        <div className="mt-6">
          <p className="font-heading text-base uppercase">Current Build</p>
          <p className="text-base">1000</p>
        </div>
      </div>
    </div>
  );
};
