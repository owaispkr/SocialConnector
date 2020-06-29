const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Load Models
const Profile = require("../../models/Profile");
const User = require("../../models/User");

//  Load Register Validation
const validateProfileInput = require("../../validation/profile");
const validateExperienceInput = require("../../validation/experience");
const validateEducationInput = require("../../validation/education");

//  @route      GET api/profile/test
//  @desc       Test
//  @access     Public
router.get("/test", (req, res) => res.json({ msg: "Profile works" }));

//  @route      GET api/profile
//  @desc       Get Current User's Profile
//  @access     Private

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
      .populate("user", ["email", "avatar"])
      .then((profile) => {
        if (!profile) {
          errors.noProfile = "There is no profile for this user";
          return res.status(404).json(errors);
        } else {
          res.json(profile);
        }
      })
      .catch((err) => res.status(404).json(err));
  }
);

//  @route      POST api/profile
//  @desc       Crate or Update Current User's Profile
//  @access     Private

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);

    //Check Validation

    if (!isValid) {
      return res.status(400).json(errors);
    }

    // Get Fields
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.githubUsername)
      profileFields.githubUsername = req.body.githubUsername;
    if (req.body.handle) profileFields.handle = req.body.handle;

    // Splitting Comma seperated skills

    if (typeof req.body.skills !== "undefined") {
      profileFields.skills = req.body.skills.split(",");
    }

    //  Social Links
    profileFields.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.linkedIn) profileFields.social.linkedIn = req.body.linkedIn;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

    Profile.findOne({ user: req.user.id }).then((profile) => {
      if (profile) {
        //  Edit existing Profile

        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true, useFindAndModify: false }
        ).then((profile) => res.json(profile));
      } else {
        //  Create new Profile

        //  Check if handle exists

        Profile.findOne({ handle: profileFields.handle }).then((profile) => {
          if (profile) {
            errors.handle = "Handle already exists";
            return res.status(400).json(errors);
          }

          //    Save Profile
          new Profile(profileFields)
            .save()
            .then((profile) => res.json(profile));
        });
      }
    });
  }
);

//  @route      GET api/profile/handle/:handle
//  @desc       Get Profile by handle
//  @access     Public

router.get("/handle/:handle", (req, res) => {
  const errors = {};

  // Find Profile in mongo
  Profile.findOne({ handle: req.params.handle })
    .populate("user", ["name", "avatar"])
    .then((profile) => {
      if (!profile) {
        errors.noProfile = "Profile not found for this handle";
        return res.status(404).json(errors);
      } else {
        return res.json(profile);
      }
    })
    .catch((err) => res.status(400).json(err));
});

//  @route      GET api/profile/user/:user_id
//  @desc       Get Profile by user ID
//  @access     Public

router.get("/user/:user_id", (req, res) => {
  const errors = {};

  // Find Profile in mongo
  Profile.findOne({ user: req.params.user_id })
    .populate("user", ["name", "avatar"])
    .then((profile) => {
      if (!profile) {
        errors.noProfile = "Profile not found for this user id";
        return res.status(404).json(errors);
      } else {
        return res.json(profile);
      }
    })
    .catch((err) => res.status(400).json(err));
});

//  @route      GET api/profile/all
//  @desc       Get all Profiles
//  @access     Public

router.get("/all", (req, res) => {
  const errors = {};
  Profile.find()
    .populate("user", ["name", "avatar"])
    .then((profiles) => {
      if (!profiles) {
        errors.noProfile = "There are no profiles";
        return res.status(404).json(errors);
      } else {
        return res.json(profiles);
      }
    })
    .catch((err) => res.status(400).json(err));
});

//  @route      POST api/profile/experience
//  @desc       Add Experience
//  @access     Private

router.post(
  "/experience",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateExperienceInput(req.body);

    //Check Validation

    if (!isValid) {
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id }).then((profile) => {
      const newExperience = {
        title: req.body.title,
        company: req.body.company,
        location: req.body.location,
        fromDate: req.body.fromDate,
        toDate: req.body.toDate,
        currentWorkingStatus: req.body.currentWorkingStatus,
        description: req.body.description,
      };

      // Add to experience array
      profile.experience.unshift(newExperience);
      profile.save().then((profile) => res.json(profile));
    });
  }
);

//  @route      POST api/profile/education
//  @desc       Add Education to Profile
//  @access     Private

router.post(
  "/education",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateEducationInput(req.body);

    //Check Validation

    if (!isValid) {
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id }).then((profile) => {
      const newEducation = {
        school: req.body.school,
        degree: req.body.degree,
        fieldOfStudy: req.body.fieldOfStudy,
        fromDate: req.body.fromDate,
        toDate: req.body.toDate,
        currentDegreeStatus: req.body.currentDegreeStatus,
        description: req.body.description,
      };

      // Add to experience array
      profile.education.unshift(newEducation);
      profile.save().then((profile) => res.json(profile));
    });
  }
);

//  @route      DELETE api/profile/experience/:exp_id
//  @desc       Delete Experience
//  @access     Private

router.delete(
  "/experience/:exp_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then((profile) => {
        // Get index of to remove

        const removeIndex = profile.experience
          .map((item) => item.id)
          .indexOf(req.params.exp_id);

        // Splice out of array
        if (removeIndex !== -1) {
          profile.education.splice(removeIndex, 1);
        }
        // save profile

        profile.save().then((profile) => res.json(profile));
      })
      .catch((err) => res.json(err));
  }
);

//  @route      DELETE api/profile/education/:edu_id
//  @desc       Delete Education
//  @access     Private

router.delete(
  "/education/:edu_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then((profile) => {
        // Get index of to remove

        const removeIndex = profile.education
          .map((item) => item.id)
          .indexOf(req.params.edu_id);

        // Splice out of array
        if (removeIndex !== -1) {
          profile.education.splice(removeIndex, 1);
        }
        // save profile

        profile.save().then((profile) => res.json(profile));
      })
      .catch((err) => res.json(err));
  }
);

//  @route      DELETE api/profile
//  @desc       Delete Profile and User
//  @access     Private

router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id }).then(() => {
      User.findOneAndRemove({ _id: req.user.id }).then(() =>
        res.json({ success: true })
      );
    });
  }
);

module.exports = router;
