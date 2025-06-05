import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { selectFavorites } from "../../redux/Favorites/selectors";
import { toggleFavorite } from "../../redux/Favorites/slice";

import css from "./VansInfo.module.css";

const CamperInfo = ({ camper, isDetailed = false }) => {
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavorites);
  const isFavorite = favorites.includes(camper.id);

  return (
    <div className={clsx(css.info, isDetailed && css.detailed_info)}>
      <div className={css.info_title}>
        <h2 className={css.title}>{camper.name}</h2>
        {!isDetailed && (
          <div className={css.wrapper}>
            <p className={css.price}>€{camper.price.toFixed(2)}</p>
            <button
              className={css.button}
              onClick={() => dispatch(toggleFavorite(camper.id))}
              aria-label="Add to favorites"
            >
              <svg fill={isFavorite ? "#E44848" : "#101828"}>
                <use xlinkHref="/icons-sprite.svg#icon-favorite"></use>
              </svg>
            </button>
          </div>
        )}
      </div>

      <div className={css.info_details}>
        {isDetailed ? (
          <span className={css.rating_text}>
            <FontAwesomeIcon icon={faStar} color="#FFC107" />
            {camper.rating} ({camper.reviews.length} Reviews)
          </span>
        ) : (
          <a
            href={`/catalog/${camper.id}/reviews`}
            target="_blank"
            rel="noopener noreferrer"
            className={css.rating_link}
          >
            <svg>
              <use xlinkHref="/icons-sprite.svg#icon-star-yellow"></use>
            </svg>
            {camper.rating} ({camper.reviews.length} Reviews)
          </a>
        )}

        <span className={css.location}>
          <img
            src="/src/assets/Location.svg"
            alt="Location"
            className={css.icon}
          />
          {camper.location}
        </span>
      </div>

      {isDetailed && <p className={css.price}>€{camper.price.toFixed(2)}</p>}
    </div>
  );
};

export default CamperInfo;
