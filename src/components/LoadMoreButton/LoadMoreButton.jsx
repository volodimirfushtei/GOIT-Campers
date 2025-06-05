import s from "./LoadMoreButton.module.css";

const ShowMoreButton = ({ onClick }) => {
  return (
    <button className={s.button} onClick={onClick}>
      Load more
    </button>
  );
};

export default ShowMoreButton;
