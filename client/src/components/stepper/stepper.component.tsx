import { Divider, Spinner } from "@nextui-org/react";
import React, { FC } from "react";
import { BiCheck } from "react-icons/bi";

interface IProps {
  steps: { label: string; done: boolean }[];
}

/**
 * @author
 * @function @Stepper
 **/

export const Stepper: FC<IProps> = ({ steps }) => {
  return (
    <div className="flex items-center">
      {steps.map((step, i) => (
        <div className="mx-10 grid" key={i}>
          <div
            className={
              step.done
                ? "rounded-full w-fit mx-auto bg-success p-2"
                : "rounded-full w-fit mx-auto bg-primary p-2 px-4"
            }
          >
            {step.done ? (
              <BiCheck size={25} />
            ) : (
              <span className="font-bold">{i + 1}</span>
            )}
          </div>
          <span className="my-2"></span>
          <div className="font-medium">{step.label}</div>
        </div>
      ))}
    </div>
  );
};
