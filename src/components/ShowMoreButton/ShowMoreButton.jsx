import { Link } from "react-router-dom";
import s from "./ShowMoreButton.module.css";

const ShowMoreButton = ({ camperId }) => {
  return (
    <Link to={`/catalog/${camperId}/features`} className={s.button}>
      Show more
    </Link>
  );
};

export default ShowMoreButton;
