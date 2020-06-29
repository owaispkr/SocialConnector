const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//Creating Schema for Profile

const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  handle: {
    type: String,
    required: true,
    max: 40,
  },
  company: {
    type: String,
  },
  website: {
    type: String,
  },
  location: {
    type: String,
  },
  status: {
    type: String,
    required: true,
  },
  skills: {
    type: [String],
    required: true,
  },
  bio: {
    type: String,
  },
  githubUsername: {
    type: String,
  },
  experience: [
    {
      title: {
        type: String,
        required: true,
      },
      company: {
        type: String,
        required: true,
      },
      location: {
        type: String,
      },
      fromDate: {
        type: Date,
        required: true,
      },
      toDate: {
        type: Date,
      },
      currentWorkingStatus: {
        type: Boolean,
        default: false,
      },
      description: { type: String },
    },
  ],
  education: [
    {
      school: {
        type: String,
        required: true,
      },
      degree: {
        type: String,
        required: true,
      },
      fieldOfStudy: {
        type: String,
        required: true,
      },
      fromDate: {
        type: Date,
        required: true,
      },
      toDate: {
        type: Date,
      },
      currentDegreeStatus: {
        type: Boolean,
        default: false,
      },
      description: { type: String },
    },
  ],
  social: {
    youtube: {
      type: String,
    },
    facebook: {
      type: String,
    },
    twitter: {
      type: String,
    },
    linkedIn: {
      type: String,
    },
    instagram: {
      type: String,
    },
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Profile = mongoose.model("profiles", ProfileSchema);
