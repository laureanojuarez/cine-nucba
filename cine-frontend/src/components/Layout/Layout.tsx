import { useEffect } from "react";
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import { Outlet, useLocation } from "react-router-dom";

const Layout = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="layout">
      <Header />
      <main className="max-w-5xl mx-auto w-full min-h-screen flex flex-col ">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
