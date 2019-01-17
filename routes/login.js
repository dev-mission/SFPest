var express = require('express');
var router = express.Router();
var models = require('../models');
var bcrypt = require('bcrypt')
var passport = require('passport');
var passportLocal = require('passport-local');

passport.use(new passportLocal.Strategy(
  function(username, password, done) {
    models.User.findOne({where: {username: username}}).then(function(user) {
      bcrypt.compare(password, user.hashed_password).then(function(res) {
        if (res) {
          return done(null, user, { message: 'You are now logged in!' });
        }
        return done(null, false, { message: 'Invalid password' });
      }).catch(function(error) {
        return done(null, false, { message: 'Invalid password' });
      });
    }).catch(function(error) {
      console.log(error);
      return done(null, false, { message: 'Invalid login' });
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  models.User.findById(id).then(function(user) {
    done(null, user);
  });
});

/* GET the login Form. */
router.get('/', function(req, res, next) {
  res.render('login/new', {
    title: 'Log In',
    redirectURI: req.query.redirectURI
  });
});

  /* Post to create a new report. */
router.post('/', passport.authenticate('local', {
  failureRedirect: '/login',
  failureFlash: true
}), function(req, res) {
  req.flash('info', 'You have been logged in!');
  if (req.body.redirectURI != '') {
    res.redirect(req.body.redirectURI);
  } else {
    res.redirect('/');
  }
});

module.exports = router;
