var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressLayouts = require('express-ejs-layouts');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var submissionsRouter = require('./routes/submissions');
var reportsRouter = require('./routes/reports');
var registerRouter = require('./routes/register');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/libraries/bootstrap', express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));

app.use('/submissions', submissionsRouter);
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/reports', reportsRouter);
app.use('/register', registerRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.locals.title = "Error!";

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
