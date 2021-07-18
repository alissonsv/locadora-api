const db = require('../models');

async function getAllMovies() {
  const movies = await db.Movie.findAll();

  return movies;
}

async function getMovieByTitle(title) {
  const movie = await db.Movie.findOne({ where: { title } });

  return movie;
}

async function createMovie({ title, director, quantity }) {
  if (!(title && director && quantity)) {
    throw new Error('Missing parameters');
  }

  try {
    let movie = await db.Movie.findOne({ where: { title } });

    if (movie) {
      throw new Error('Movie already exists!');
    }

    movie = await db.Movie.create({ title, director, quantity });

    return movie;
  } catch (e) {
    throw new Error(e.message);
  }
}

module.exports = {
  getAllMovies,
  getMovieByTitle,
  createMovie,
};
