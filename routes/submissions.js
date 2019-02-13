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

/* Post Second part of Submission Form page. */
router.post('/step2', function(req, res, next) {
  //// set up a helper function to render
  const render = function() {
    res.render('submissions/new-users', {
      title: 'Your Info',
      step1: req.body
    });
  }
  //// if photo submitted, copy to a temporary location
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
        render();
      });
    }
  } else {
    //// just render directly
    render();
  }
});

/* Post to create a new report. */
router.post('/', function(req, res, next) {
  const render = function(report) {
    res.render(`submissions/thank-you`, {
      title: 'Thank You',
      report: report
    });
  };
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
    if (req.body.pictureUrl) {
      //// if a picture was uploaded, move to a permanent location and update
      if (process.env.NODE_ENV == 'production') {
        //// TODO
      } else {
        //// move into public uploads
        const src = `/tmp${req.body.pictureUrl}`;
        const dest = `${path.resolve(__dirname, '../public')}${req.body.pictureUrl}`;
        mv(src, dest, {mkdirp: true}, function(err) {
          render(report);
        });
      }
    } else {
      render(report);
    }
  });
});

module.exports = router;
