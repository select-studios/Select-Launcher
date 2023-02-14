import UserDropdown from "../dropdowns/user/userdropdown.component";
import { getTokensCookie } from "@/utils/storage";

export interface AppBarProps {
  user?: {
    username: string;
    email: string;
    verified: boolean;
  };
  dashboard?: boolean;
  logoutFn?: () => void;
  loggingOut?: boolean;
}

export const AppBar: React.FC<AppBarProps> = ({
  dashboard,
  user,
  logoutFn,
  loggingOut,
}) => {
  const cookies = getTokensCookie();

  return (
    <>
      <div className="w-screen h-8 bg-secondary appbar Draggable-Region" />
      <header className="w-full bg-secondary py-2 rounded-b-3xl shadow-xl pt-0">
        <div className="container mx-auto flex flex-wrap p-2 flex-col md:flex-row items-center">
          <nav className="flex lg:2/5 flex-wrap items-center text-base md:ml-auto"></nav>
          <div className="flex order-first lg:order-none lg:w-1/5 title-font font-medium items-center text-gray-900 lg:items-center lg:justify-center mb-4 md:mb-0">
            <p className="text-white font-semibold font-montserrat text-2xl">
              Select Studios
            </p>
          </div>
          <div className="lg:w-2/5 inline-flex lg:justify-end">
            {dashboard && logoutFn && (
              <UserDropdown
                loggingOut={loggingOut || false}
                user={{
                  username: user?.username || "",
                  verified: user?.verified || false,
                  accessToken: cookies.accessToken || "",
                }}
                logoutFn={logoutFn}
              />
            )}
          </div>
        </div>
      </header>
    </>
  );
};
