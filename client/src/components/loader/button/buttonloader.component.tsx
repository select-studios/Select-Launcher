import { Button, Spinner } from "@nextui-org/react";

interface ButtonLoaderProps {
  button: JSX.Element;
  className?: string;
  loading?: boolean;
  size?: "sm" | "md" | "lg";
  auto?: boolean;
}

const ButtonLoader: React.FC<ButtonLoaderProps> = ({
  button,
  loading,
  className,
  size,
  auto,
}) => {
  return !loading ? (
    button
  ) : (
    <Button size={size} className={className} disabled>
      <Spinner size="lg" />
    </Button>
  );
};

export default ButtonLoader;
