import { Route, RouteObject, RouteProps } from "react-router";
import Auth from "./handlers/api/components/Auth";
import { Settings, Signin, Signup, Store } from "./pages";
import { GameObserver } from "./pages/games/[game]";
import ModeratorDashboard from "./pages/moderator/dashboard/moderator-dashboard.page";
import { NotFound_E } from "./pages/errors";

const routes = [
  {
    path: "/",
    element: <Signin />,
  },
  {
    path: "/store",
    element: <Store />,
    auth: true,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/settings",
    element: <Settings />,
    auth: true,
  },
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
