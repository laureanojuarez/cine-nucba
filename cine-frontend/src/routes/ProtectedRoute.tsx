import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  isSignedIn?: boolean;
  children: React.ReactNode;
}

export default function ProtectedRoute({
  isSignedIn,
  children,
}: ProtectedRouteProps) {
  const signed = isSignedIn || !!localStorage.getItem("token");
  if (!signed) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
