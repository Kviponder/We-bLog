//CRUD for posts
const router = require("express").Router();
const { Post } = require("../../models");
const withAuth = require("../../utils/auth");

// POST /api/posts
router.post("/", withAuth, async (req, res) => {
  const body = req.body;
  try {
    const newPost = await Post.create({
      ...body,
      user_id: req.session.user_id,
    });
    res.json(newPost);
  } catch (err) {
    res.status(500).json(err);
    console.log("Error in post-routes.js post method", err);
  }
});

// PUT /api/posts/1
router.put("/:id", withAuth, async (req, res) => {
  try {
    const [affectedRows] = await Post.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (affectedRows > 0) {
      res.status(200).end();
      console.log("Post updated");
    } else {
      res.status(404).end();
      console.log("Post not found");
    }
  } catch (err) {
    res.status(500).json(err);
    console.log("Error in post-routes.js Put method", err);
  }
});

router.delete("/:id", withAuth, async (req, res) => {
  try {
    const [affectedRows] = Post.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (affectedRows > 0) {
      res.status(200).end();
      console.log("Post deleted");
    } else {
      res.status(404).end();
      console.log("Post not found");
    }
  } catch (err) {
    res.status(500).json(err);
    console.log("Error in post-routes.js Delete method", err);
  }
});

module.exports = router;
