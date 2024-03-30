import { SelectLauncherImage } from "@/components/images/selectlauncher.component";
import { SignupCard } from "./components/card.signup";

interface SignupProps {}

export const Signup: React.FC<SignupProps> = () => {
  return (
    <main>
      <section className="signup grid justify-center">
        <div className="signup__sl-image justify-center flex my-5">
          <SelectLauncherImage />
        </div>
        <SignupCard />
      </section>
    </main>
  );
};
