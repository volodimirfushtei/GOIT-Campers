import { useEffect, useState } from "react";
import styles from "./BookingList.module.css";

const BookingsList = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5001/bookings")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load bookings");
        return res.json();
      })
      .then((data) => {
        setBookings(data);
        setError(null);
      })
      .catch((err) => {
        console.error("Error fetching bookings:", err);
        setError(err.message || "Something went wrong");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className={styles.loading}>Loading bookings...</p>;
  }

  if (error) {
    return <p className={styles.error}>⚠️ {error}</p>;
  }

  if (!bookings.length) {
    return <p className={styles.noData}>No bookings found.</p>;
  }

  return (
    <div className={styles.bookings}>
      <h2 className={styles.title}>All Bookings</h2>
      <ul className={styles.bookingsList}>
        {bookings.map((booking) => (
          <li key={booking._id} className={styles.bookingItem}>
            <strong>{booking.name}</strong> –{" "}
            {new Date(booking.bookingDate).toLocaleDateString()} –{" "}
            <span className={styles.email}>{booking.email}</span>
            {booking.comment && (
              <span className={styles.comment}>Comment: {booking.comment}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookingsList;
