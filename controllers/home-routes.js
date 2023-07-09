const router = require("express").Router();
const { Post, Comment, User } = require("../models/");

// GET all posts for dashboard
router.get("/", async (req, res) => {
  //Find all posts
  try {
    const postData = await Post.findAll({
      include: [User],
    });
    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));
    // Pass serialized data and session flag into template
    res.render("all-posts", { posts });
  } catch (err) {
    res.status(500).json(err);
    console.log("Error in home-routes.js", err);
  }
});

// GET one post
router.get("/post/:id", async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        User,
        {
          model: Comment,
          include: [User],
        },
      ],
    });

    if (postData) {
      const post = postData.get({ plain: true });
      res.render("single-post", { post });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
    console.log("Error in home-routes.js", err);
  }
});
//login route
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

//signup route
router.get("/sign-up", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  console.log("Rendering sign-up view");
  res.render("sign-up");
});

module.exports = router;
