import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import type { RootState } from "../context/store";

const RoleRedirect = () => {
  const { user_type } = useSelector((state: RootState) => state.user);

  if (user_type === "user") return <Navigate to="/user/dashboard" replace />;
  if (user_type === "shop") return <Navigate to="/shop/123" replace />;
  if (user_type === "vendor") return <Navigate to="/vendor" replace />;
  if (user_type === "delivery") return <Navigate to="/delivery" replace />;
  return <Navigate to="/login" replace />;
};

export default RoleRedirect;
