require('dotenv').config();

console.log(process.env.NODE_ENV);

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const { errors } = require('celebrate');
const NotFoundError = require('./errors/notFoundError');
const { allowedCors } = require('./constants/constants');
const { createUser, login } = require('./controllers/users');
const { auth } = require('./middlewares/isAuthorized');
const { validateLogin, validateCreateUser } = require('./middlewares/validations');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();
const { PORT = 3000 } = process.env;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(requestLogger);

app.use(cors({
  origin: allowedCors,
  credentials: true,
}));

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадет');
  }, 0);
});

app.post('/signin', validateLogin, login);
app.post('/signup', validateCreateUser, createUser);

app.use('/', auth, require('./routes/users'));
app.use('/', auth, require('./routes/cardss'));

app.use('*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

app.use(errorLogger);

app.use(errors());

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  if (err.statusCode) {
    return res.status(err.statusCode)
      .send({ message: err.message });
  }
  console.error(err.stack);
  return res.status(500)
    .send({ message: 'Что-то пошло не так' });
});

app.listen(
  PORT,
  () => {
    console.log('started on', PORT);
  },
);
