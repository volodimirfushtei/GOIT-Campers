import s from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={s.loader_wrapper}>
      <div className={s.loader} />
    </div>
  );
};

export default Loader;
