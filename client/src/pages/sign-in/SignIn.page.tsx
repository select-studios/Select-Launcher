import { observer } from "mobx-react";
import "./signIn.styles.css";
import { useFormik } from "formik";
import SelectInput from "@/components/selectInput/SelectInput.component";
import { signInSchema } from "@/schemas/signInSchema";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { useState } from "react";
import { Button } from "@nextui-org/react";

const SignInForm = () => {
  const [isPasswordVisibility, setIsPasswordVisibility] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: () => {},
    validationSchema: signInSchema,
  });

  const togglePasswordVisibility = () =>
    setIsPasswordVisibility(!isPasswordVisibility);

  return (
    <form autoComplete="off">
      <SelectInput
        type="email"
        label="email"
        className="form-input"
        size="md"
        radius="lg"
        variant="flat"
      />
      <SelectInput
        label="password"
        className="form-input"
        size="md"
        radius="lg"
        variant="flat"
        endContent={
          <button
            className="focus:outline-none"
            type="button"
            onClick={togglePasswordVisibility}
          >
            {isPasswordVisibility ? (
              <FaEyeSlash className="text-2xl text-default-400 pointer-events-none" />
            ) : (
              <FaEye className="text-2xl text-default-400 pointer-events-none" />
            )}
          </button>
        }
        type={isPasswordVisibility ? "text" : "password"}
      />
      <div className="submit-btn-row">
        <Button color="primary" variant="flat" type="submit">
          Continue
        </Button>
        <Button color="primary" variant="shadow">
          Sign up
        </Button>
      </div>
    </form>
  );
};

const signInComp = () => {
  return (
    <div className="sign-in-card">
      <div className="sign-in-top">
        <h1 className="sign-in-heading">Sign in</h1>
        <h3 className="sign-in-subHeading">
          We are so happy to see you again!
        </h3>
      </div>
      <SignInForm />
    </div>
  );
};

export const SignIn = observer(signInComp);
