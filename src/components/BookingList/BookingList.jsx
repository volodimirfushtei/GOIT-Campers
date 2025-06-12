import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import styles from "./BookingList.module.css";

const fetchBookings = async () => {
  const res = await fetch("http://localhost:5001/bookings");
  if (!res.ok) throw new Error("Failed to fetch bookings");
  return res.json();
};

const deleteBooking = async (id) => {
  const res = await fetch(`http://localhost:5001/bookings/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete booking");
  return res.json();
};

const BookingsList = () => {
  const queryClient = useQueryClient();

  const {
    data: bookings = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["bookings"],
    queryFn: fetchBookings,
  });

  const mutation = useMutation({
    mutationFn: deleteBooking,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] }); // автоматично оновити
    },
  });

  if (isLoading) return <p className={styles.loading}>Loading bookings...</p>;
  if (isError) return <p className={styles.error}>⚠️ {error.message}</p>;
  if (!bookings.length)
    return <p className={styles.noData}>No bookings found.</p>;

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
            <button
              className={styles.deleteButton}
              onClick={() => mutation.mutate(booking._id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      <p className={styles.total}>
        Total Bookings: <strong>{bookings.length}</strong>
      </p>
    </div>
  );
};

export default BookingsList;
