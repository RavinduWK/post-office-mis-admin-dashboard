const nodemailer = require("nodemailer");

// Create a nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "",
    pass: "",
  },
});

// Function to send an email
async function sendEmail({ to, subject, text }) {
  try {
    const mailOptions = {
      from: "ravindutest22@gmail.com",
      to,
      subject,
      text,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

module.exports = { sendEmail };
