const Post = require("./models/postModel");

const isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "to create post user must be logged in");
    return res.redirect("/login");
  }
  next();
};

const saveRedirelUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
};

const isAuthorized = async (req, res, next) => {
  const id = req.params.id;
  const post = await Post.findById(id);
  if (post.userId.toString() !== res.locals.currUser._id.toString()) {
    req.flash("error", "Not authorized for this action");
    return res.redirect("/");
  }
  next();
};

module.exports = {
  isLoggedIn,
  isAuthorized,
  saveRedirelUrl,
};
