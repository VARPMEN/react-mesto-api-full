const { NODE_ENV, JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');
const InvalidError = require('../errors/InvalidError');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    throw new InvalidError('Необходима авторизация');
  }

  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    throw new InvalidError('Необходима авторизация');
  }

  req.user = payload;

  next();
};
