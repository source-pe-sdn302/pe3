const mongoose = require("mongoose");
const starSchema = new mongoose.Schema(
  {
    fullname: String,
    male: Boolean,
    dob: {
      type: Date,
      default: Date.now,
    },
    nationality: String,
  },
  { timestamps: true }
);
const Star = mongoose.model("star", starSchema);
module.exports = Star;
