import {useEffect, useState} from "react";
import {Outlet, useLocation} from "react-router-dom";
import {Header} from "../Header/Header";
import {SideTab} from "../Tab/SideTab";
import {Login} from "../Auth/Login";
import {Register} from "../Auth/Register";
import {ProfileTab} from "../Tab/ProfileTab/ProfileTab";
import {useAuth} from "../../store/auth";
import {Footer} from "../Footer/Footer";
import {useUI} from "../../store/useUI";

const Layout = () => {
  const {pathname} = useLocation();
  const token = useAuth((s) => s.token);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const {
    loginOpen,
    profileOpen,
    openLogin,
    closeLogin,
    openProfile,
    closeProfile,
  } = useUI();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    if (!token) closeProfile();
  }, [token, closeProfile]);

  return (
    <div className="min-h-screen bg-neutral-900">
      <Header
        onOpenLogin={openLogin}
        onOpenRegister={() => setIsRegisterOpen(true)}
        onOpenProfile={openProfile}
      />

      <main>
        <Outlet />
      </main>
      <Footer />

      {/* Tabs laterales */}
      <SideTab open={loginOpen} onClose={closeLogin}>
        <Login
          onSuccess={() => {
            closeLogin();
          }}
        />
        <div className="mt-4 text-center text-white">
          ¿No tienes cuenta?{" "}
          <button
            className="text-blue-600 underline"
            onClick={() => {
              closeLogin();
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
              openLogin();
            }}
          >
            Inicia sesión
          </button>
        </div>
      </SideTab>

      <SideTab open={profileOpen} onClose={closeProfile}>
        <ProfileTab onClose={closeProfile} />
      </SideTab>
    </div>
  );
};

export default Layout;
