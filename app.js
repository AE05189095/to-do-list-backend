require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const todosRouter = require('./routes/todos');
const goalsRouter = require('./routes/goals');

const app = express();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Conectado a MongoDB'))
.catch((error) => console.error('❌ Error conectando a MongoDB:', error));

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use((req, res, next) => {
  const openRoutes = ['/', '/api/todos', '/api/goals'];
  const isApiRoute = req.path.startsWith('/api/');
  const needsKey = isApiRoute && !openRoutes.includes(req.path);
  const apiKey = req.headers['x-api-key'];

  if (needsKey && (!apiKey || apiKey !== process.env.API_KEY)) {
    return res.status(401).json({ error: 'API key incorrecta o ausente' });
  }
  next();
});

app.use('/api/todos', todosRouter);
app.use('/api/goals', goalsRouter);
app.use('/', indexRouter);
app.use('/users', usersRouter);

// Mover el middleware de manejo de errores 404 al final
app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;