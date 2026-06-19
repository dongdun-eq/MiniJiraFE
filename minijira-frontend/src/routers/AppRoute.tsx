import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home/Home";

const AppRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
};

export default AppRoute;
