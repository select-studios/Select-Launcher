import { Loading } from "@nextui-org/react";

interface LoaderProps {}

const Loader: React.FC<LoaderProps> = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <Loading size="md" />
    </div>
  );
};

export { Loader };
