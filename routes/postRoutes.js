const express = require("express");
const router = express.Router();
const {
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
} = require("../controllers/postController");
const { postSchema } = require("../validation");
const expressError = require("../utils/expressError");
const errorHandling = require("../errorHandling");
const { isLoggedIn, isAuthorized } = require("../middlewares");
const multer = require("multer");
const { storage } = require("../config/cloudConfig");
const upload = multer({ storage });

const postValidation = (req, res, next) => {
  const result = postSchema.validate(req.body);
  if (result.error) {
    console.log(result.error.details);
    throw new expressError(500, result);
  } else {
    next();
  }
};

router.get("/", getPosts);
router.get("/compose", isLoggedIn, compose);
router.post(
  "/compose",
  upload.single("post[image]"),
  // postValidation,
  createPost
);
router.get("/posts/:postId", findOne);
router.get("/about", aboutPage);
router.get("/contact", contactPage);
router.get("/delete/:id", isLoggedIn, isAuthorized, deletePost);
router.get("/update/:id", getPost);
router.put(
  "/post/:id/update",
  isLoggedIn,
  isAuthorized,
  upload.single("post[image]"),
  updatePost
);
router.post("/post/:id/like", addLike);

router.use(errorHandling);

module.exports = router;
