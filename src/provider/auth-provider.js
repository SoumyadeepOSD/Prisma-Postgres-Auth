import { Navigate } from "react-router-dom";

const AuthProvider = ({ children }) => {
const token = window.localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default AuthProvider;
