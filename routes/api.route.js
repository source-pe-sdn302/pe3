const express = require("express");
const db = require("../models");

const ApiRouter = express.Router();

ApiRouter.post("/movie/create", async (req, res, next) => {
  try {
    const data = req.body;
    const newMovie = await db.Movie.create(data);
    res.status(200).json(newMovie);
  } catch (error) {
    res.status(500).json({
      error: {
        status: 500,
        message: error.message,
      },
    });
  }
});

ApiRouter.get("/movie/list", async (req, res, next) => {
  try {
    const movies = await db.Movie.find()
      .populate("producer")
      .populate("director")
      .populate("stars");
    const r = movies.map((m) => {
      return {
        _id: m._id,
        title: m.title,
        release: m.release,
        description: m.description,
        producer: m.producer.name,
        director: m.director.fullname,
        genres: m.genres,
        stars: m.stars.map((s) => s.fullname),
      };
    });
    res.status(200).json(r);
  } catch (error) {
    res.status(500).json({
      error: {
        status: 500,
        message: error.message,
      },
    });
  }
});

ApiRouter.get("/movie/by-star/:starId", async (req, res, next) => {
  try {
    const starId = req.params.starId;
    const movies = await db.Movie.find({
      stars: starId,
    })
      .populate("producer")
      .populate("director")
      .populate("stars");
    const r = movies.map((m) => {
      return {
        _id: m._id,
        title: m.title,
        release: m.release,
        description: m.description,
        producer: m.producer.name,
        director: m.director.fullname,
        genres: m.genres,
        stars: m.stars.map((s) => s.fullname),
      };
    });
    if (movies.length === 0) {
      return res.status(404).json({
        error: {
          status: 404,
          message: "Not found",
        },
      });
    }
    res.status(200).json(r);
  } catch (error) {
    res.status(500).json({
      error: {
        status: 500,
        message: error.message,
      },
    });
  }
});

ApiRouter.get(
  "/movie/count-by-director/:directorName",
  async (req, res, next) => {
    try {
      const directorName = req.params.directorName;
      const director = await db.Director.findOne({
        fullname: directorName,
      });
      if (director === null) {
        return res.status(404).json({
          error: {
            status: 404,
            message: "Not found",
          },
        });
      }
      const movies = await db.Movie.find({
        director: director._id,
      })
        .populate("producer")
        .populate("director")
        .populate("stars");

      const r = movies.map((m) => {
        return {
          _id: m._id,
          title: m.title,
          release: m.release,
          description: m.description,
          producer: m.producer.name,
          director: m.director.fullname,
          genres: m.genres,
          stars: m.stars.map((s) => s.fullname),
        };
      });
      res.status(200).json(r);
    } catch (error) {
      res.status(500).json({
        error: {
          status: 500,
          message: error.message,
        },
      });
    }
  }
);

ApiRouter.put("/movie/:movieId/add-stars", async (req, res, next) => {
  try {
    const movieId = req.params.movieId;
    const data = req.body;
    const movies = await db.Movie.findById(movieId);
    const newStar = data.filter((s) => !movies.stars.includes(s));
    const moviesUpdate = await db.Movie.findByIdAndUpdate(
      movieId,
      { $push: { stars: newStar } },
      { new: true }
    );
    res.status(200).json(moviesUpdate);
  } catch (error) {
    res.status(500).json({
      error: {
        status: 500,
        message: error.message,
      },
    });
  }
});
module.exports = ApiRouter;
