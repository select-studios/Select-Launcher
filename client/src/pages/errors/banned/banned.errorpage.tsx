import { Button } from "@nextui-org/react";
import { Link as RouterLink } from "react-router-dom";
import { useLocation } from "react-router";
import bannedUserIcon from "../../../assets/images/ICON_UserError.png";
import { BiUserX } from "react-icons/bi";

interface UserBanned_EProps {
  banReason?: string;
}

const UserBanned: React.FC<UserBanned_EProps> = ({banReason}) => {
  const location = useLocation();

  return (
    <section className="offline_e">
      <div className="flex items-center justify-center h-screen">
        <div className="grid justify-center items-center">
          <img
            src={bannedUserIcon}
            className="w-28 h-28 mb-5 mx-auto rounded-md"
            alt="404_E"
          />
          <div className="text-center">
            <p className="text-2xl font-heading">
              Account Suspended
            </p>
            <p>Your account was in violation of our terms of service</p>
            <p className="mt-5 text-left">
              <b>Want to appeal the ban? go ahead</b> <br />
              <ul className="list-disc">
                <li>Contact us at help.selectstudios@gmail.com</li>
                <li>Make sure to provide your username, e-mail and (if you have one) the backup e-mail</li>
                <li>Contact us as soon as possible or your account may be deleted!</li>
                <li>Support staff abuse will result in account deletion</li>
              </ul>
            </p>
            <p className="mt-5 text-left">
              <b>Are you a developer or publisher?</b> <br />
              <ul className="list-disc">
                <li>if you are a developer your game will no longer be able for purchess</li>
                <li>all outstanding revenue will be paid unless it's a legal dispute</li>
                <li className="flex justify-center mt-5 list-none">
                <RouterLink to="/" className="text-primary-base">
                  <Button variant="flat" color="danger">
                    Back to Login
                  </Button>
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
        <BiUserX size="20" className="text-danger mr-2" />Your select account has been Suspended
      </div>
    </section>
  );
};

export { UserBanned };
