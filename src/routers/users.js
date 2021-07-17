const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/', async (req, res, next) => {
  let user = req.body;

  try {
    user = await userController.createUser(user);
    const token = await userController.generateAuthToken(user.id);

    return res.status(201).send({
      user,
      token,
    });
  } catch (e) {
    return next(e);
  }
});

router.post('/login', async (req, res, next) => {
  const credentials = req.body;

  try {
    const user = await userController.findByCredentials(credentials);
    const token = await userController.generateAuthToken(user.id);

    return res.send({
      user,
      token,
    });
  } catch (e) {
    return next(e);
  }
});

module.exports = router;
