import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import connectDB from "./db.js";
import Booking from "./models/Booking.js";
import { sendBookingEmail } from "./mailer.js";
dotenv.config();
connectDB();
const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
// Middleware для логування запитів
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.post("/bookings", async (req, res) => {
  const { name, email, bookingDate, comment } = req.body;
  if (!name || !email || !bookingDate) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  try {
    const booking = new Booking({ name, email, bookingDate, comment });
    console.log("Booking data received:", booking);
    await booking.save();
    console.log("Booking saved:", booking);

    const bookingResponse = booking.toJSON();
    delete bookingResponse.__v; // видаляємо __v з відповіді
    // Відправка підтвердження на email
    await sendBookingEmail({
      name: booking.name,
      email: booking.email,
      bookingDate: booking.bookingDate,
      comment: booking.comment,
    });
    console.log("Booking email sent to:", booking.email);

    res.status(201).json({ message: "Booking saved", booking });
  } catch (err) {
    console.error("Save booking error:", err);
    res.status(500).json({ message: "Failed to save booking" });
  }
});

app.get("/bookings/:id", async (req, res) => {
  const { id } = req.params;
  // Перевірка валідності ObjectId перед запитом
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid booking ID" });
  }
  try {
    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    console.log("Booking retrieved:", booking);
    res.status(200).json(booking);
  } catch (err) {
    console.error("Get booking error:", err);
    res.status(500).json({ message: "Failed to retrieve booking" });
  }
});

app.delete("/bookings/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid booking ID" });
  }
  try {
    const booking = await Booking.findByIdAndDelete(id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    console.log("Booking deleted:", booking);
    res.status(200).json({ message: "Booking deleted", booking });
  } catch (err) {
    console.error("Delete booking error:", err);
    res.status(500).json({ message: "Failed to delete booking" });
  }
});
app.get("/bookings", async (req, res) => {
  try {
    const bookings = await Booking.find();
    console.log("Bookings retrieved:", bookings);
    res.status(200).json(bookings);
  } catch (err) {
    console.error("Get bookings error:", err);
    res.status(500).json({ message: "Failed to retrieve bookings" });
  }
});

app.listen(process.env.PORT || 5001, () => {
  console.log(`Server running on port ${process.env.PORT || 5001}`);
});
