import {Navigate, Outlet} from "react-router-dom";
import {useAuth} from "../store/auth";
import {useEffect} from "react";
import {useUI} from "../store/useUI";

export default function Protected() {
  const token = useAuth((state) => state.token);
  const openLogin = useUI((s) => s.openLogin);

  useEffect(() => {
    if (!token) openLogin();
  }, [token, openLogin]);

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
