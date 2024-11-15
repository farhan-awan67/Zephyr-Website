const User = require("../models/userModel");

const signup = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    console.log(username);
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      req.flash("error", "username already exists");
      // res.redirect("/signup");
    }
    const userIn = new User({ email, username });
    const registerUser = await User.register(userIn, password);
    await userIn.save();
    req.login(registerUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "welcome!");
      res.redirect("/");
    });
  } catch (error) {
    // req.flash("error", "error.message");
    console.log(error);
    res.redirect("/signup");
  }
};

const signUser = (req, res) => {
  res.render("signup");
};

const login = (req, res) => {
  res.render("login");
};

const loginUser = (req, res) => {
  req.flash("success", "welcome back");
  const redirectUrl = res.locals.redirectUrl || "/";
  res.redirect(redirectUrl);
};

const logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      next(err);
    }
    req.flash("success", "Successfully Logout");
    res.redirect("/");
  });
};

module.exports = {
  login,
  signUser,
  signup,
  loginUser,
  logout,
};
