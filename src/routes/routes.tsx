import App from "@/App";
import Login from "@/pages/Login";
import { routeGenerator } from "@/utils/routesGenerator";

import { createBrowserRouter } from "react-router-dom";
import { adminPaths } from "./adminRoutes";
import ProtectedRoute from "@/components/layout/ProtectedRoute";

const router = createBrowserRouter([
    {
    path: "/",
    element: <App />,
  },
  {
    path: "/admin",
    element:( 
      <ProtectedRoute role="admin">
    <App /> </ProtectedRoute>),
    children: routeGenerator(adminPaths, ),
  },


  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
