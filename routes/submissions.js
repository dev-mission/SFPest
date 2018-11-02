var express = require('express');
var router = express.Router();

/* GET First Part of Submission Form page. */
router.get('/', function(req, res, next) {
  res.render('submissions/new', { title: 'New Pest Report' });
});

module.exports = router;
