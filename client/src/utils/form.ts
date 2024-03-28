/**
 * Changes the color of the form component if the color is valid
 *
 * @param {any} errors
 * @param {any} component
 * @param {boolean} color
 * @returns {any} color
 */

export const validateInputColor = (
  errors: any,
  component: string,
  color: boolean
) => {
  if (color) return (errors[component] ? "error" : "primary") as any;
  return errors[component]?.message?.toString() || "";
};
