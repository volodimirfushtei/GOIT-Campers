import { Outlet } from "react-router-dom";
import Navigation from "../Navigation/Navigation.jsx";
const Layout = ({ children }) => {
  return (
    <div>
      <Navigation />
      <main>{children || <Outlet />} </main>
    </div>
  );
};

export default Layout;
