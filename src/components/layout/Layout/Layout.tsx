import {useEffect} from "react";
import {Outlet, useLocation} from "react-router-dom";
import {Header} from "../Header/Header";
import {SideTab} from "../../ui/SideTab";
import {ProfileTab} from "../../../features/profile/components/ProfileTab/ProfileTab";
import {useAuth} from "../../../store/auth";
import {Footer} from "../Footer/Footer";
import {useUI} from "../../../store/useUI";
import { AuthTab } from "../../../features/auth/components/AuthTab";

const Layout = () => {
  const {pathname} = useLocation();
  const token = useAuth((s) => s.token);

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
        onOpenProfile={openProfile}
      />

      <main>
        <Outlet />
      </main>
      <Footer />

      {/* Tabs laterales */}
      <SideTab open={loginOpen} onClose={closeLogin}>
       <AuthTab onClose={closeLogin} />
      </SideTab>

      <SideTab open={profileOpen} onClose={closeProfile}>
        <ProfileTab onClose={closeProfile} />
      </SideTab>
    </div>
  );
};

export default Layout;
