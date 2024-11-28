import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AppContext } from "../context/appContext";

const AuthProvider = ({ children }) => {
  const {token} = useContext(AppContext);

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default AuthProvider;
