
export const selectBookings = (state) => state.booking.bookings;
export const getBookingById = (state, bookingId) =>
  state.booking.bookings.find((booking) => booking._id === bookingId);