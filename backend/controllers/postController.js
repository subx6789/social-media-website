const Post = require("../models/Post");
const User = require("../models/User");
exports.getPost = async (req, res) => {
  try {
    const post = await Post.find();
    res.json(post);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};
exports.createPost = async (req, res) => {
  const { postLink } = req.body;
  try {
    const post = new Post({
      user: req.user.id,
      postLink,
    });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};
exports.updatePost = async (req, res) => {
  const { postLink } = req.body;
  if (!postLink) {
    res.status(201).json({
      message: "No changes are applied in the post",
    });
  } else {
    try {
      const post = await Post.findById(req.params.id);
      if (!post) {
        res.status(404).json({
          message: "Post not found",
        });
      } else {
        post.postLink = postLink;
        res.status(201).json({
          message: "Post updated successfully",
        });
      }
    } catch (err) {
      res.status(500).json({
        error: err.message,
      });
    }
  }
};
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      res.status(404).json({
        message: "Post not found",
      });
    } else {
      res.status(201).json({
        message: "Post deleted successfully",
      });
    }
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};
exports.likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    if (post.likes.includes(user._id)) {
      return res.status(400).json({
        message: "User already liked this post",
      });
    }
    await Post.findByIdAndUpdate(
      req.params.id,
      { $push: { likes: user._id } },
      { new: true }
    );

    res.status(201).json({
      message: "You liked the post",
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};
exports.commentPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    const comment = {
      user: req.user.id,
      text: req.body.text,
    };

    post.comments.push(comment);
    await post.save();

    res.status(201).json({
      message: "Comment added successfully",
      comments: post.comments,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

exports.dislikePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    if (!post.likes.includes(user._id)) {
      return res.status(400).json({
        message: "User has not liked this post",
      });
    }
    post.likes.pull(user._id);
    await post.save();

    res.status(201).json({
      message: "You disliked the post",
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};
