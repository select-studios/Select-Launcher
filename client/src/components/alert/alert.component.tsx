import { FunctionComponent, useEffect, useState } from "react";
import { HiX, HiCheck } from "react-icons/hi";

export interface AlertProps {
  show: boolean;
  type: "success" | "error";
  msg: string;
  hide?: boolean;
}

export const alertDefault: AlertProps = {
  show: false,
  msg: "",
  type: "error",
  hide: true,
};

export const useAlert = () => {
  const [alert, setAlert] = useState<AlertProps>(alertDefault);

  useEffect(() => {
    removeAlert(alert, setAlert);
  }, [alert]);

  return { alert, setAlert };
};

export const removeAlert = (alert: AlertProps, setAlert: any) => {
  setTimeout(() => {
    alert.show && setAlert({ show: false, msg: alert.msg, type: alert.type });
  }, 3000);
};

export const Alert: FunctionComponent<AlertProps> = ({ type, msg, show }) => {
  return (
    <div
      className={`alert font-bold font-inter fixed opacity-0 ${
        show && "opacity-100"
      } transition-opacity duration-300 bottom-0 right-0 items-center flex rounded-lg p-2 m-5 text-md ${
        type === "success" ? "bg-green-500" : "bg-red-400"
      }`}
    >
      {type === "success" ? <HiCheck /> : <HiX size="25px" />}
      <span className="ml-1">{msg}</span>
    </div>
  );
};
