import s from "./ShowMoreButton.module.css";

const ShowMoreButton = ({ camperId }) => {
  return (
    <a
      href={`/catalog/${camperId}/features`}
      target="_blank"
      rel="noopener noreferrer"
      className={s.button}
    >
      Show more
    </a>
  );
};

export default ShowMoreButton;
