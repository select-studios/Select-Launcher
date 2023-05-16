import { BiBaguette, BiBug } from "react-icons/bi";
import { Link } from "@nextui-org/react";
import { Link as RouterLink } from "react-router-dom";

interface NotFound_EProps {}

const NotFound_E: React.FC<NotFound_EProps> = () => {
  return (
    <section className="offline_e">
      <div className="flex items-center justify-center h-screen">
        <div className="grid items-center max-w-lg">
          <BiBug size="60" className="mx-auto mb-3 text-primary-base" />
          <div className="text-center">
            <p className="text-2xl font-bold font-montserrat">
              Where did that page go again?
            </p>
            <p>Bad news. That page seems to be missing.</p>
            <p className="mt-5 text-left">
              <b>Try:</b> <br />
              <ul className="list-disc">
                <li>Try again Later? This could be an issue on our end.</li>
                <li>Updating your launcher. It'll only take 2 seconds</li>
                <li>
                  <RouterLink to="/">
                    <Link> Return to the Home Menu</Link>
                  </RouterLink>
                </li>
              </ul>
            </p>
          </div>
        </div>
      </div>
      <div
        className={`fixed p-2 flex justify-center rounded-t-md items-center bottom-0 w-screen bg-secondary`}
      >
        <BiBaguette className="mr-2" size="20"></BiBaguette> 404 Page not found
      </div>
    </section>
  );
};

export { NotFound_E };
