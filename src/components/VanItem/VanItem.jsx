import s from "./VanItem.module.css";
import ShowMoreButton from "../ShowMoreButton/ShowMoreButton";
import VanGallery from "../VanGallery/VanGallery";
import { faHeart, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector, useDispatch } from "react-redux";
import { toggleFavorite } from "../../redux/Favorites/slice";
import { isFavorite as selectIsFavorite } from "../../redux/Favorites/selectors";
import VansFeatures from "../VansFeatures/VansFeatures";

export default function VanItem({ camper }) {
  const dispatch = useDispatch();
  const isFavorite = useSelector((state) => selectIsFavorite(state, camper.id));

  const handleFavoriteClick = () => {
    console.log("Clicked:", camper.id);
    dispatch(toggleFavorite(camper.id));
    console.log("Favorite status:", isFavorite);
  };
  if (!camper) {
    return <div className={s.loading}>Loading...</div>;
  }
  if (!camper.gallery || camper.gallery.length === 0) {
    return <div className={s.error}>No images available</div>;
  }

  return (
    <div className={s.card}>
      <div className={s.imageContainer}>
        <VanGallery images={camper.gallery} isPreview={true} />
      </div>
      <div className={s.infoContainer}>
        <div className={s.header}>
          <h3 className={s.title}>{camper.name}</h3>
          <span className={s.price}>
            <span className={s.currency}>€</span>
            {camper.price}
            <span className={s.perDay} onClick={handleFavoriteClick}>
              <FontAwesomeIcon
                icon={faHeart}
                color={isFavorite ? "red" : "#FFC10a"}
              />
            </span>
          </span>
        </div>
        <div className={s.ratingLocation}>
          <span className={s.rating_text}>
            <FontAwesomeIcon icon={faStar} color="#FFC107" />
            {camper.rating} ({camper.reviews.length} Reviews)
          </span>
          <span className={s.location}>
            <svg className={s.icon}>
              <use xlinkHref="/icons-sprite.svg#icon-map" />
            </svg>
            {camper.location}
          </span>
        </div>
        <p className={s.description}>{camper.description}</p>

        <VansFeatures camper={camper} detailed={false} />
        <div className={s.ShowMoreButton_wrapper}>
          {" "}
          <ShowMoreButton camperId={camper.id} />
        </div>
      </div>
    </div>
  );
}
