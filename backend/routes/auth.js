const express = require("express");
const router = express.Router();

const dbReady = require("../middlewares/dbReady");
const { requireAuth } = require("../middlewares/auth");
const {
  doRegister,
  doLogin,
  doRequestReset,
  doResetPassword,
} = require("../controllers/authController");

// Ensure DB is ready for all auth routes
router.use(dbReady);

// Auth endpoints
router.post("/register", doRegister);
router.post("/login", doLogin);
router.post("/request-reset", doRequestReset);
router.post("/reset-password", doResetPassword);

// Get current user
router.get("/me", requireAuth, (req, res) => {
  // req.user is set by requireAuth middleware
  res.json({
    id: req.user.id,
    email: req.user.email,
    firstName: req.user.name ? req.user.name.split(" ")[0] : "",
    lastName: req.user.name ? req.user.name.split(" ").slice(1).join(" ") : "",
    role: req.user.role,
  });
});

module.exports = router;
