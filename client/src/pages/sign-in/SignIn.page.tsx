import { observer } from "mobx-react";
import "./signIn.styles.css";
import { useFormik } from "formik";
import { Input } from "@nextui-org/react";
import { signInSchema } from "@/schemas/signInSchema";

const SignInForm = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: () => {},
    validationSchema: signInSchema,
  });

  return (
    <form autoComplete="off">
      <Input type="email" label="email" />
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
