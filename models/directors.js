const mongoose = require("mongoose");

const directorSchema = new mongoose.Schema(
  {
    fullname: String,
    dob: {
      type: Date,
      default: Date.now,
    },
    nationality: String,
  },
  { timestamps: true }
);
const Director = mongoose.model("director", directorSchema);
module.exports = Director;
