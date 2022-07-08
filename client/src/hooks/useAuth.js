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

    const accounts = [
      "comercial@taondelivery.com.br",
      "diogomrizzi@gmail.com",
      "janaina.camargo_@live.com",
      "desenvolvimento@taondelivery.com.br",
      "bruno.lemospr@gmail.com",
      "jbracale128@gmail.com"
    ]
    let userData = jwt_decode(data.credential)

    if(accounts.includes(userData.email)){
      setUser(userData);
      navigate("/home", { replace: true });
    }else{
      alert('Not authorized')
    }
    
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
