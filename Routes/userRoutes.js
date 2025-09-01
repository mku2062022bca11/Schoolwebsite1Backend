const express = require("express");
const router = express.Router();
const { registerUser, loginUser, getUsers } = require("../Controllers/UserControllers");
const { sendContactMessage } = require("../Controllers/contactController");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/all", getUsers);
router.post("/contact", sendContactMessage);

module.exports = router;
