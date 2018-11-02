var express = require('express');
var router = express.Router();

/* GET First Part of Submission Form page. */
router.get('/', function(req, res, next) {
  res.render('submissions/new', { title: 'New Pest Report' });
});

/* Post Second part of Submission Form page. */
router.post('/', function(req, res, next) {
  res.render('submissions/new-users', {
    title: 'Your Info',
    step1: req.body
  });
});

module.exports = router;
