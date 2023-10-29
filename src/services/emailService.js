// emailUtils.js
import emailjs from "@emailjs/browser";

export async function sendEmail(senderEmail, mailId, securityNumber, type) {
  try {
    // Send the email using emailjs
    const result = await emailjs.send(
      process.env.REACT_APP_EMAILJS_SERVICE_ID,
      process.env.REACT_APP_EMAILJS_SENDER_TEMPLATE_ID,
      {
        to_email: senderEmail,
        type: type,
        PID: mailId,
        security_code: securityNumber,
      },
      process.env.REACT_APP_EMAILJS_PUBLIC_KEY
    );
    return result.text;
  } catch (error) {
    throw error;
  }
}
