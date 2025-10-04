import { useEffect } from "react";

const Layout = ({ children, fullWidthBanner = false }) => {
  const { pathname } = window.location;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  if (fullWidthBanner) {
    return <main className="w-full min-h-screen">{children}</main>;
  }

  return (
    <main className="w-full min-h-screen">
      <div className="max-w-5xl mx-auto w-full min-h-screen flex flex-col ">
        {children}
      </div>
    </main>
  );
};

export default Layout;
