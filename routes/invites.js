'use strict';

const express = require('express');
const router = express.Router();
const models = require('../models');
const bcrypt = require('bcrypt');
const sequelize = require('sequelize');
const helpers = require('./helpers');
const interceptors = require('./interceptors');


router.get('/accepted', interceptors.requireLogin, function(req, res, next) {
  res.render('invites/accepted', {
    title: 'Invite accepted!'
  })
});

function render(req, res, invite, user, errors) {
  helpers.register(res, errors);
  res.render('invites/show', {
    title: "You're invited!",
    show: req.query.login ? 'login' : 'register',
    invite: invite,
    user: user
  });
}

router.get('/:id', function(req, res, next) {
  req.logout();
  res.locals.currentUser = null;
  models.Invite.findByPk(req.params.id, { include: ['property'] }).then(function(invite) {
    render(req, res, invite, invite, [])
  });
});

router.post('/:id', function(req, res, next) {
  models.Invite.findByPk(req.params.id, { include: ['property'] }).then(function(invite) {
    if (req.body.accept == 'login') {
      let redirectUrl = req.originalUrl;
      if (redirectUrl.indexOf('?') > 0) {
        redirectUrl = redirectUrl.substring(0, redirectUrl.indexOf('?'));
      }
      interceptors.passport.authenticate('local', {
        failureRedirect: `${redirectUrl}?login=1`,
        failureFlash: true
      })(req, res, function() {
        invite.acceptBy(req.user).then(function() {
          req.flash('info', 'Invite accepted!');
          res.redirect(`/invites/accepted`);
        });
      });
    } else if (req.body.accept == 'register') {
      delete req.query.login;
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
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email
      }).validate().then(function() {
        //// check if username exists
        models.User.findOne({where: sequelize.where(sequelize.fn('lower', sequelize.col('email')), sequelize.fn('lower', req.body.email))}).then(function(user) {
          if (user) {
            errors.push({
              path: 'email',
              message: 'This email has already been registered'
            });
          }
          if (errors.length == 0) {
            bcrypt.hash(req.body.password, 10).then(function(hashedPassword) {
              models.User.create({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                hashedPassword: hashedPassword
              }).then(function(user) {
                invite.acceptBy(user).then(function() {
                  req.flash('info', 'Account created! Please log in with your email and password.');
                  res.redirect(`/login?redirectURI=${encodeURIComponent('/admin')}`);
                });
              }).catch(function(error) {
                errors = errors.concat(error.errors || []);
                render(req, res, invite, req.body, errors);
              });
            });
          } else {
            render(req, res, invite, req.body, errors);
          }
        });
      }).catch(function(error) {
        errors = errors.concat(error.errors || []);
        render(req, res, invite, req.body, errors);
      });
    }
  });
});

module.exports = router;
