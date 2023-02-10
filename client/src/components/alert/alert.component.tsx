import { Progress } from "@nextui-org/react";
import { FunctionComponent, SetStateAction, useEffect, useState } from "react";
import { HiX, HiCheck } from "react-icons/hi";

export interface AlertProps {
  show: boolean;
  type: "success" | "error";
  msg: string;
  hide?: boolean;
}

export const alertConfig: AlertProps = {
  show: false,
  msg: "",
  type: "error",
};

export const removeAlert = (setAlert: any) => {
  setTimeout(() => {
    setAlert(alertConfig);
  }, 5000);
};

export const Alert: FunctionComponent<AlertProps> = ({ type, msg, show }) => {
  const [progressVal, setProgressVal] = useState(0);

  useEffect(() => {
    if (show) {
      const interval = setInterval(() => {
        setProgressVal((prev) => prev + 1);
      }, 10);

      if (progressVal >= 100)
        return () => {
          clearInterval(interval);
          setProgressVal(0);
        };
    }
  }, [show]);

  return show ? (
    <div
      className={`alert font-medium font-inter fixed opacity-0 ${
        show && "opacity-100"
      } transition-opacity duration-300 bottom-0 grid items-center right-0 rounded-md shadow-md pt-2 m-5 text-md ${
        type === "success" ? "bg-green-500" : "bg-red-400"
      }`}
    >
      <div className="flex items-center px-2 mb-2">
        {type === "success" ? <HiCheck size="25px" /> : <HiX size="25px" />}
        <span className="ml-1">{msg}</span>
      </div>
      <Progress
        className="border-t-0"
        status="default"
        squared
        color="secondary"
        size="xs"
        animated={false}
        value={progressVal}
      />
    </div>
  ) : (
    <div className="alert"></div>
  );
};
