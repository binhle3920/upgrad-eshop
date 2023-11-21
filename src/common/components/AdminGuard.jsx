import { useAuth } from "../../context/auth/auth-context";
import { Outlet, useNavigate } from "react-router-dom";
import { ROUTES, USER_ROLES } from "../../utils/constants";
import { useEffect } from "react";

const AdminGuard = () => {
  const {user} = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate(ROUTES.LOGIN);
    }

    if (!user?.roles?.includes(USER_ROLES.ADMIN)) {
      navigate(ROUTES.HOME);
    }
  }, [user, navigate]);

  return <Outlet/>;
};

export default AdminGuard;
