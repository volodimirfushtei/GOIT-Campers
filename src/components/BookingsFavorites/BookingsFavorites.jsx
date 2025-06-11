import s from "./BookingsFavorites.module.css";
import { useSelector } from "react-redux";
import { getFavorites } from "../../redux/Favorites/selectors";
import { useNavigate } from "react-router-dom";
const BookingsFavorites = () => {
  const favorite = useSelector(getFavorites); // масив
  const favoriteCount = favorite.length;
  const navigate = useNavigate();
  return (
    <div className={s.BookingsFavorites}>
      <h2 className={s.title}>Favorites</h2>
      <p className={s.message}>
        {favoriteCount > 0
          ? `You have ${favoriteCount} favorite booking${
              favoriteCount > 1 ? "s" : ""
            }!`
          : "You have no favorite bookings yet."}
      </p>

      {favoriteCount === 0 && (
        <p className={s.message}>Add some to see them here!</p>
      )}

      <button
        className={s.button}
        onClick={() => navigate("/favorites")}
        title="Explore Bookings"
        aria-label="Explore Favorites"
        type="button"
        disabled={favoriteCount === 0}
        style={{
          backgroundColor: favoriteCount > 0 ? "#4CAF50" : "#ccc",
          cursor: favoriteCount > 0 ? "pointer" : "not-allowed",
        }}
      >
        Explore Favorites
      </button>
    </div>
  );
};

export default BookingsFavorites;
