import s from "./Catalog.module.css";
import SideBar from "../../components/SideBar/SideBar";
import VanList from "../../components/VanList/VanList";
const Catalog = () => {
  return (
    <div className={s.container_catalog}>
      <SideBar />
      <VanList />
    </div>
  );
};

export default Catalog;
