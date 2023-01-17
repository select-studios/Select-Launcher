import { Loading } from "@nextui-org/react";

interface LoaderProps {
  msg?: string;
}

const Loader: React.FC<LoaderProps> = ({ msg }) => {
  return (
    <div className="h-screen flex items-center justify-center">
      <Loading size="md">{msg}</Loading>
    </div>
  );
};

export { Loader };
