import { NavLink } from "react-router-dom";
import { useState } from "react";
import clsx from "clsx";
import css from "./Header.module.css";
import loginIcon from "../../assets/log-in-01.svg";
import Ukraine from "../../assets/ukraine.svg";
import LoginModal from "../Modals/LoginModal";
import RegisterModal from "../Modals/RegisterModal";
import { useAuth } from "../../hooks/useAuth";

const Header = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const { user, logout } = useAuth() ?? {};

  const handleLogout = async () => {
    try {
      await logout();
    } catch (e) {
      console.error("Logout failed", e);
    }
  };

  return (
    <header className={css.header}>
      <div className={`container containerHeader`}>
        <div className={css.inner}>
          <div className={css.logo}>
            <img
              src={Ukraine}
              alt="Ukraine"
              className={css.logoIcon}
              width="28"
              height="28"
            />
            <p className={css.logoText}>LearnLingo</p>
          </div>

          <nav className={css.nav}>
            <NavLink
              to="/"
              className={({ isActive }) =>
                clsx(css.navLink, isActive && css.active)
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/teachers"
              className={({ isActive }) =>
                clsx(css.navLink, isActive && css.active)
              }
            >
              Teachers
            </NavLink>
          </nav>

          <div className={css.auth}>
            {user ? (
              <>
                <div className={css.userInfo}>
                  <span className={css.userName}>
                    {user.displayName || user.email?.split("@")[0]}
                  </span>
                </div>
                <button
                  type="button"
                  className={css.logout}
                  onClick={handleLogout}
                >
                  Log out
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  className={clsx(css.login, css.buttonReset)}
                  onClick={() => setShowLogin(true)}
                >
                  <img
                    src={loginIcon}
                    alt="Log in icon"
                    className={css.loginIcon}
                    width="20"
                    height="20"
                  />
                  <p className={css.loginText}>Log in</p>
                </button>

                <button
                  type="button"
                  className={clsx(css.register, css.buttonReset)}
                  onClick={() => setShowRegister(true)}
                >
                  <p className={css.registerText}>Registration</p>
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {showLogin && (
        <LoginModal
          onClose={() => setShowLogin(false)}
          onSuccess={() => setShowLogin(false)}
        />
      )}
      {showRegister && (
        <RegisterModal
          onClose={() => setShowRegister(false)}
          onSuccess={() => setShowRegister(false)}
        />
      )}
    </header>
  );
};

export default Header;
