const User = require("../models/User");
const Post = require("../models/Post");

exports.getUserInfo = async (req, res) => {
  try {
    const userId = req.params.id
    const user = await User.findById(req.params.id).select(
      "-password -email -_id"
    );
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    const posts = await Post.find({ user: userId });
    res.json({ user, posts });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};
