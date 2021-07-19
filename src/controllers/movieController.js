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

  const transaction = await db.sequelize.transaction();
  try {
    let movie = await db.Movie.findOne({ where: { title } }, { transaction });

    if (movie) {
      throw new Error('Movie already exists!');
    }

    movie = await db.Movie.create(
      { title, director, quantity },
      { transaction }
    );

    await transaction.commit();
    return movie;
  } catch (e) {
    await transaction.rollback();
    throw new Error(e.message);
  }
}

async function rentMovie(MovieId, UserId) {
  if (!(MovieId && UserId)) {
    throw new Error('Missing parameters');
  }

  const transaction = await db.sequelize.transaction();
  try {
    const movieExists = await db.Movie.findOne(
      {
        where: { id: MovieId },
      },
      { transaction }
    );

    if (!movieExists) {
      throw new Error('Movie does not exist!');
    }

    const rentExists = await db.Rent.findOne(
      {
        where: { MovieId, UserId, active: true },
      },
      { transaction }
    );

    if (rentExists) {
      throw new Error('Movie is already rented');
    }

    const movieQuantity = await db.Movie.findOne(
      {
        attributes: ['quantity'],
        where: { id: MovieId },
      },
      { transaction }
    );
    const countRent = await db.Rent.count(
      { where: { MovieId, active: true } },
      { transaction }
    );

    if (movieQuantity.quantity - countRent <= 0) {
      throw new Error('Movie not available');
    }

    await db.Rent.create(
      {
        UserId,
        MovieId,
      },
      { transaction }
    );

    await transaction.commit();
  } catch (e) {
    await transaction.rollback();
    throw new Error(e.message);
  }
}

async function returnMovie(MovieId, UserId) {
  if (!(MovieId && UserId)) {
    throw new Error('Missing parameters');
  }

  const transaction = await db.sequelize.transaction();
  try {
    const rent = await db.Rent.findOne(
      {
        where: {
          MovieId,
          UserId,
          active: true,
        },
      },
      { transaction }
    );

    if (!rent) {
      throw new Error('Rent does not exist or already returned');
    }

    rent.active = false;
    await rent.save({ transaction });

    await transaction.commit();
  } catch (e) {
    await transaction.rollback();
    throw new Error(e.message);
  }
}

module.exports = {
  getAllMovies,
  getMovieByTitle,
  createMovie,
  rentMovie,
  returnMovie,
};
