import App from "@/App";
import Login from "@/pages/Login";
import { routeGenerator } from "@/utils/routesGenerator";

import { createBrowserRouter } from "react-router-dom";
import { adminPaths } from "./adminRoutes";

const router = createBrowserRouter([
  {
    path: "/admin",
    element: <App />,
    children: routeGenerator(adminPaths),
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
