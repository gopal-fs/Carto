import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const backend_url = import.meta.env.VITE_BACKEND_URL;

const CheckAuth = () => {
  const [isAuth, setIsAuth] = useState<boolean | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${backend_url}/getUser`, {
          withCredentials: true, 
        });

        setIsAuth(res.data.success);
      } catch {
        setIsAuth(false);
      }
    };

    fetchUser();
  }, []);

  
  if (isAuth === null) return <div>Loading...</div>;
  console.log("Hits")
 
  if (isAuth) return <Navigate to="/user/dashboard" replace />;
  return <Navigate to="/login" replace />;
};

export default CheckAuth;