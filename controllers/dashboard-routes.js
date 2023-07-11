const router = require("express").Router();
const { Post } = require("../models/");
const withAuth = require("../utils/auth");

// GET all posts for dashboard
router.get("/", withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: {
        user_id: req.session.user_id,
      },
    });

    const posts = postData.map((post) => post.get({ plain: true }));
    res.render("all-posts-admin", {
      layout: "dashboard",
      posts,
    });
  } catch (err) {
    res.redirect("login");
  }
});

// Create a new post
router.get("/new", withAuth, (req, res) => {
  res.render("new-post", {
    //This is the new-post.handlebars file
    layout: "dashboard", //This is the dashboard.handlebars file
  });
});

// Edit a post
router.get("/edit/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id);
    if (postData) {
      const post = postData.get({ plain: true });
      res.render("edit-post", {
        layout: "dashboard",
        post,
      });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.redirect("login");
  }
});

module.exports = router;
