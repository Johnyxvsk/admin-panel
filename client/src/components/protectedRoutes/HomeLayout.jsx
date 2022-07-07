import { Navigate, useOutlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
//import { AppBar } from "./AppBar";
import Home from "../../pages/home/Home";
import Login from "../../pages/login/Login";
export const HomeLayout = () => {
  const { user } = useAuth();
  const outlet = useOutlet();

  if (user) {
    return <Navigate to='/home' replace />;
  }

  return (
    <div>
      {outlet}
    </div>
  );
};
