import {Navigate, Outlet} from "react-router-dom";
import {useAuth} from "../store/auth";

export default function Protected() {
  const token = useAuth((state) => state.token);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
