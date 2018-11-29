var express = require('express');
var router = express.Router();
var models = require('../models');
var bcrypt = require('bcrypt')
/* GET New User Form. */
router.get('/', function(req, res, next) {
    res.render('register/new', { title: 'Sign Up' });
  });

  /* Post to create a new report. */
router.post('/', function(req, res, next) {
    bcrypt.hash(req.body.password, 10).then(function(hashed_password) {
        models.User.create({
            username: req.body.username,
            hashed_password: hashed_password
        }).then(function(report) {
          res.redirect('/');
        });
    }); 
});
  

module.exports = router;