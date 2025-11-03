import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home/Home";
import FilmDetail from "./pages/Films/[id]";
import Layout from "./components/Layout/Layout";
import Protected from "./routes/Protected";
import Dashboard from "./pages/Dashboard/Dashboard";
import Admin from "./pages/Admin/Admin";
import Support from "./pages/Support/Support";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="films/:id" element={<FilmDetail />} />
          <Route path="support" element={<Support />} />
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
