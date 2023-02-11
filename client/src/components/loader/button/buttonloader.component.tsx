import { Button, Loading, NormalSizes } from "@nextui-org/react";

interface ButtonLoaderProps {
  button: JSX.Element;
  className?: string;
  loading?: boolean;
  size?: NormalSizes;
}

const ButtonLoader: React.FC<ButtonLoaderProps> = ({
  button,
  loading,
  className,
  size,
}) => {
  return !loading ? (
    button
  ) : (
    <Button size={size} className={className} disabled bordered>
      <Loading type="points-opacity" color="currentColor" size="lg" />
    </Button>
  );
};

export default ButtonLoader;
