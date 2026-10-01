const express = require("express");
const { signup, login, logout, getMe, getUsers, updateUser } = require("../controllers/authController");
const authenticate = require("../middleware/authMiddleware");

const router = express.Router();


router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

router.get("/me", authenticate, getMe);

router.get("/users", authenticate, getUsers);

router.put("/profile", authenticate, updateUser);

module.exports = router;