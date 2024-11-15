const User = require("../models/userModel");
const Post = require("../models/postModel");

// const adminPage = async (req, res, next) => {
//   try {
//     const users = await User.find();
//     res.render("admin", { users });
//   } catch (error) {
//     console.log(error);
//     next(error);
//   }
// };

const adminPage = async (req, res, next) => {
  try {
    const users = await User.find();
    // Aggregation to fetch users and the count of posts they have
    const posts = await User.aggregate([
      {
        // Lookup: Join users with posts
        $lookup: {
          from: "posts", // 'posts' is the collection name for posts
          localField: "_id", // Match 'User' _id field
          foreignField: "userId", // Match 'Post' userId field
          as: "posts", // Add posts as a new array field
        },
      },
      {
        // Project: Shape the output to include user info + post count
        $project: {
          _id: 1, // Keep user ID
          name: 1, // Keep user name
          email: 1, // Keep user email
          totalPosts: { $size: "$posts" }, // Count the number of posts in 'posts' array
        },
      },
    ]);

    // Send users data (including post counts) to the view
    res.render("admin", { posts, users });
    console.log(users);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = {
  adminPage,
};
