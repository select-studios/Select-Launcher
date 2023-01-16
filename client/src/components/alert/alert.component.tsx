import { FunctionComponent } from "react";
import { HiX, HiCheck } from "react-icons/hi";

interface AlertProps {
  type: "success" | "error";
  message: string;
}

export const Alert: FunctionComponent<AlertProps> = ({ type, message }) => {
  return (
    <div
      className={`alert items-center flex rounded-lg p-2 mt-4 border-solid border-2 ${
        type === "success"
          ? "bg-green-500 border-green-600"
          : "bg-red-400 border-red-500"
      }`}
    >
      {type === "success" ? <HiCheck /> : <HiX size="25px" />}
      <span className="ml-1">{message}</span>
    </div>
  );
};
