import { Button } from "@nextui-org/react";
import { HiHome, HiMenu } from "react-icons/hi";

interface SidebarProps {}

export const Sidebar: React.FC<SidebarProps> = () => {
  return (
    <div className="my-auto">
      <div className="inline float-left fixed h-4/6 rounded-tr-xl rounded-br-xl bg-secondary p-5">
        <div className="grid justify-center mt-5">
          <Button
            size="md"
            icon={<HiHome size="25" />}
            className="bg-tertiary border-2 border-solid border-primary-base mb-5"
          >
            Home
          </Button>
          <Button
            size="md"
            icon={<HiHome size="25" />}
            className="bg-tertiary border-2 border-solid border-primary-base mb-5"
          >
            Home
          </Button>
          <Button
            size="md"
            icon={<HiHome size="25" />}
            className="bg-tertiary border-2 border-solid border-primary-base mb-5"
          >
            Home
          </Button>
          <Button
            size="md"
            icon={<HiHome size="25" />}
            className="bg-tertiary border-2 border-solid border-primary-base mb-5"
          >
            Home
          </Button>
          <div className="mt-20">Feed</div>
        </div>
      </div>
    </div>
  );
};
