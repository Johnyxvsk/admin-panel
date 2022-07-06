import { Link, Navigate, useOutlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Home from "../../pages/home/Home";

export const ProtectedLayout = () => {
  const { user } = useAuth();
  const outlet = useOutlet();

  if (!user) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      {outlet}
    </div>
  );
};
