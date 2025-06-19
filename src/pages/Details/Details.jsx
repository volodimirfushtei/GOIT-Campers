import { useEffect } from "react";
import { NavLink, Outlet, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";

import {
  selectCurrentCamper,
  selectIsLoading,
  selectError,
} from "../../redux/Vans/selectors";
import { fetchCamperById } from "../../redux/Vans/operations";

import Loader from "../../components/Loader/Loader";
import VanGallery from "../../components/VanGallery/VanGallery";
import VansInfo from "../../components/VansInfo/VansInfo";
import css from "./Details.module.css";
import BookingForm from "../../components/BookingForm/BookingForm";
import BookingsList from "../../components/BookingList/BookingList";
import BookingsFavorites from "../../components/BookingsFavorites/BookingsFavorites";
const Details = () => {
  const { camperId } = useParams();
  const dispatch = useDispatch();
  const camper = useSelector(selectCurrentCamper);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  useEffect(() => {
    if (camperId) {
      dispatch(fetchCamperById(camperId));
    }
  }, [dispatch, camperId]);

  if (!camper) {
    return <Loader />;
  }

  const buildLinkClass = ({ isActive }) =>
    clsx(css.link, isActive && css.active);

  return (
    <main className={css.details_page}>
      <div className={css.details_main}>
        <VansInfo camper={camper} isDetailed={true} />
        <VanGallery images={camper.gallery} />
        <div className={css.description}>
          <p className={css.description_text}>{camper.description}</p>
        </div>
      </div>
      <nav className={css.navigation}>
        <NavLink to="features" className={buildLinkClass}>
          Features
        </NavLink>
        <NavLink to="reviews" className={buildLinkClass}>
          Reviews
        </NavLink>
      </nav>

      <hr className={css.details_line} />

      <div className={css.booking_section}>
        <BookingForm className={css.booking_form} />
        <div className={css.outlet}>
          <Outlet />
        </div>
      </div>
      {isLoading && <Loader />}
      {error ? (
        <div className="text-red-600 text-sm text-center">⚠️ {error}</div>
      ) : (
        <div className="w-full ">
          <BookingsList className={css.bookings_list} />
        </div>
      )}
      <BookingsFavorites className={css.bookings_favorites} />
    </main>
  );
};

export default Details;
