'use strict';

const express = require('express');
const router = express.Router();
const models = require('../models');


router.get('/', function(req, res, next) {
  models.Property.findAll({
    order: [['name', 'ASC']]
  }).then(function(properties) {
    res.render('index', {
      title: 'Home',
      layout: 'home-layout',
      properties: properties
    });
  });
});

router.get('/about-us', function(req, res, next) {
  res.render('about', {
    title: 'About Us',
    layout: 'home-layout'
  });
});

router.get('/disclaimers', function(req, res, next) {
  res.render('disclaimers', {
    title: 'Disclaimers',
    layout: 'home-layout'
  });
});

router.get('/logout', function(req,res,next){
  req.logout();
  req.flash('info', 'You have been logged out.');
  res.redirect('/');
});

module.exports = router;
