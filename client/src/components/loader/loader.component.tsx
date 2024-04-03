import { Spinner } from "@nextui-org/react";

interface LoaderProps {
  msg?: string;
}

export interface LoadingState {
  state: boolean;
  msg?: string;
}

const Loader: React.FC<LoaderProps> = ({ msg }) => {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="grid justify-center">
        <Spinner size="lg" />
        <p className="font-bold mt-5">Working on it</p>
      </div>
    </div>
  );
};

export { Loader };
