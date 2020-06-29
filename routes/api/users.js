const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

//  Loading User Model
const User = require("../../models/User");

//  Load Register Validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

//  @route      GET api/users/test
//  @desc       Test
//  @access     Public
router.get("/test", (req, res) => res.json({ msg: "Users works" }));

//  @route      POST api/users/register
//  @desc       Register User
//  @access     Public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  //Check Validation

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: 200, // Size
        r: "pg", // Rating
        d: "mm",
      });

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        avatar,
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => res.json(user))
            .catch((err) => console.log(err));
        });
      });
    }
  });
});

//  @route      POST api/users/login
//  @desc       Login User
//  @access     Public
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  //Check Validation

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then((user) => {
    // Check for User
    if (!user) {
      errors.email = "User not found";
      return res.status(404).json(errors);
    } else {
      // Check for password
      bcrypt.compare(req.body.password, user.password).then((isMatch) => {
        if (isMatch) {
          // User Matched
          // Creating Payload
          const payload = {
            id: user.id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
          };

          // Sign Token
          jwt.sign(
            payload,
            keys.secretOrKey,
            { expiresIn: 3600 },
            (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token,
              });
            }
          );
        } else {
          errors.password = "password incorrect";
          return res.status(400).json(errors);
        }
      });
    }
  });
});

//  @route      Get api/users/currentUser
//  @desc       Testing: Response back current User
//  @access     Private

router.get(
  "/currentUser",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json(req.user);
  }
);

module.exports = router;
