const Post = require("../models/postModel");
const User = require("../models/userModel");

const homeStartingContent =
  "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent =
  "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent =
  "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const getPosts = async function (req, res, next) {
  try {
    let posts = await Post.find({});
    res.render("home", { startingContent: homeStartingContent, posts });
  } catch (err) {
    next(err);
  }
};

const compose = function (req, res) {
  res.render("compose");
};

const createPost = async function (req, res, next) {
  try {
    const url = req.file.path;
    const filename = req.file.filename;
    if (!url) {
      console.log("url not found");
    }
    if (!filename) {
      console.log("filename not found");
    }
    const userId = req.user.id;
    const post = new Post({ ...req.body.post, userId });
    post.image = { url, filename };
    await post.save();
    res.redirect("/");
  } catch (err) {
    next(err);
  }
};

const findOne = async function (req, res, next) {
  try {
    const requestedPostId = req.params.postId;
    let post = await Post.findOne({ _id: requestedPostId });
    res.render("post", {
      title: post.title,
      content: post.content,
      image: post.image.url,
    });
  } catch (err) {
    next(err);
  }
};

const aboutPage = function (req, res) {
  res.render("about", { aboutContent: aboutContent });
};

const contactPage = function (req, res) {
  res.render("contact", { contactContent: contactContent });
};

const deletePost = async (req, res, next) => {
  try {
    const postId = req.params.id;
    let deletePost = await Post.findByIdAndDelete({ _id: postId });
    req.flash("success", "Post Deleted Successfully");
    res.redirect("/");
  } catch (err) {
    next(err);
  }
};

const getPost = async (req, res, next) => {
  try {
    let id = req.params.id;
    let findPost = await Post.findById(id);
    res.render("update", { findPost });
  } catch (err) {
    next(err);
  }
};

const updatePost = async (req, res, next) => {
  try {
    let id = req.params.id;
    let updatedPost = await Post.findByIdAndUpdate(id, { ...req.body.post });
    await updatedPost.save();
    res.redirect("/");
  } catch (err) {
    next(err);
  }
};

const addLike = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = req.user;
    const post = await Post.findById(id);
    if (!post) {
      req.flash("error", "post not found");
    }

    const userIndex = post.likedBy.indexOf(req.user._id);

    if (userIndex === -1) {
      post.likedBy.push(req.user._id);
      post.likes += 1;
    } else {
      post.likedBy.splice(userIndex, 1);
      post.likes -= 1;
    }

    await post.save();
    res.redirect("/");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPosts,
  compose,
  createPost,
  findOne,
  aboutPage,
  contactPage,
  deletePost,
  getPost,
  updatePost,
  addLike,
};
