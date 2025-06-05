import s from "./VanItem.module.css";
import ShowMoreButton from "../ShowMoreButton/ShowMoreButton";
import VanGallery from "../VanGallery/VanGallery";
import { faHeart, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function VanItem({ camper }) {
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
            <span className={s.perDay}>
              <FontAwesomeIcon icon={faHeart} color="#FFC10a" />
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
              <use xlinkHref="/src/assets/images/Location.png" />
            </svg>
            {camper.location}
          </span>
        </div>
        <p className={s.description}>{camper.description}</p>
        <p className={s.type}>{camper.type}</p>

        <ShowMoreButton camperId={camper.id} />
      </div>
    </div>
  );
}
