import { Spinner } from "@nextui-org/react";
import { BiWifiOff } from "react-icons/bi";

interface Offline_EProps {}

const Offline_E: React.FC<Offline_EProps> = () => {
  return (
    <section className="offline_e">
      <div className="flex items-center justify-center h-screen">
        <div className="grid items-center max-w-lg">
          <BiWifiOff size="80" className="mx-auto mb-3 text-danger" />
          <div className="text-center">
            <p className="text-2xl uppercase font-heading">
              Aw snap! Looks like you're{" "}
              <span className="text-danger">offline</span>
            </p>
            <p className="mt-5 text-left">
              <b>Try:</b> <br />
              <ul className="list-disc">
                <li>Checking the network cables, modem, and router</li>
                <li>Reconnecting to Wi-Fi</li>
                <li>Running Windows Network Diagnostics</li>
              </ul>
            </p>
          </div>
        </div>
      </div>
      <div
        className={`fixed p-3 flex justify-center font-medium rounded-t-md items-center bottom-0 w-screen bg-content1`}
      >
        <Spinner size="sm" className="mr-3" /> Trying to reconnect...
      </div>
    </section>
  );
};

export default Offline_E;
