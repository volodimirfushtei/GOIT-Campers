import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bookings: [],
};
const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setBookings: (state, action) => {
      state.bookings = action.payload;
    },
    addBooking: (state, action) => {
      state.bookings.push(action.payload);
    },
    removeBooking: (state, action) => {
      state.bookings = state.bookings.filter(
        (booking) => booking._id !== action.payload
      );
    },
  },
});
export const { setBookings, addBooking, removeBooking } = bookingSlice.actions;
export const bookingReducer = bookingSlice.reducer;
