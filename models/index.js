const mongoose = require("mongoose");
const Movie = require("./movie");
const Producer = require("./producer");
const Star = require("./star");
const Director = require("./directors");

const db = {};

db.Movie = Movie;
db.Producer = Producer;
db.Star = Star;
db.Director = Director;
// Define schema

module.exports = db;
