const router = require("express").Router();
const { Comment } = require("../../models");
const withAuth = require("../../utils/auth");

// POST /api/comments
router.post("/", withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body, //... means spread operator - spreads the properties from the req.body into the newComment object
      user_id: req.session.user_id,
    });
    res.json(newComment);
  } catch (err) {
    res.status(500).json(err);
    console.log("Error in comment-routes.js", err);
  }
});

module.exports = router;
