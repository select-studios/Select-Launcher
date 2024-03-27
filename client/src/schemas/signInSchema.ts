import * as yup from "yup";

// one uppercase, one lowercase, one special character, min 8 characters and atleast one number
const passwordRules = /"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"/;

export const signInSchema = yup.object().shape({
  email: yup.string().email().required("Required"),
  password: yup
    .string()
    .min(5)
    .matches(passwordRules, { message: "Please create a stringer password" })
    .required("Required"),
});
