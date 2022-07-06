import { createContext, useContext, useMemo } from "react";
import jwt_decode from 'jwt-decode'
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", null);
  //const [userData, setUserData] = useLocalStorage("userData", null);
  const navigate = useNavigate();

  const login = async (data) => {
    setUser(jwt_decode(data.credential));
    //let userData = jwt_decode(data.credential)
    //setUserData(userData)
    navigate("/home", { replace: true });
  };

  const logout = () => {
    setUser(null);
    navigate("/", { replace: true });
  };

  const value = useMemo(
    () => ({
      user,
      //userData,
      login,
      logout
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
