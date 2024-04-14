import { Spinner } from "@nextui-org/react";
import { useEffect, useState } from "react";

const loadingMessages = [
  "Cookin'",
  "Getting ready",
  "Lookin' good",
  "Getting ready",
  "One moment",
  "Working on it",
  "Look behind you",
  "Fixing all the error messages",
  "Loading times are a feature",
  "Loading all the love from Select",
  "(╯°□°）╯︵ ┻━┻",
];

const getRandomMessage = () => {
  const randomIndex = Math.floor(Math.random() * loadingMessages.length);
  return loadingMessages[randomIndex];
};

interface LoaderProps {
  msg?: string;
}

export interface LoadingState {
  state: boolean;
  msg?: string;
}

const Loader: React.FC<LoaderProps> = ({ msg }) => {
  const [message, setMessage] = useState(msg);
  const [timeoutMessage, setTimeoutMessage] = useState("");

  useEffect(() => {
    if (!message?.length) {
      const randomMessage = getRandomMessage();
      setMessage(randomMessage);
    }

    setTimeout(() => {
      setTimeoutMessage(
        "Our server is still processing your request. Please give it some time."
      );
    }, 10000);

    setTimeout(() => {
      setTimeoutMessage(
        "It appears that there might be some errors on our side. Try clearing 'App Local Storage' and restarting the app."
      );
    }, 1000 * 60 * 2);
  }, []);

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="grid justify-center">
        <Spinner size="lg" className="mx-auto" />
        <p className="font-bold mt-5 text-center">{message}</p>
      </div>
      <div className="fixed bottom-0 mb-5 font-medium font-opacity-80">
        {timeoutMessage}
      </div>
    </div>
  );
};

export { Loader };
