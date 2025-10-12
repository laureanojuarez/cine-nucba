import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/Auth/Login";
import Home from "./pages/Home/Home";
import RegisterPage from "./pages/Auth/Register";
import FilmDetail from "./pages/Films/[id]";
import ProfilePage from "./pages/Profile/Profile";
import Layout from "./components/Layout/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="films/:id" element={<FilmDetail />} />
          <Route path="profile" element={<ProfilePage />} />
          {/* Rutas protegidas */}

          {/* 404 */}
          <Route path="*" element={<h1>Not Found 404</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
