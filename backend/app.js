const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const apiRouter = require("./routes/api");
const authRouter = require("./routes/auth");
const { initialize } = require("./db");

const app = express();

// Enable CORS for frontend
const allowedOrigins = [
  "http://localhost:3001", // Local dev
  "https://vercel.app", // Vercel preview deployments
  process.env.FRONTEND_URL, // Production frontend URL
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, Postman, etc.)
      if (!origin) return callback(null, true);

      // Check if origin is allowed or matches Vercel pattern
      if (allowedOrigins.includes(origin) || origin.endsWith(".vercel.app")) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Initialize database and expose via app.locals
initialize()
  .then((db) => {
    app.locals.db = db;
    console.log("Database initialized");
  })
  .catch((err) => {
    console.error("Database initialization failed:", err);
  });

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/api", apiRouter);
app.use("/auth", authRouter);

module.exports = app;
