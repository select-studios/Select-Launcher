export const validateInputComponent = (
  errors: any,
  component: string,
  color: boolean
) => {
  if (color) return (errors[component] ? "error" : "primary") as any;
  return errors[component]?.message?.toString() || "";
};
