import s from "./BookingsFavorites.module.css";
import { useSelector, useDispatch } from "react-redux";
import { getFavorites } from "../../redux/Favorites/selectors";
import { useNavigate } from "react-router-dom";
import { clearFavorites } from "../../redux/Favorites/slice";
const BookingsFavorites = () => {
  const dispatch = useDispatch();
  const favorite = useSelector(getFavorites); // масив
  const favoriteCount = favorite.length;
  const navigate = useNavigate();

  const handleClear = () => {
    dispatch(clearFavorites());
  };
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

      <div className={s.buttons}>
        <button
          className={s.exploreButton}
          onClick={() => navigate("/favorites")}
          title="Explore Bookings"
          aria-label="Explore Favorites"
          type="button"
          disabled={favoriteCount === 0}
          style={{
            backgroundColor: favoriteCount > 0 ? "#4CAF50" : "#ccc",
            color: favoriteCount > 0 ? "#fff" : "#666",
            cursor: favoriteCount > 0 ? "pointer" : "not-allowed",
          }}
        >
          Explore Favorites
        </button>
        {favoriteCount > 0 && (
          <button
            className={s.clearButton}
            onClick={handleClear}
            title="Clear Favorites"
            aria-label="Clear Favorites"
          >
            Clear Favorites
          </button>
        )}
      </div>
    </div>
  );
};

export default BookingsFavorites;
