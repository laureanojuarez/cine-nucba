import {useEffect, useState} from "react";
import {Header} from "../Header/Header";
import {Footer} from "../Footer/Footer";
import {Outlet, useLocation} from "react-router-dom";
import {SideTab} from "../Tab/SideTab";
import {Login} from "../Auth/Login";
import {Register} from "../Auth/Register";
import {ProfileTab} from "../Tab/ProfileTab";

const Layout = () => {
  const {pathname} = useLocation();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="layout bg-stone-900">
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
        <LoginTabContent
          onRegister={() => {
            setIsLoginOpen(false);
            setIsRegisterOpen(true);
          }}
          onSuccess={() => setIsLoginOpen(false)}
        />
      </SideTab>
      <SideTab open={isRegisterOpen} onClose={() => setIsRegisterOpen(false)}>
        <RegisterTabContent
          onLogin={() => {
            setIsRegisterOpen(false);
            setIsLoginOpen(true);
          }}
          onSuccess={() => setIsRegisterOpen(false)}
        />
      </SideTab>
      <SideTab open={isProfileOpen} onClose={() => setIsProfileOpen(false)}>
        <ProfileTab onClose={() => setIsProfileOpen(false)} />
      </SideTab>
    </div>
  );
};

function LoginTabContent({
  onRegister,
  onSuccess,
}: {
  onRegister: () => void;
  onSuccess: () => void;
}) {
  return (
    <div>
      <Login onSuccess={onSuccess} />
      <div className="mt-4 text-center">
        ¿No tienes cuenta?{" "}
        <button className="text-blue-500 underline" onClick={onRegister}>
          Registrate
        </button>
      </div>
    </div>
  );
}

function RegisterTabContent({
  onLogin,
  onSuccess,
}: {
  onLogin: () => void;
  onSuccess: () => void;
}) {
  return (
    <div>
      <Register onSuccess={onSuccess} />
      <div className="mt-4 text-center">
        ¿Ya tienes cuenta?{" "}
        <button className="text-blue-500 underline" onClick={onLogin}>
          Inicia sesión
        </button>
      </div>
    </div>
  );
}

export default Layout;
