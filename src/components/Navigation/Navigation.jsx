import { NavLink } from "react-router-dom";
import clsx from "clsx";
import s from "./Navigation.module.css";
import Logo from "../Logo/Logo.jsx";
const Navigation = () => {
  const buildLinkClass = ({ isActive }) => {
    return clsx(s.link, isActive && s.activeLink);
  };
  return (
    <div className={s.wrapper}>
      <Logo />
      <div className={s.wrapperLinks}>
        <NavLink className={buildLinkClass} to="/">
          Home
        </NavLink>
        <NavLink className={buildLinkClass} to="/catalog">
          Catalog
        </NavLink>
      </div>
    </div>
  );
};

export default Navigation;
