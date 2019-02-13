require('dotenv').config();
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
var loginRouter = require('./routes/login');
var session = require('express-session');
var flash = require('connect-flash');
var passport = require('passport');
var fileUpload = require('express-fileupload');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(logger('dev'));
app.use(fileUpload({
  createParentPath: true,
  useTempFiles: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({secret: 'changeme'}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/libraries/bootstrap', express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));

app.use(function(req,res,next){
  res.locals.flash = req.flash();
  res.locals.current_user = req.user;
  next();
});

// This function will require a user to login in prior to viewing /reports
function requireLogin(req,res,next){
  if (req.user) {
    next();
  }
  else {
    req.flash("error", "Login Required");
    res.redirect(`/login?redirectURI=${encodeURIComponent(req.originalUrl)}`);
  }
}

app.use('/submissions', submissionsRouter);
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/reports',requireLogin);
app.use('/reports', reportsRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.flash = {};
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.locals.title = "Error!";

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
