const mongoose = require("mongoose");
const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    release: {
      type: Date,
      default: Date.now,
    },
    description: String,
    producer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "producer",
    },
    director: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "director",
    },
    genres: {
      type: [String],
      enum: {
        values: ["Action", "Drama", "Comedy", "Cartoon"],
        message: "{VALUE} is not supported",
      },
    },
    stars: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "star",
      },
    ],
  },
  { timestamps: true }
);

const Movie = mongoose.model("movie", movieSchema);
module.exports = Movie;
