import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    bookingDate: { type: String, required: true },
    comment: { type: String },
  },
  { timestamps: true }
);
// Видалити __v при JSON.stringify
bookingSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret.__v; // видаляємо __v
    return ret;
  },
});
const Booking =
  mongoose.models.Booking || mongoose.model("Booking", bookingSchema);

export default Booking;
