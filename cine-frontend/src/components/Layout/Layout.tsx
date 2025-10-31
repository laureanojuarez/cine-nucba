import {useEffect, useState} from "react";
import {Outlet, useLocation} from "react-router-dom";
import {Header} from "../Header/Header";
import {SideTab} from "../Tab/SideTab";
import {Login} from "../Auth/Login";
import {Register} from "../Auth/Register";
import {ProfileTab} from "../Tab/ProfileTab";
import {useAuth} from "../../store/auth";
import {Footer} from "../Footer/Footer";

const Layout = () => {
  const {pathname} = useLocation();
  const token = useAuth((s) => s.token);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    if (!token) setIsProfileOpen(false);
  }, [token]);

  return (
    <div className="min-h-screen bg-neutral-900">
      <Header
        onOpenLogin={() => setIsLoginOpen(true)}
        onOpenRegister={() => setIsRegisterOpen(true)}
        onOpenProfile={() => setIsProfileOpen(true)}
      />

      <main>
        <Outlet />
      </main>
      <Footer />

      {/* Tabs laterales */}
      <SideTab open={isLoginOpen} onClose={() => setIsLoginOpen(false)}>
        <Login
          onSuccess={() => {
            setIsLoginOpen(false);
          }}
        />
        <div className="mt-4 text-center">
          ¿No tienes cuenta?{" "}
          <button
            className="text-blue-600 underline"
            onClick={() => {
              setIsLoginOpen(false);
              setIsRegisterOpen(true);
            }}
          >
            Registrate
          </button>
        </div>
      </SideTab>

      <SideTab open={isRegisterOpen} onClose={() => setIsRegisterOpen(false)}>
        <Register
          onSuccess={() => {
            setIsRegisterOpen(false);
          }}
        />
        <div className="mt-4 text-center">
          ¿Ya tienes cuenta?{" "}
          <button
            className="text-blue-600 underline"
            onClick={() => {
              setIsRegisterOpen(false);
              setIsLoginOpen(true);
            }}
          >
            Inicia sesión
          </button>
        </div>
      </SideTab>

      <SideTab open={isProfileOpen} onClose={() => setIsProfileOpen(false)}>
        <ProfileTab onClose={() => setIsProfileOpen(false)} />
      </SideTab>
    </div>
  );
};

export default Layout;
