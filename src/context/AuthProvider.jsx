import { createContext, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // current logged-in user
  const [token, setToken] = useState(null); // JWT token
  const AuthInfo = {
    user,
    setUser,
    token,
    setToken,
  };
  return (
    <AuthContext.Provider value={AuthInfo}>{children}</AuthContext.Provider>
  );
};
export default AuthProvider;
