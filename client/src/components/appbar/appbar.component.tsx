import { Button } from "@nextui-org/react";

export interface AppBarProps {
  user?: {
    username?: string;
  };
  dashboard?: boolean;
}

export const AppBar: React.FC<AppBarProps> = ({ dashboard, user }) => {
  return (
    <>
      <header className="bg-secondary py-2 rounded-b-3xl shadow-xl">
        <div className="container mx-auto flex flex-wrap p-2 flex-col md:flex-row items-center">
          <nav className="flex lg:2/5 flex-wrap items-center text-base md:ml-auto"></nav>
          <div className="flex order-first lg:order-none lg:w-1/5 title-font font-medium items-center text-gray-900 lg:items-center lg:justify-center mb-4 md:mb-0">
            <p className="text-white font-semibold font-montserrat text-2xl">
              Select Studios
            </p>
          </div>
          <div className="lg:w-2/5 inline-flex lg:justify-end">
            {dashboard && (
              <div>
                <Button className="bg-tertiary lowercase">
                  @{user?.username}
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
};
