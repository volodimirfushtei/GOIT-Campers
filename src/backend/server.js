import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import connectDB from "./db.js";
import Booking from "./models/Booking.js";
import Contact from "./models/Contact.js";
import { sendBookingEmail } from "./mailer.js";
import axios from "axios";
import toast from "react-hot-toast";

dotenv.config();
connectDB();
const app = express();

app.use(express.json());

const allowedOrigins = [
  "http://localhost:5173", // Vite
  "http://localhost:5000", // можливо твій бекенд-фронт
  "http://localhost:3000", // наприклад, React/Next.js
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) {
        // дозволь запити без origin (наприклад, Postman або SSR)
        return callback(null, true);
      }
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        console.warn("Blocked by CORS:", origin);
        return callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

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
    await sendBookingEmail({ name, email, bookingDate, comment });
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
// GET /bookings
app.get("/bookings", async (_req, res) => {
  try {
    const bookings = await Booking.find().select("-__v");
    res.status(200).json(bookings);
  } catch (err) {
    console.error("Error fetching bookings:", err.message);
    res.status(500).json({ message: "Failed to retrieve bookings" });
  }
});
app.get("/contacts", async (_req, res) => {
  try {
    const contacts = await Contact.find().select("-__v");
    res.status(200).json(contacts);
  } catch (err) {
    console.error("Error fetching contacts:", err.message);
    res.status(500).json({ message: "Failed to retrieve contacts" });
  }
});
app.post("/contacts", async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  try {
    const contact = new Contact({ name, email, message });
    console.log("Contact data received:", contact);
    await contact.save();
    console.log("Contact saved:", contact);
    res.status(201).json({ message: "Contact saved", contact });
  } catch (err) {
    console.error("Save contact error:", err);
    res.status(500).json({ message: "Failed to save contact" });
  }
});

app.get("/contacts/:id", async (req, res) => {
  const { id } = req.params;
  // Перевірка валідності ObjectId перед запитом
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid contact ID" });
  }
  try {
    const contact = await Contact.findById(id);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    console.log("Contact retrieved:", contact);
    res.status(200).json(contact);
  } catch (err) {
    console.error("Get contact error:", err);
    res.status(500).json({ message: "Failed to retrieve contact" });
  }
});

app.delete("/contacts/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid contact ID" });
  }
  try {
    const contact = await Contact.findByIdAndDelete(id);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    console.log("Contact deleted:", contact);
    res.status(200).json({ message: "Contact deleted", contact });
  } catch (err) {
    console.error("Delete contact error:", err);
    res.status(500).json({ message: "Failed to delete contact" });
  }
});

const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;
app.post("/", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    // Зберігаємо у базу (опціонально)
    const newContact = await Contact.create({ name, email, message });
    console.log("Contact saved:", newContact);

    // Формуємо текст повідомлення
    const text = `
📩 Нова заявка з сайту:
👤 Ім'я: ${name}
📧 Email: ${email}
💬 Повідомлення: ${message || "—"}
`;

    // Надсилаємо у Telegram
    const response = await axios.post(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        chat_id: CHAT_ID,
        text,
        parse_mode: "Markdown",
      }
    );
    const messageId = response.data.result.message_id;
    setTimeout(async () => {
      try {
        await axios.post(
          `https://api.telegram.org/bot${BOT_TOKEN}/deleteMessage`,
          {
            chat_id: CHAT_ID,
            message_id: messageId,
          }
        );
        console.log(`✅ Message ${messageId} deleted from Telegram`);
      } catch (deleteError) {
        console.error(
          "❌ Failed to delete Telegram message:",
          deleteError.message
        );
      }
    }, 30000);
    res.status(201).json({ message: "Message saved and sent to Telegram" });
    toast.success("Message sent to telegram successfully!");
  } catch (error) {
    console.error("Telegram send error:", error.message);
    res.status(500).json({ error: "Error saving or sending message" });
  }
});

app.listen(process.env.PORT || 5001, () => {
  console.log(`Server running on port ${process.env.PORT || 5001}`);
});
