import mongoose from "mongoose";

const contactsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String },
});
contactsSchema.set("toJSON", {
  transform: (doc, ret) => delete ret.__v,
  virtuals: true,
});

const Contacts =
  mongoose.models.Contacts || mongoose.model("Contacts", contactsSchema);

export default Contacts;
