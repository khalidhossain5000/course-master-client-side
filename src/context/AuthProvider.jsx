'use client'
import useAxios from "@/hooks/AxiosApiCallHooks/useAxios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // current logged-in user
  const [token, setToken] = useState(null); // JWT token
  const [loading, setLoading] = useState(true);
  const axiosInstance=useAxios()
  useEffect(() => {
    const restoreUser = async () => {
      try {
        const res = await axiosInstance.get("/api/auth/refresh", { withCredentials: true });
        setUser(res.data.user);
        setToken(res.data.accessToken);
      } catch (err) {
        setUser(null);
        setToken(null);
      } finally {
        setLoading(false);
      }
    };
    restoreUser();
  }, []);


  // LOG OUT USER
  const logout = async () => {
  try {
    await axiosInstance.post("/api/auth/logout");

    setUser(null); 
    setLoading(false);

    console.log("User logged out");
  } catch (error) {
    console.log("Logout error:", error);
  }
};
const userRole=user?.role
  const AuthInfo = {
    user,
    setUser,
    token,
    setToken,
    loading ,
    logout,
    userRole
  };
  console.log(token,user,'user token user');
  return (
    <AuthContext.Provider value={AuthInfo}>{children}</AuthContext.Provider>
  );
};
export default AuthProvider;
