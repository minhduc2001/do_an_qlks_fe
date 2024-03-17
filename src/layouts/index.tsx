import ApiUser from "@/api/ApiUser";
import "./index.scss";
import MainRoutes from "@/routes";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function LayoutWrapper() {
  const navigate = useNavigate();
  useEffect(() => {
    if (ApiUser.isFirstLogin()) {
      navigate("/user");
    }
  }, [ApiUser.isFirstLogin()]);
  return (
    <div className="wrapper">
      <MainRoutes />
    </div>
  );
}

export default LayoutWrapper;
