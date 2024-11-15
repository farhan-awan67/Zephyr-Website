const express = require("express");
const {
  login,
  signUser,
  signup,
  loginUser,
  logout,
} = require("../controllers/userController");
const { Passport } = require("passport");
const router = express.Router();
const passport = require("passport");
const { saveRedirelUrl } = require("../middlewares");

router.get("/login", login);
router.post(
  "/login",
  saveRedirelUrl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  loginUser
);
router.get("/signup", signUser);
router.post("/signup", signup);
router.get("/logout", logout);

module.exports = router;
