const express = require("express");

const { login, logout, getUser } = require("../controllers/authController");

const { authorized } = require("../middlewares/auth");

const router = express.Router();

router.route("/login").post(login);

router.route("/logout").get(logout);

router.route("/user").get(authorized, getUser);

module.exports = router;
