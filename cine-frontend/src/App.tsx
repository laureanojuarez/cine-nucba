import { Outlet } from "react-router-dom";
import { Header } from "./components/Header/Header";
import Layout from "./components/Layout/Layout";
import { Footer } from "./components/Footer/Footer";

function App() {
  return (
    <Layout>
      <Header />
      <Outlet />
      <Footer />
    </Layout>
  );
}

export default App;
