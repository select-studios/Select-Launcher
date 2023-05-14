import { BiWifiOff } from "react-icons/bi";

interface Offline_EProps {}

const Offline_E: React.FC<Offline_EProps> = () => {
  return (
    <section className="offline_e">
      <div className="flex items-center justify-center h-screen">
        <div className="grid items-center max-w-lg">
          <BiWifiOff size="60" className="mx-auto mb-3 text-primary-base" />
          <div className="text-center">
            <p className="text-2xl font-bold font-montserrat">
              Aw snap! Your internet died.
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
        className={`fixed p-2 flex justify-center rounded-t-md items-center bottom-0 w-screen bg-secondary`}
      >
        <BiWifiOff className="mr-2" size="20" /> Offline
      </div>
    </section>
  );
};

export default Offline_E;
