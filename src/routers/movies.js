const express = require('express');
const auth = require('../middleware/auth');
const movieController = require('../controllers/movieController');

const router = express();

router.get('/', auth, async (req, res) => {
  const movies = await movieController.getAllMovies();

  res.send(movies);
});

router.get('/available', auth, async (req, res) => {
  const availableMovies = await movieController.getAvailableMovies();

  res.send(availableMovies);
});

router.get('/search', auth, async (req, res) => {
  const { title } = req.body;

  const movie = await movieController.getMovieByTitle(title);

  if (!movie) {
    res.status(404).send();
  }

  res.send(movie);
});

router.post('/', auth, async (req, res, next) => {
  try {
    const movie = await movieController.createMovie(req.body);

    return res.status(201).send(movie);
  } catch (e) {
    return next(e);
  }
});

router.post('/rent/:id', auth, async (req, res, next) => {
  const movieId = req.params.id;

  try {
    await movieController.rentMovie(movieId, req.user.id);
    return res.status(201).send();
  } catch (e) {
    return next(e);
  }
});

router.post('/return/:id', auth, async (req, res, next) => {
  const movieId = req.params.id;

  try {
    const response = await movieController.returnMovie(movieId, req.user.id);
    res.send(response);
  } catch (e) {
    return next(e);
  }
});

module.exports = router;
