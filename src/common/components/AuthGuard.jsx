import { useAuth } from "../../context/auth/auth-context";
import { Outlet, useNavigate } from "react-router-dom";
import { ROUTES } from "../utils/constants";
import { useEffect } from "react";

const AuthGuard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate(ROUTES.LOGIN);
    }
  }, [user]);

  return <Outlet />;
};

export default AuthGuard;
