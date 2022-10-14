require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { userValidation, loginValidation } = require('./middlewares/validation');
const userRoute = require('./routes/users');
const cardRoute = require('./routes/cards');
const auth = require('./middlewares/auth');
const UnfindError = require('./errors/UnfindError');
const { loginUser, createUser } = require('./controller/users');

const { PORT = 3000 } = process.env;

const app = express();

const allowedCors = [
  'http://mesto.student.prokhorov.nomoredomains.icu',
  'http://api.mesto.prokhorov.nomoredomains.icu',
  'localhost:3000',
];

app.use((req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', 'true');
  }
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.status(200).send();
  }
  return next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(helmet());

app.use(cookieParser());

app.use(requestLogger);

app.use('/signin', loginValidation, loginUser);
app.use('/signup', userValidation, createUser);

app.use(auth);

app.use(userRoute);
app.use(cardRoute);
app.use('*', () => {
  throw new UnfindError('Указанный путь не существует.');
});

app.use(errorLogger);

app.use(errors());
app.use(((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res
    .status(err.statusCode)
    .send({
      message: statusCode === 500
        ? 'Ошибка сервера'
        : message,
    });
  next();
}));

mongoose.connect('mongodb://localhost:27017/mestodb');

app.listen(PORT);
