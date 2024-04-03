import { Spinner } from "@nextui-org/react";

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
  const randomMessage = msg || getRandomMessage();

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="grid justify-center">
        <Spinner size="lg" />
        <p className="font-bold mt-5">{randomMessage}</p>
      </div>
    </div>
  );
};

export { Loader };
