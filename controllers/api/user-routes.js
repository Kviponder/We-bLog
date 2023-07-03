const router = require("express").Router();
const { User } = require("../../models");

router.post("/", async (req, res) => {
  //This try will create a new user
  try {
    const newData = await User.create({
      username: req.body.username,
      password: req.body.password,
    });
    // This is the code that will create the session when the user is created
    req.session.save(() => {
      req.session.user_id = newData.id;
      req.session.username = newData.username;
      req.session.loggedIn = true;

      res.status(200).json(newData);
      console.log("User created");
    });
  } catch (err) {
    res.status(500).json(err);
    console.log("Error in user-routes.js", err);
  }
});

// Login route
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });
    if (!user) {
      res.status(400).json({ message: "No user account found!" });
      return;
    }
    const validPassword = await user.checkPassword(req.body.password);
    if (!validPassword) {
      res.status(400).json({ message: "No user account found!" });
      return;
    }
    req.session.save(() => {
      req.session.user_id = user.id;
      req.session.username = user.username;
      req.session.loggedIn = true;
      res.json({ user, message: "You are now logged in" });
    });
  } catch (err) {
    res.status(400).json(err);
    console.log("Error in user-routes.js", err);
  }
});

// Logout route
router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
      console.log("User logged out");
    });
  } else {
    res.status(404).end();
  }
});
