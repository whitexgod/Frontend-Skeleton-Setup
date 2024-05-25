import { useNavigate } from "react-router-dom";
import { GuestRouteProps } from "../../interfaces/GuestRoute";
import PrivatePageLayout from "../../components/Layouts/PrivatePageLayout";
import { URLS } from "../../config/urls";
import { instance } from "../../helpers/axiosInstance";
import { useEffect } from "react";

const PrivateRoute = ({ component: Component }: GuestRouteProps) => {
  const navigate = useNavigate();

  const verify = async () => {
    const response = await instance.get(URLS.verify);
    if (response.data.success) {
      console.log("verified");
    } else {
      console.log("unauthorized");
      localStorage.clear();
      navigate("/");
    }
  };

  useEffect(() => {
    verify();
  }, []);

  return <PrivatePageLayout>{Component}</PrivatePageLayout>;
};

export default PrivateRoute;
