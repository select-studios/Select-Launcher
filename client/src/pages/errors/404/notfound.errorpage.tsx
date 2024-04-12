import { BiBug } from "react-icons/bi";
import { Button, Image, Link } from "@nextui-org/react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useLocation } from "react-router";
import missingItemIcon from "../../../assets/images/ICON_MissingItem.png";
import { BsExclamationCircle } from "react-icons/bs";

interface NotFound_EProps {}

const NotFound_E: React.FC<NotFound_EProps> = () => {
  const location = useLocation();

  return (
    <section className="offline_e">
      <div className="flex items-center justify-center h-screen">
        <div className="grid justify-center items-center">
          <img
            src={missingItemIcon}
            className="w-28 h-28 mb-5 mx-auto rounded-md"
            alt="404_E"
          />
          <div className="text-center">
            <p className="text-2xl font-heading">
              Where did that page go again?
            </p>
            <p>Bad news. That page seems to be missing.</p>
            <p className="mt-5 text-left">
              <b>Try:</b> <br />
              <ul className="list-disc">
                <li>Again later? This could be an issue on our end.</li>
                <li>Updating your launcher. It'll only take a few moments.</li>
                <li className="flex justify-center mt-5 list-none">
                  <RouterLink to="/" className="text-primary-base">
                    <Button variant="flat">Return Home</Button>
                  </RouterLink>
                </li>
              </ul>
            </p>
          </div>
        </div>
      </div>
      <div
        className={`fixed p-2 flex font-bold justify-center rounded-t-md items-center bottom-0 w-screen bg-content1`}
      >
        <BsExclamationCircle size="20" className="text-danger mr-2" /> Error
        404: Cannot get {location.pathname}
      </div>
    </section>
  );
};

export { NotFound_E };
