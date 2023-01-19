import { Button } from "@nextui-org/react";
import { useState } from "react";

interface VerifyProps {}

export const Verify: React.FC<VerifyProps> = () => {
  const [validUrl, setValidUrl] = useState<boolean>(false);
  return <>{<div>404 not found</div>}</>;
};
