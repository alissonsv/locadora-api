const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../models');

async function createUser({ name, email, password }) {
  if (!(name && email && password)) {
    throw new Error('Missing parameters');
  }
  if (!validator.isEmail(email)) {
    throw new Error('Invalid email');
  }

  let user = await db.User.findOne({ where: { email } });
  if (user) {
    throw new Error('Email already in use!');
  }

  try {
    user = await db.User.create({ name, email, password });
  } catch {
    throw new Error();
  }

  return user;
}

async function generateAuthToken(userId) {
  try {
    const user = await db.User.findOne({ where: { id: userId } });

    if (!user) {
      throw new Error('Unable to find user');
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    const tokens = user.tokens.concat(token);
    await db.User.update(
      { tokens },
      {
        where: {
          id: user.id,
        },
      }
    );
    return token;
  } catch {
    throw new Error();
  }
}

async function findByCredentials({ email, password }) {
  if (!(email && password)) {
    throw new Error('Missing parameters');
  }

  const user = await db.User.findOne({ where: { email } });
  if (!user) {
    throw new Error('Email or Password incorrect');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Email or Password incorrect');
  }

  return user;
}

module.exports = {
  createUser,
  generateAuthToken,
  findByCredentials,
};
