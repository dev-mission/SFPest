var express = require('express');
var router = express.Router();

var sequelize = require('sequelize');
var models = require('../models');
var bcrypt = require('bcrypt');
var _ = require('lodash');
var inflection = require('inflection');

function render(res, user, errors) {
  res.render('register/new', {
    title: 'Sign Up',
    user: user,
    inflection: inflection,
    hasError: function(name) {
      return _.find(errors, e => e.path == name) !== undefined;
    },
    errorMessages: function(name) {
      return _.uniq(_.map(_.filter(errors, e => e.path == name), e => e.message));
    }
  });
}

/* GET new User form */
router.get('/', function(req, res, next) {
  render(res, models.User.build(), []);
});

/* POST to create a new User */
router.post('/', function(req, res, next) {
  let errors = [];
  //// validate password
  if (req.body.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/) == null) {
    errors.push({
      path: 'password',
      message: 'Weak password: min 8 chars, including an uppercase and lowercase letter, and a number'
    });
  }
  //// validate username
  let user = models.User.build({
    username: req.body.username
  }).validate().then(function() {
    //// check if username exists
    models.User.find({where: sequelize.where(sequelize.fn('lower', sequelize.col('username')), sequelize.fn('lower', req.body.username))}).then(function(user) {
      if (user) {
        errors.push({
          path: 'username',
          message: 'This username has already been taken'
        });
      }
      if (errors.length == 0) {
        bcrypt.hash(req.body.password, 10).then(function(hashed_password) {
          models.User.create({
            username: req.body.username,
            hashed_password: hashed_password
          }).then(function(user) {
            res.redirect('/');
          }).catch(function(error) {
            errors = errors.concat(error.errors || []);
            render(res, req.body, errors);
          });
        });
      } else {
        render(res, req.body, errors);
      }
    });
  }).catch(function(error) {
    errors = errors.concat(error.errors);
    render(res, req.body, errors);
  });
});

module.exports = router;
