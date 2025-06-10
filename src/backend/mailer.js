// mailer.js

import nodemailer from "nodemailer";

// mailer.js

export const sendBookingEmail = async ({
  name,
  email,
  bookingDate,
  comment,
}) => {
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER) {
    console.warn("SMTP not configured – skipping email");
    return;
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const mailOptions = {
    from: `"CamperApp" <${process.env.SMTP_USER}>`,
    to: email,
    subject: "Підтвердження бронювання",
    html: `
      <h2>Hi, ${name}!</h2>
      <p>Ваша заявка на ${new Date(
        bookingDate
      ).toLocaleDateString()} прийнята.</p>
      ${comment ? `<p><strong>Comment:</strong> ${comment}</p>` : ""}
      <p>Дякуємо, що обрали нас!</p>
      <p>З найкращими побажаннями,<br>CamperApp Team</p>
    `,
    text: `
      Hi, ${name}!
      Ваша заявка на ${new Date(bookingDate).toLocaleDateString()} прийнята.
      ${comment ? `Comment: ${comment}` : ""}
      
      Дякуємо, що обрали нас!
      З найкращими побажаннями,
          CamperApp Team
    `,

    replyTo: process.env.SMTP_USER, // Відповісти на цей email
    headers: {
      "X-Mailer": "CamperApp Mailer",
      "X-Priority": "1 (Highest)",
    },
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("✅ Email sent");
  } catch (err) {
    console.error("❌ Failed to send email:", err.message);
    // 🔁 Не викидаємо помилку, якщо email не важливий для бронювання
  }
};
