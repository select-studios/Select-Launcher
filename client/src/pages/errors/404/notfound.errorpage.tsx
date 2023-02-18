import { Link } from "@nextui-org/react";
import { Link as RouterLink } from "react-router-dom";

interface NotFound_EProps {}

const NotFound_E: React.FC<NotFound_EProps> = () => {
  return (
    <div>
      how yo come here?
      <RouterLink to="/">
        <Link>go home dumbass</Link>
      </RouterLink>
    </div>
  );
};

export { NotFound_E };
