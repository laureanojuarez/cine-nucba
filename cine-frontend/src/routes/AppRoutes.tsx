import {Route, Routes} from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import App from "../App";
import LoginPage from "../pages/Auth/Login";
import Home from "../pages/Home/Home";
import RegisterPage from "../pages/Auth/Register";
import FilmDetail from "../pages/Films/[id]";
import Checkout from "../pages/Checkout/Checkout";
import ProfilePage from "../pages/Profile/profile";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="films/:id" element={<FilmDetail />} />
        <Route path="profile" element={<ProfilePage />} />
        {/* Rutas protegidas */}
        <Route
          path="checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />

        {/* 404 */}
        <Route path="*" element={<h1>Not Found 404</h1>} />
      </Route>
    </Routes>
  );
}
