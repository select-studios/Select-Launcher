import { Route, RouteObject, RouteProps } from "react-router";
import Auth from "./handlers/api/components/Auth";
import { Settings, Signin, Signup, Store, Library } from "./pages";
import { GameObserver } from "./pages/games/[game]";
import ModeratorDashboard from "./pages/moderator/dashboard/moderator-dashboard.page";
import { NotFound_E } from "./pages/errors";
import { AccountSettings } from "./pages/settings/account/account-settings.page";
import { SignupPfpCard } from "./pages/signup/steps/pfp-card.signup";
import { AppSettings } from "./pages/settings/app/app-settings.page";
import { element } from "prop-types";
import { UserBanned } from "./pages/errors/banned/banned.errorpage";

const routes = [
  {
    path: "/",
    element: <Signin />,
  },
  {
    path: "/store",
    element: (
      <Auth getUserData>
        <Store />
      </Auth>
    ),
  },
  {
    path: "/library",
    element: <Library />,
    auth: true,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/signup/pfp",
    element: <SignupPfpCard />,
    auth: true,
  },
  {
    path: "/settings",
    element: <Settings />,
    auth: true,
  },
  { path: "/settings/account", element: <AccountSettings />, auth: true },
  { path: "/settings/app", element: <AppSettings />, auth: true },

  {
    path: "/moderator/dashboard",
    element: <ModeratorDashboard />,
    auth: true,
  },
  {
    path: "/games/:game",
    element: <GameObserver />,
    auth: true,
  },
  {
    path: "/banned",
    element: <UserBanned />,
    auth: false,
  },
  { path: "*", element: <NotFound_E /> },
];

const exportedRoutes: RouteObject[] = [];

routes.forEach((route) =>
  exportedRoutes.push({
    path: route.path,
    element: route.auth ? <Auth>{route.element}</Auth> : route.element,
  })
);

export default exportedRoutes;
