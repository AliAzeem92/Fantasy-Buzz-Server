import dotenv from "dotenv";
import nodemailer from "nodemailer";

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

// Enhanced verification with retry
const verifyTransporter = async (retries = 3) => {
  for (let i = 0; i < retries; i++) {
    try {
      await transporter.verify();
      console.log("✅ Email transporter is ready to send messages");
      return true;
    } catch (error) {
      console.error(
        `❌ Email transporter verification attempt ${i + 1} failed:`,
        error.message
      );
      if (i === retries - 1) {
        console.error("❌ All email transporter verification attempts failed");
        return false;
      }
      // Wait 2 seconds before retry
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  }
};

verifyTransporter();

export default transporter;
