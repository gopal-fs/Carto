import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import axios from "axios";
import type { RootState, AppDispatch } from "../context/store";
import { setUser } from "../context/user";

const backend_url = import.meta.env.VITE_BACKEND_URL;

const Protected = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated,user_type } = useSelector((state: RootState) => state.user);
  const [isAuth, setIsAuth] = useState<boolean | null>(
    isAuthenticated ? true : null
  );

  useEffect(() => {
    if (isAuthenticated) return;

    const fetchUser = async () =>{
      try {
        const res = await axios.get(`${backend_url}/getUser`, {
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(setUser(res.data.user));
          setIsAuth(true);
        } else {
          setIsAuth(false);
        }
      } catch {
        setIsAuth(false);
      }
    };

    fetchUser();
  }, [isAuthenticated, dispatch]);

  if (isAuth === null) return <div>Loading...</div>;
  if (!isAuth) return <Navigate to="/login" replace />;

  
  if(user_type=="user") return <Navigate to="/user/dashboard" />
  if(user_type=="shop") return <Navigate to="/shop/123" />
  if(user_type=="vendor") return <Navigate to="/vendor" />
  else return <Navigate to="/delivery" />
};

export default Protected;
