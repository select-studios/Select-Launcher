import { sendVerificationLink } from "@/handlers/api";
import { User } from "@/stores/UserStore";
import { Button } from "@nextui-org/react";
import React, { FC } from "react";
import { HiBellAlert } from "react-icons/hi2";

interface IProps {
  user: User;
  loading: boolean;
  setLoading: any;
}

/**
 * @author
 * @function @VerificationBanner
 **/

export const VerificationBanner: FC<IProps> = ({
  user,
  loading,
  setLoading,
}) => {
  return (
    <div className="bg-warning items-center flex p-2 bg-opacity-10 mb-5 rounded-lg text-warning">
      <HiBellAlert size={20} />{" "}
      <span className="ml-2 font-medium">
        Some features are disabled. Please verify your e-mail to secure your
        account.
      </span>
      <Button
        onPress={() =>
          sendVerificationLink(user?.tokens.accessToken || "", setLoading)
        }
        className="ml-auto"
        color="warning"
        isLoading={loading}
      >
        Resend Verification Link
      </Button>
    </div>
  );
};
