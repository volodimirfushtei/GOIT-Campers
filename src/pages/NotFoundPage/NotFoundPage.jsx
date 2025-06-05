import { useNavigate } from "react-router-dom";

import css from "./NotFoundPage.module.css";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className={css.wrapper}>
      <img className={css.image} src="/src/assets/images/notFound.jpg" />
      <button className={css.button} onClick={() => navigate("/")}>
        Back to Home
      </button>
    </div>
  );
};
export default NotFoundPage;
