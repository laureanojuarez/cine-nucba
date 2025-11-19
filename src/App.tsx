import Home from "./pages/Home/Home";
import FilmDetail from "./pages/Films/[id]";
import Layout from "./components/Layout/Layout";
import Protected from "./routes/Protected";
import Dashboard from "./pages/Dashboard/Dashboard";
import Admin from "./pages/Admin/Admin";
import Support from "./pages/Support/Support";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {useAuth} from "./store/auth";
import {useEffect, useState} from "react";
import axios from "axios";
import Checkout from "./pages/Checkout/Checkout";

function App() {
  const token = useAuth((state) => state.token);
  const setUser = useAuth((state) => state.setUser);
  const logout = useAuth((state) => state.logout);

   const [isAuthChecking, setIsAuthChecking] = useState(!!token);

useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          logout();
          setIsAuthChecking(false);
        }
        return Promise.reject(error);
      }
    );

    return () => axios.interceptors.response.eject(interceptor);
  }, [logout]);

  useEffect(() => {
    if (!token) {
      setIsAuthChecking(false);
      return;
    }

    const fetchUser = async () => {
      try {
        const { data } = await axios.get("/auth/me");
        setUser(data);
      } catch (error) {
        console.error("Sesión expirada o inválida");
        logout();
      } finally {
        setIsAuthChecking(false);
      }
    };

    fetchUser();
  }, [token, setUser, logout]);

  // 3. Spinner de carga inicial (Full Screen)
  if (isAuthChecking) {
    return (
      <div className="min-h-screen bg-neutral-900 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="films/:id" element={<FilmDetail />} />
          <Route path="support" element={<Support />} />
          <Route path="checkout" element={<Checkout />} />

          {/* Rutas protegidas */}
          <Route element={<Protected />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="admin" element={<Admin />} />
          </Route>

          <Route path="*" element={<h1 className="text-white text-center mt-10">404 - Pagina no encontrada</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
