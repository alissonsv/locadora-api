const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const db = require('../models');

async function auth(req, res, next) {
  try {
    const token = req.header('authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await db.User.findOne({
      where: {
        id: decoded.id,
        tokens: { [Op.contains]: [token] },
      },
    });
    console.log(user);

    if (!user) {
      throw new Error();
    }

    req.token = token;
    req.user = user;

    next();
  } catch (e) {
    console.log(e);
    res.status(401).send({ error: 'Authentication error' });
  }
}

module.exports = { auth };
