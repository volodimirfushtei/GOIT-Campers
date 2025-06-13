import mongoose from "mongoose";

const contactsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String },
});
const Contacts =
  mongoose.models.Contacts || mongoose.model("Contacts", contactsSchema);

export default Contacts;
