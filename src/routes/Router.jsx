import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import PrivateRoute from "./PrivateRoute";

import Home from "../pages/Home";
import Games from "../pages/Games";
import Extra from "../pages/Extra";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import MyProfile from "../pages/MyProfile";
import UpdateProfile from "../pages/UpdateProfile";
import GameDetails from "../pages/GameDetails";
import NotFound from "../pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/games", element: <Games /> },
      { path: "/extra", element: <Extra /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/forgot-password", element: <ForgotPassword /> },
      { path: "/my-profile", element: <MyProfile /> },
      { path: "/update-profile", element: <UpdateProfile /> },
      { path: "/game/:id", element: <GameDetails /> },
      { path: "/my-profile", element: <PrivateRoute><MyProfile /></PrivateRoute> },
{ path: "/update-profile", element: <PrivateRoute><UpdateProfile /></PrivateRoute> },
{ path: "/game/:id", element: <PrivateRoute><GameDetails /></PrivateRoute> },
    ],
  },
]);

export default router;
