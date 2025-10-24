// import nodemailer from "nodemailer";

// const transporter = nodemailer.createTransport({
//   host: "smtp.gmail.com", // ✅ Correct SMTP host
//   port: 587,
//   secure: false, // TLS will be used
//   auth: {
//     user: process.env.SMTP_USER,
//     pass: process.env.SMTP_PASS,
//   },
// });

// transporter.verify((error, success) => {
//   if (error) {
//     console.error("Email transporter error:", error);
//   } else {
//     console.log("✅ Email transporter is ready to send messages");
//   }
// });

// export default transporter;
import dotenv from "dotenv";
import nodemailer from "nodemailer";

// ✅ Load .env first
dotenv.config();

if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
  console.error("❌ Missing SMTP credentials in environment variables.");
  process.exit(1);
}

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.error("❌ Email transporter error:", error.message);
  } else {
    console.log("✅ Email transporter is ready to send messages");
  }
});

export default transporter;
