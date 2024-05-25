import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login/Login";
import GuestRoute from "../pages/RouteProtector/GuestRoute";
import Dashboard from "../pages/Dashboard/Dashboard";
import PrivateRoute from "../pages/RouteProtector/PrivateRoute";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GuestRoute component={<Login />} />} />
        <Route
          path="/dashboard"
          element={<PrivateRoute component={<Dashboard />} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
