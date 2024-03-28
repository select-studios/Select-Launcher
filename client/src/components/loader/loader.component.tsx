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
      <Spinner size="lg">{msg}</Spinner>
    </div>
  );
};

export { Loader };
