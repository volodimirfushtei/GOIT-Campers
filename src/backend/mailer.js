import nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === "true", // true для 465, false для 587
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});
export const sendBookingEmail = async ({
  name,
  email = process.env.TO_EMAIL,
  bookingDate = new Date().toLocaleDateString(),
  comment = "",
}) => {
  const mailOptions = {
    from: `"Camper App" <${process.env.SMTP_USER}>`,
    to: email,
    subject: "Підтвердження бронювання",
    html: `
        <h2>Привіт, ${name}!</h2>
        <p>Ваша заявка на ${bookingDate} прийнята.</p>
        <p>${comment ? `Коментар: ${comment}` : "Без коментаря"}</p>
        <p>Дякуємо, що обрали нас!</p>
      `,
  };

  await transporter.sendMail(mailOptions);
};
