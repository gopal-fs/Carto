import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import type { RootState } from "../context/store";
import toast from "react-hot-toast";

const Protected = () => {
  const { user_id, isAuthenticated } = useSelector(
    (state: RootState) => state.user
  );

  if (!user_id || !isAuthenticated) {
    toast.error("Please Login");
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default Protected;