import { ReactNode, useEffect, useCallback, useState } from "react";
import { URLS } from "../../config/urls";
import { useNavigate } from "react-router-dom";
import { apiCall } from "../../helpers/apiCalls";
import Loader from "../Loader/Loader";

export default function PrivatePageLayout({
  children,
}: {
  children: ReactNode;
}) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const verify = useCallback(async () => {
    try {
      const res = await apiCall(URLS.verify, "GET");
      if (!res.success) {
        localStorage.clear();
        navigate("/");
      } else {
        setLoading(false); // Set loading to false if verification is successful
      }
    } catch (error) {
      console.error("Verification failed", error);
      localStorage.clear();
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    verify();
  }, [verify]);

  if (loading) {
    return <Loader />;
  }

  return <div className="min-w-screen min-h-screen">{children}</div>;
}
