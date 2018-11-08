var express = require('express');
var router = express.Router();
var models = require('../models');

/* GET First Part of Submission Form page. */
router.get('/step1', function(req, res, next) {
  res.render('submissions/new', { title: 'New Pest Report' });
});

/* Post Second part of Submission Form page. */
router.post('/step2', function(req, res, next) {
  res.render('submissions/new-users', {
    title: 'Your Info',
    step1: req.body
  });
});

/* Post to create a new report. */
router.post('/', function(req, res, next) {
  models.Report.create({
    what: req.body.what,
    where: req.body.where,
    pictureUrl: req.body.pictureUrl,
    name: req.body.name,
    phone: req.body.phone,
    streetNumber: req.body.streetNumber,
    streetName: req.body.streetName,
    unitNumber: req.body.unitNumber,
    city: "San Francisco",
    state: "California",
    postalCode: "94124",
  }).then(function(report) {
    res.render(`submissions/thank-you`, {
      title: 'Thank You',
      report: report
    });
  });
});

module.exports = router;
