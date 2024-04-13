import { SelectLauncherImage } from "@/components/images/selectlauncher.component";
import { SignupCard } from "./components/card.signup";
import "./signup.style.css";

interface SignupProps {}

export const Signup: React.FC<SignupProps> = () => {
  return (
    <main>
      <section className="signup flex flex-col justify-center items-center">
        <div className="signup__sl-image mx-auto">
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
