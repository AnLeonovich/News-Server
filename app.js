var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const passport = require('passport');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
require('./config-passport')
var app = express();

app.use(passport.initialize());
app.use(passport.session())
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.post('/login', (req, res, next) => {
  passport.authenticate('local', function(err, user) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.send('Укажите правильный email или пароль!');
    }
    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      }
      return res.redirect('/news');
    });
  })(req, res, next);
});

const auth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    return res.redirect('/');
  }
};

app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  console.error(err)
  res.send(err.message)
});

module.exports = app;
