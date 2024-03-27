import { Input } from "@nextui-org/react";
import { ReactNode } from "react";

interface SelectInputProps {
  variant?: "flat" | "bordered" | "faded" | "underlined";
  size?: "sm" | "md" | "lg";
  radius?: "none" | "sm" | "md" | "lg" | "full";
  value?: string;
  label?: string;
  className?: string;
  description?: string;
  errorMessage?: string;
  startContent?: ReactNode;
  endContent?: ReactNode;
  labelPlacement?: "inside" | "outside" | "outside-left" | undefined;
  fullWidth?: boolean;
  isClearable?: boolean | undefined;
  isRequired?: boolean | undefined;
  isReadOnly?: boolean;
  isDisabled?: boolean;
  isInvalid?: boolean;
  disableAnimation?: boolean;
  type?:
    | "button"
    | "checkbox"
    | "color"
    | "date"
    | "datetime-local"
    | "email"
    | "file"
    | "hidden"
    | "image"
    | "month"
    | "number"
    | "password"
    | "radio"
    | "range"
    | "reset"
    | "search"
    | "submit"
    | "tel"
    | "text"
    | "time"
    | "url"
    | "week";
}

const SelectInput = ({
  variant,
  size,
  radius,
  value,
  label,
  className,
  description,
  errorMessage,
  startContent,
  endContent,
  labelPlacement,
  fullWidth,
  isClearable,
  isRequired,
  isReadOnly,
  isDisabled,
  isInvalid,
  disableAnimation,
  type,
}: SelectInputProps) => {
  return (
    <Input
      type={type}
      label={label}
      className={className}
      size={size}
      radius={radius}
      variant={variant}
      value={value}
      classNames={{
        inputWrapper: [
          "bg-tertiaryBG",
          "group-data-[focus=true]:bg-tertiaryBG",
          "group-data-[hover=true]:bg-tertiaryBG",
        ],
      }}
      fullWidth={fullWidth}
      isClearable={isClearable}
      isRequired={isRequired}
      isReadOnly={isReadOnly}
      isDisabled={isDisabled}
      isInvalid={isInvalid}
      disableAnimation={disableAnimation}
      description={description}
      errorMessage={errorMessage}
      startContent={startContent}
      endContent={endContent}
      labelPlacement={labelPlacement}
    />
  );
};

export default SelectInput;
