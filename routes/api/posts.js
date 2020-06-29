const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Load Models
const Post = require("../../models/Post");
const User = require("../../models/User");
const Profile = require("../../models/Profile");

//  Load Register Validation
const validatePostInput = require("../../validation/post");

//  @route      GET api/posts/test
//  @desc       Get test
//  @access     Private

router.get("/test", (req, res) => res.json({ msg: "Posts works" }));

//  @route      POST api/posts
//  @desc       Create Post
//  @access     Private

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    //Check Validation

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id,
    });

    newPost.save().then((post) => res.json(post));
  }
);

//  @route      GET api/posts
//  @desc       Get posts
//  @access     Public

router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then((posts) => res.json(posts))
    .catch((err) => res.status(400).json({ noPost: "No post found" }));
});

//  @route      GET api/posts/:post_id
//  @desc       Get single post
//  @access     Public

router.get("/:post_id", (req, res) => {
  Post.findById(req.params.post_id)
    .sort({ date: -1 })
    .then((posts) => res.json(posts))
    .catch((err) => res.status(400).json({ noPost: "No post found" }));
});

//  @route      DELETE api/posts/:post_id
//  @desc       DELETE single post
//  @access     Private

router.delete(
  "/:post_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then((profile) => {
      Post.findById(req.params.post_id)
        .then((post) => {
          // Check for Post owner

          if (post.user.toString() !== req.user.id) {
            return res.status(401).json({ noAuthorize: "User not authorized" });
          }

          //  Delete
          post.remove().then(() => res.json({ success: true }));
        })
        .catch((err) => res.status(400).json({ noPost: "No post found" }));
    });
  }
);

//  @route      POST api/posts/like/:post_id
//  @desc       Like post
//  @access     Private

router.post(
  "/like/:post_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then((profile) => {
      Post.findById(req.params.post_id)
        .then((post) => {
          if (
            post.like.filter((like) => like.user.toString() == req.user.id)
              .length > 0
          ) {
            return res
              .status(400)
              .json({ alreadyLiked: "User has already liked post" });
          }

          // Add user ID to like array

          post.like.unshift({ user: req.user.id });

          post
            .save()
            .then((post) => res.json(post))
            .catch((err) => res.json(err));
        })
        .catch((err) => res.status(400).json({ noPost: "No post found" }));
    });
  }
);

//  @route      POST api/posts/unlike/:post_id
//  @desc       UnLike post
//  @access     Private

router.post(
  "/unlike/:post_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then((profile) => {
      Post.findById(req.params.post_id)
        .then((post) => {
          if (
            post.like.filter((like) => like.user.toString() == req.user.id)
              .length === 0
          ) {
            return res
              .status(400)
              .json({ notLiked: "User has not yet liked post" });
          }

          // Get Index
          const removeIndex = post.like
            .map((item) => item.user.toString())
            .indexOf(req.user.id);

          // Splice index out of array
          if (removeIndex !== -1) post.like.splice(removeIndex, 1);

          post
            .save()
            .then((post) => res.json(post))
            .catch((err) => res.json(err));
        })
        .catch((err) => res.status(400).json({ noPost: "No post found" }));
    });
  }
);

//  @route      POST api/posts/comment/:post_id
//  @desc       Like post
//  @access     Private

router.post(
  "/comment/:post_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    //Check Validation

    if (!isValid) {
      return res.status(400).json(errors);
    }

    Post.findById(req.params.post_id)
      .then((post) => {
        const newComment = {
          text: req.body.text,
          name: req.body.name,
          avatar: req.body.avatar,
          user: req.user.id,
        };

        post.comment.unshift(newComment);
        post.save().then((post) => res.json(post));
      })
      .catch((err) => res.status(400).json({ noPost: "No post found" }));
  }
);

//  @route      DELETE api/posts/comment/:post_id/:comment_id
//  @desc       Remove Comment from POST
//  @access     Private

router.delete(
  "/comment/:post_id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.post_id)
      .then((post) => {
        // Check if Comment exists or not

        if (
          post.comment.filter(
            (comment) => comment._id.toString() === req.params.comment_id
          ).length === 0
        ) {
          console.log("asf");
          return res.status(404).json({ noComment: "Comment not exists" });
        }

        // Get Remove Index
        const removeIndex = post.comment
          .map((item) => item.id.toString())
          .indexOf(req.params.comment_id);

        if (removeIndex !== -1) post.comment.splice(removeIndex, 1);

        post.save().then((post) => res.json(post));
      })
      .catch((err) => res.status(400).json({ noPost: "No post found" }));
  }
);

module.exports = router;
