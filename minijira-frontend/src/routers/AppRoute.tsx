import { Route, Routes } from "react-router-dom";
import {
  ROUTE_PATH_HOME,
  ROUTE_PATH_LOGIN,
  ROUTE_PATH_REGISTER,
} from "../constants";
import { lazy, Suspense } from "react";
import LoadingFallback from "../components/LoadingFallback/LoadingFallback";

const Home = lazy(() => import("../pages/Home/Home"));
const Login = lazy(() => import("../pages/Login/Login"));
const Register = lazy(() => import("../pages/Register/Register"));
const NotFound = lazy(() => import("../pages/NotFound/NotFound"));

const AppRoute = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route path={ROUTE_PATH_HOME} element={<Home />} />
        <Route path={ROUTE_PATH_LOGIN} element={<Login />} />
        <Route path={ROUTE_PATH_REGISTER} element={<Register />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoute;
