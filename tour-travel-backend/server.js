// =================== IMPORTS ===================
const express = require("express");
const cors = require("cors");
const mysql2 = require("mysql2"); // 🔹 changed from mysql to mysql2
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const dotenv = require("dotenv");
const twilio = require("twilio");
const { Configuration, OpenAIApi } = require("openai");

// =================== CONFIG ===================
dotenv.config();

// =================== EXPRESS APP ===================
const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// =================== MYSQL CONNECTION ===================
const con = mysql2.createConnection({
  host: process.env.MYSQL_HOST || "localhost",
  user: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PASSWORD || "1234", // 🔹 set your root password here
  database: process.env.MYSQL_DB || "mydb",
  port: process.env.MYSQL_PORT || 3306, // 🔹 MySQL default port is 3306
});

con.connect((err) => {
  if (err) console.error("❌ MySQL connection error:", err.message);
  else console.log("✅ Connected to MySQL database!");
});

// =================== TWILIO SETUP ===================
let client;
try {
  client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
} catch {
  console.warn("⚠ Twilio not configured");
}
// =================== OTP STORE ===================
const otpStore = {}; // In-memory OTP storage

// Helper to normalize phone numbers
const normalizePhone = (phone) => {
  if (!phone) return "";
  phone = phone.toString().trim();
  return phone.startsWith("+") ? phone : `+91${phone}`; // default +91 for India
};

// =================== OPENAI SETUP ===================
const OpenAI = require("openai");
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// =================== FILE UPLOADS ===================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// =================== ROUTES ===================

// Test
app.get("/", (req, res) => res.send("Backend running!"));

// ================== SEND OTP ==================
app.post("/send-otp", async (req, res) => {
  try {
    const { phone } = req.body;
    if (!phone) return res.status(400).json({ success: false, message: "Phone number required" });

    const normalizedPhone = normalizePhone(phone);
    const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
    otpStore[normalizedPhone] = otp; // store OTP

    if (!client) return res.status(500).json({ success: false, message: "Twilio not configured" });

    await client.messages.create({
      body: `Your OTP is: ${otp}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: normalizedPhone,
    });

    res.json({ success: true, message: `OTP sent to ${normalizedPhone}` });
  } catch (err) {
    console.error("❌ Twilio error:", err.message);
    res.status(500).json({ success: false, message: "Error sending OTP" });
  }
});

// ================== VERIFY OTP ==================
app.post("/verify-otp", (req, res) => {
  try {
    const { phone, otp } = req.body;
    if (!phone || !otp) return res.status(400).json({ verified: false, message: "Phone & OTP required" });

    const normalizedPhone = normalizePhone(phone);
    const enteredOtp = otp.toString().trim();

    if (otpStore[normalizedPhone] && otpStore[normalizedPhone].toString() === enteredOtp) {
      delete otpStore[normalizedPhone]; // delete OTP after verification
      return res.json({ verified: true, message: "✅ OTP verified successfully!" });
    }

    return res.status(400).json({ verified: false, message: "❌ Invalid or expired OTP" });
  } catch (err) {
    console.error("OTP verify error:", err);
    res.status(500).json({ verified: false, message: "Server error" });
  }
});

// =================== CONTACT ===================
app.post("/contact", (req, res) => {
  const { name, email, phone, message } = req.body;
  if (!name || !email || !message) return res.status(400).send("Required fields missing");

  const sql = "INSERT INTO contact_messages (name, email, phone, message) VALUES (?, ?, ?, ?)";
  con.query(sql, [name, email, phone, message], (err) => {
    if (err) return res.status(500).send("Database error");
    res.json({ success: true, message: "Message saved successfully!" });
  });
});

// =================== Thailand TDAC ===================
app.post("/thailand-tdac", (req, res) => {
  const { first_name, last_name, dob, gender, passport_number, passport_valid_till, passport_place, email, phone } = req.body;

  const sql = `
    INSERT INTO tdac_bookings
      (first_name, last_name, dob, gender, passport_number, passport_valid_till, passport_place, email, phone)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  con.query(sql, [first_name, last_name, dob, gender, passport_number, passport_valid_till, passport_place, email, phone], (err, result) => {
    if (err) return res.status(500).json({ message: "Database error", error: err });
    res.json({ message: "Form submitted successfully!", insertId: result.insertId });
  });
});
app.post("/apply/:country", (req, res) => {
  const country = req.params.country;
  const form = req.body;

  console.log("Country:", country);
  console.log("Form Data:", form);

  // Aap database me countrywise save kar sakte ho:
  // Example table name: applications

  res.json({ success: true, message: `${country} form submitted successfully!` });
});

// =================== Visa Upload ===================
app.post(
  "/upload-files",
  upload.fields([
    { name: "passport", maxCount: 1 },
    { name: "photo", maxCount: 1 },
  ]),
  (req, res) => {
    const {
      firstName,
      lastName,
      passportNumber,
      nationality,
      gender,
      dob,
      issueDate,
      expiryDate,
    } = req.body;

    const passportFile = req.files.passport ? req.files.passport[0].filename : null;
    const photoFile = req.files.photo ? req.files.photo[0].filename : null;

    const sql = `
      INSERT INTO visaapplications 
      (first_name, last_name, passport_number, nationality, gender, dob, issue_date, expiry_date, passport_file, photo_file)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    con.query(
      sql,
      [firstName, lastName, passportNumber, nationality, gender, dob, issueDate, expiryDate, passportFile, photoFile],
      (err, result) => {
        if (err) {
          console.error("❌ Database error:", err);
          return res.status(500).json({ error: "Database error" });
        }
        res.json({ success: true, message: "Visa form saved!", appId: result.insertId });
      }
    );
  }
);

// =================== OpenAI Chat ===================
app.post("/api/chat", async (req, res) => {
  try {
    const { question } = req.body;
    if (!question) return res.status(400).json({ error: "Question is required" });

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a travel visa expert. Answer clearly and helpfully about visas, countries, or travel." },
        { role: "user", content: question },
      ],
      temperature: 0.7,
      max_tokens: 250,
    });

    const answer = response.choices[0].message.content;
    res.json({ answer });
  } catch (error) {
    console.error("OpenAI error:", error);
    res.status(500).json({ error: "Sorry, I’m having trouble connecting right now. Please try again in a moment." });
  }
});

// =================== thailand bookings ===================
// =================== Thailand bookings (final version using `bookings` table) ===================
app.post(
  "/save-booking",
  upload.fields([
    { name: "ticketFile", maxCount: 1 },
    { name: "hotelFile", maxCount: 1 },
  ]),
  (req, res) => {
    const {
      formId,
      ticketOption,
      ticketPrice,
      hotelOption,
      hotelType,
      hotelPrice,
      takeATripFee,
      govtFee,
      total,
      notes,
    } = req.body;

    // Handle uploaded files safely
    const ticketFile = req.files["ticketFile"]
      ? "/uploads/" + req.files["ticketFile"][0].filename
      : null;
    const hotelFile = req.files["hotelFile"]
      ? "/uploads/" + req.files["hotelFile"][0].filename
      : null;

    const sql = `
      INSERT INTO bookings 
      (formId, ticketOption, ticketPrice, ticketFile, hotelOption, hotelType, hotelPrice, hotelFile, takeATripFee, govtFee, total, notes)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    con.query(
      sql,
      [
        formId,
        ticketOption,
        ticketPrice,
        ticketFile,
        hotelOption,
        hotelType,
        hotelPrice,
        hotelFile,
        takeATripFee,
        govtFee,
        total,
        notes,
      ],
      (err, result) => {
        if (err) {
          console.error("❌ Booking insert error:", err);
          return res.status(500).json({
            success: false,
            message: "Database error while saving booking",
            error: err,
          });
        }

        res.json({
          success: true,
          message: "Booking saved successfully!",
          bookingId: result.insertId,
          ticketFile,
          hotelFile,
        });
      }
    );
  }
);


// =================== START SERVER ===================
const PORT = process.env.PORT || 3001; // 🔹 use 3001 for backend to avoid conflict with React port 3000
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
