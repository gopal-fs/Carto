import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import type { AppDispatch, RootState } from "../context/store";
import { fetchShop } from "../context/shop";


const RoleRedirect = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user_type } = useSelector((state: RootState) => state.user);
  const { hydrated, isRegistered, isApproved, shop_id, loading } = useSelector(
    (state: RootState) => state.shop
  );

  useEffect(() => {
    if (user_type === "shop" && !hydrated && !loading) {
      dispatch(fetchShop());
    }
  }, [user_type, hydrated, loading, dispatch]);

  if (user_type === "user") return <Navigate to="/user/dashboard" replace />;
  if (user_type === "vendor") return <Navigate to="/vendor" replace />;
  if (user_type === "delivery") return <Navigate to="/delivery" replace />;
  if (user_type === "admin") return <Navigate to="/admin" replace />;

  if (user_type === "shop") {
    if (!hydrated) {
      return (
        <div className="min-h-screen flex items-center justify-center text-gray-500">
          Loading...
        </div>
      );
    }
    if (!isRegistered) return <Navigate to="/shop/register" replace />;
    if (!isApproved) return <Navigate to="/shop/register" replace />;
    return <Navigate to={`/shop/${shop_id}`} replace />;
  }

  return <Navigate to="/login" replace />;
};

export default RoleRedirect;
