import { Navigate } from "react-router-dom";
import { Token } from "../../enums/enums";
import GuestPageLayout from "../../components/Layouts/GuestPageLayout";
import { GuestRouteProps } from "../../interfaces/GuestRoute";

const GuestRoute = ({ component: Component }: GuestRouteProps) => {
  const accessToken = localStorage.getItem(Token.ACCESS_TOKEN);
  if (accessToken) {
    return <Navigate to="/dashboard" />;
  }
  return <GuestPageLayout>{Component}</GuestPageLayout>;
};

export default GuestRoute;
