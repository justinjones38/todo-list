import { useLocation, Outlet } from "react-router";
import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router";

export default function RequireAuth({ children }) {
  const { isAuthenticated } = useAuth();
  const { pathname } = useLocation();


  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ pathname }} replace />;
  }
  return <Outlet />;
}
