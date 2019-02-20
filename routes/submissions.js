var express = require('express');
var router = express.Router();
var models = require('../models');
var uuid = require('uuid/v4');
var mime = require('mime-types');
var mkdirp = require('mkdirp');
var mv = require('mv');
var path = require('path');

/* GET First Part of Submission Form page. */
router.get('/step1', function(req, res, next) {
  res.render('submissions/new', { title: 'New Pest Report' });
});

/** Helper function to check for a picture upload */
function handlePictureFromStep1(req, callback) {
  if (req.files && req.files.picture) {
    const pictureUrl = `/uploads/${uuid()}/original.${mime.extension(req.files.picture.mimetype)}`;
    //// in production, upload to S3
    if (process.env.NODE_ENV == 'production') {
      //// TODO
    } else {
      //// in development move to tmp dir
      const dest = `/tmp${pictureUrl}`;
      mkdirp.sync(path.dirname(dest));
      req.files.picture.mv(dest, function(err) {
        req.body.pictureUrl = pictureUrl;
        callback();
      });
    }
  } else {
    callback();
  }
}

/* POST to Second part of Submission Form page. */
router.post('/step2', function(req, res, next) {
  handlePictureFromStep1(req, function () {
    res.render('submissions/new-users', {
      title: 'Your Info',
      step1: req.body
    });
  })
});

function handlePictureFromStep2(report, callback) {
  if (report.pictureUrl && report.pictureUrl != "") {
    //// if a picture was uploaded, move to a permanent location
    if (process.env.NODE_ENV == 'production') {
      //// TODO
    } else {
      //// move into public uploads
      const src = `/tmp${report.pictureUrl}`;
      const dest = `${path.resolve(__dirname, '../public')}${report.pictureUrl}`;
      mv(src, dest, {mkdirp: true}, function(err) {
        callback();
      });
    }
  } else {
    callback();
  }
}

/* Post to create a new report. */
router.post('/', function(req, res, next) {
  models.Report.create({
    what: req.body.what,
    location: req.body.location,
    name: req.body.name,
    pictureUrl: req.body.pictureUrl,
    phone: req.body.phone,
    streetNumber: req.body.streetNumber,
    streetName: req.body.streetName,
    unitNumber: req.body.unitNumber,
    city: "San Francisco",
    state: "California",
    postalCode: "94124",
  }).then(function(report) {
    handlePictureFromStep2(report, function() {
      res.render(`submissions/thank-you`, {
        title: 'Thank You',
        report: report
      });      
    })
  });
});

module.exports = router;
