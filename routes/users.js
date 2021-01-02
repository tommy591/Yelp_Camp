const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/syncWrapper");
const users = require("../controllers/users");
const passport = require("passport");

router.route("/register").get( users.registerUser).post( catchAsync(users.newUser));
router.route("/login").get(users.loginUser).post(passport.authenticate("local", {failureFlash: true,failureRedirect: "/login",}), users.redirectUser);
router.get("/logout", users.logoutUser);

module.exports = router;
