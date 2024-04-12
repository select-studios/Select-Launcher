import { SelectLauncherImage } from "@/components/images/selectlauncher.component";
import { SignupCard } from "./components/card.signup";
import "./signup.style.css";

interface SignupProps {}

export const Signup: React.FC<SignupProps> = () => {
  return (
    <main>
      <section className="signup grid justify-center">
        <div className="signup__sl-image justify-center flex mt-5">
          <SelectLauncherImage />
        </div>
        <SignupCard />
      </section>
      <div className="area">
        {" "}
        <ul className="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </main>
  );
};
