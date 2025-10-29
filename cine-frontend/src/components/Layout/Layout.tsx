import {useEffect} from "react";
import {Header} from "../Header/Header";
import {Footer} from "../Footer/Footer";
import {Outlet, useLocation} from "react-router-dom";

const Layout = () => {
  const {pathname} = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="layout bg-stone-900">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
