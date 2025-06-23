import { NavLink } from "react-router-dom";
import clsx from "clsx";
import s from "./Navigation.module.css";
import Logo from "../Logo/Logo.jsx";
import MobileMenu from "../MobileMenu/MobileMenu.jsx";
import Switch from "../Switch/Switch";

const Navigation = () => {
  const buildLinkClass = ({ isActive }) => {
    return clsx(s.link, isActive && s.activeLink);
  };

  return (
    <div className={s.wrapper}>
      <Logo />
      <div className={s.MobileMenu}>
        <MobileMenu />
      </div>
      <div className={s.wrapperLinks}>
        <NavLink className={buildLinkClass} to="/">
          Home
        </NavLink>
        <NavLink className={buildLinkClass} to="/catalog">
          Catalog
        </NavLink>
        <NavLink className={buildLinkClass} to="/favorites">
          Favorites
        </NavLink>
        <div className={s.MobileMenu}></div>
      </div>
      <div className={s.switch}>
        <Switch />
      </div>
    </div>
  );
};

export default Navigation;
