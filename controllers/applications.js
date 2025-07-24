const express = require("express");
const router = express.Router();

const User = require("../models/user.js");

router.get("/", async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    res.render("applications/index.ejs", {
      applications: currentUser.applications,
    });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

router.get("/new", async (req, res) => {
  res.render("applications/new.ejs");
});

router.post("/", async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    currentUser.applications.push(req.body);
    await currentUser.save();
    res.redirect("/");
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

router.get("/:applicationId", async (req, res) => {
  try {
    // Look up the user from the req.session
    const currentUser = await User.findById(req.session.user._id);
    // find the application by the applicationId supplied by req.params
    const application = currentUser.applications.id(req.params.applicationId);
    // render the show view, passing the app data in the context object;
    res.render("applications/show.ejs", {
      application: application,
    });
  } catch (error) {
    console.error(error);
    res.redirect("/");
  }
});

module.exports = router;
