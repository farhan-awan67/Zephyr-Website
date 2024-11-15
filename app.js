//jshint esversion:6
const express = require("express");
const app = express();
const connectDB = require("./db");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
require("dotenv").config();
const User = require("./models/userModel");
const passport = require("passport");
const localStrategy = require("passport-local");
const postRoutes = require("./routes/postRoutes");
const methodOverride = require("method-override");
const userRoutes = require("./routes/userRoute");
const adminRoute = require("./routes/admin.route");

const dbUrl = process.env.MONGO_URL;

const store = MongoStore.create({
  mongoUrl: dbUrl,
  crypto: {
    secret: process.env.SESSION_SECRET,
  },
  touchAfter: 24 * 3600, // time period in seconds
});

const sessionOptions = {
  store,
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  },
};

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(methodOverride("_method"));
app.use(session(sessionOptions));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const currentYear = new Date(Date.now()).getFullYear();

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  res.locals.year = currentYear;
  next();
});

app.use("/", postRoutes);
app.use("/", userRoutes);
app.use("/admin", adminRoute);

app.listen(3000, function () {
  connectDB();
  console.log("Server started on port 3000");
});
