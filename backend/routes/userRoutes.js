const express = require("express");
const {
  getPost,
  createPost,
  updatePost,
  deletePost,
  likePost,
  commentPost,
  dislikePost,
} = require("../controllers/postController");
const { getUserInfo } = require("../controllers/userController");
const { authenticateToken } = require("../middleware/authMiddleware");

const router = express.Router();

router.use(authenticateToken);

router.route("/").get(getPost).post(createPost);
router.route("/:id").put(updatePost).delete(deletePost);
router.route("/:id/like").post(likePost);
router.route("/:id/dislike").post(dislikePost);
router.route("/:id/comment").post(commentPost);
router.route("/profile/:id").get(getUserInfo);

module.exports = router;
