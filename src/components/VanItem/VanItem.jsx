import s from "./VanItem.module.css";
import ShowMoreButton from "../ShowMoreButton/ShowMoreButton";
export const VanItem = () => {
  return (
    <div className={s.container}>
      <div className={s.image_container}>
        <img src="" alt="Van" className={s.image} />
      </div>
      <div className={s.info_container}>
        <h2 className={s.title}>Van Name</h2>
        <p className={s.description}>This is a description of the van.</p>
        <p className={s.price}>$100/day</p>
        <ShowMoreButton />
      </div>
    </div>
  );
};
