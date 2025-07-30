import { NavLink } from "react-router-dom";
import clsx from "clsx";
import css from "./Header.module.css";
import loginIcon from "../../assets/log-in-01.svg"; // шляху підлаштуй, якщо треба

const Header = () => {
  return (
    <header className={css.header}>
      <div className={`container containerHeader`}>
        <div className={css.inner}>
          <div className={css.logo}>
            <svg
              className={css.logoIcon}
              width="28"
              height="28"
              fill="currentColor"
            >
              <use href="/icons.svg#ukraine" />
            </svg>
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
            <NavLink to="/login" className={css.login}>
              <img
                src={loginIcon}
                alt="Log in icon"
                className={css.loginIcon}
                width="20"
                height="20"
              />
              <p className={css.loginText}>Log in</p>
            </NavLink>

            <NavLink to="/register" className={css.register}>
              <p className={css.registerText}>Registration</p>
            </NavLink>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
