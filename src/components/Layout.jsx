import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { siteInfo } from "../data/api.js";

export default function Layout() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <header className="header">
        <div className="container header-in">
          <Link to="/" className="logo">📷 {siteInfo.name}</Link>
          <nav>
            <NavLink to="/" end>الرئيسية</NavLink>
            <NavLink to="/blog">المدونة</NavLink>
          </nav>
        </div>
      </header>
      <main><Outlet /></main>
      <footer className="footer">
        <div className="container">
          <p>{siteInfo.description}</p>
          <small>© {new Date().getFullYear()} {siteInfo.name} — {siteInfo.email}</small>
        </div>
      </footer>
    </>
  );
}
