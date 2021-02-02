const router = require("express").Router();
let User = require("../models/user.model");
const bcrypt = require("bcrypt");

router.route("/").get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/signup").post((req, res) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
    });

    newUser
      .save()
      .then(() => res.json("User Signed up Successfully"))
      .catch((err) => res.status(400).json("Error: " + err._message));
  });
});

router.route("/login").post((req, res) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: new Error("User not found!") });
      }

      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res
              .status(401)
              .json({ error: new Error("Incorrect password!") });
          }
          res.status(200).json({
            userId: user._id,
            token: "token",
          });
        })
        .catch((error) => {
          res.status(500).json({
            error: error,
          });
        });
    })
    .catch((error) => {
      res.status(500).json({
        error: error,
      });
    });
});

module.exports = router;
