import Home from "./pages/Home/Home";
import FilmDetail from "./pages/Films/[id]";
import Layout from "./components/Layout/Layout";
import Protected from "./routes/Protected";
import Dashboard from "./pages/Dashboard/Dashboard";
import Admin from "./pages/Admin/Admin";
import Support from "./pages/Support/Support";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {useAuth} from "./store/auth";
import {useEffect} from "react";
import axios from "axios";
import Checkout from "./pages/Checkout/Checkout";

function App() {
  const token = useAuth((state) => state.token);
  const setUser = useAuth((state) => state.setUser);
  const logout = useAuth((state) => state.logout);

  useEffect(() => {
    if (!token) return;

    const fetchUser = async () => {
      try {
        const {data} = await axios.get("/auth/me");
        setUser(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        logout();
      }
    };
    fetchUser();
  }, [token, setUser, logout]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="films/:id" element={<FilmDetail />} />
          <Route path="support" element={<Support />} />
          <Route path="checkout" element={<Checkout />} />
          <Route element={<Protected />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="admin" element={<Admin />} />
          </Route>
          <Route path="*" element={<h1>Not Found 404</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
