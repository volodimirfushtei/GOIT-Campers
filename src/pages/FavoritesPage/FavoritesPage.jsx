// src/pages/FavoritesPage.jsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCampers } from "../../redux/Vans/operations";
import VanItem from "../../components/VanItem/VanItem";
import s from "./FavoritesPage.module.css";
const FavoritesPage = () => {
  const dispatch = useDispatch();
  const allCampers = useSelector((state) => state.campers.campers || []);
  const favorites = useSelector((state) => state.favorites.favorites || []);

  useEffect(() => {
    dispatch(fetchCampers());
  }, [dispatch]);

  if (allCampers.length === 0) {
    return <div className={s.noFavorites}>No favorite campers yet.</div>;
  }
  const favoriteCampers = allCampers.filter((camper) =>
    favorites.includes(camper.id)
  );
  if (favoriteCampers.length === 0) {
    return <div className={s.noFavorites}>No favorite campers found.</div>;
  }
  return (
    <div className={s.favoritesPage}>
      {favoriteCampers.map((camper) => (
        <VanItem key={camper.id} camper={camper} />
      ))}
    </div>
  );
};

export default FavoritesPage;
