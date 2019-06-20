'use strict';

const createError = require('http-errors');
const express = require('express');
const router = express.Router();
const models = require('../models');
const uuid = require('uuid/v4');
const mime = require('mime-types');
const mkdirp = require('mkdirp');
const mv = require('mv');
const path = require('path');
const AWS = require('aws-sdk');
const helpers = require('./helpers');

/* Have ALL submissions views use the home-layout */
router.use('/:urlId', function(req, res, next) {
  models.Property.findOne({where: {urlId: req.params.urlId}}).then(function(property) {
    if (property) {
      res.locals.property = property;
      res.locals.layout = 'home-layout';
      next();
    } else {
      next(createError(404));
    }
  });
});

const what = [
  'ants',
  'bedbugs',
  'cockroaches',
  'fleas',
  'flies',
  'rodents',
  'mosquitos',
  'other'
];

/* GET First Part of Submission Form page. */
router.get('/:urlId', function(req, res, next) {
  let report = models.Report.build({
    what: what[0]
  });
  helpers.register(res, []);
  res.render('submissions/step1', {
    title: 'New Pest Report',
    what: what,
    report: report
  });
});

/** Helper function to check for a picture upload */
function handlePictureFromStep1(req, callback) {
  if (req.files && req.files.picture && req.files.picture.size > 0) {
    const pictureUrl = `/uploads/${uuid()}/original.${mime.extension(req.files.picture.mimetype)}`;
    req.body.pictureUrl = pictureUrl;
    //// in production, upload to S3
    if (process.env.AWS_S3_BUCKET) {
      //// copy to a tmp location that will be cleaned up if submission not completed
      const key = `tmp${pictureUrl}`;
      //// store in S3
      var s3 = new AWS.S3({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.AWS_S3_BUCKET_REGION
      });
      s3.putObject({
        Bucket: process.env.AWS_S3_BUCKET,
        Key: key,
        Body: req.files.picture.data,
        ACL: 'public-read'
      }, function(err, data) {
        if (err) {
          console.log(err);
        }
        callback();
      });
    } else {
      //// in development move to tmp dir
      const dest = `/tmp${pictureUrl}`;
      mkdirp.sync(path.dirname(dest));
      req.files.picture.mv(dest, function(err) {
        callback();
      });
    }
  } else {
    callback();
  }
}

router.post('/:urlId', function(req, res, next) {
  handlePictureFromStep1(req, function () {
    let report = models.Report.build({
      what: req.body.what,
      other: req.body.other,
      location: req.body.location,
      phone: req.body.phone.replace(/[^0-9]/g, ''),
    });
    report.validate({
      fields: ['what', 'other', 'location', 'phone']
    }).then(function() {
      req.body.streetName = res.locals.property.streetNames[0];
      helpers.register(res, []);
      res.render('submissions/step2', {
        title: 'Your Contact Info',
        report: req.body
      });
    }).catch(function(error) {
      helpers.register(res, error.errors);
      res.render('submissions/step1', {
        title: 'New Pest Report',
        what: what,
        report: req.body
      });
    });
  })
});

function handlePictureFromStep2(report, callback) {
  if (report.pictureUrl && report.pictureUrl != "") {
    //// if a picture was uploaded, move to a permanent location
    if (process.env.AWS_S3_BUCKET) {
      //// move out of tmp
      var s3 = new AWS.S3({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.AWS_S3_BUCKET_REGION
      });
      s3.copyObject({
        CopySource: `/${process.env.AWS_S3_BUCKET}/tmp${report.pictureUrl}`,
        Bucket: process.env.AWS_S3_BUCKET,
        Key: report.pictureUrl.substring(1), // removing leading slash
        ACL: 'public-read'
      }, function(err, data) {
        if (err) {
          console.log(err);
          callback();
        } else {
          //// update pictureUrl with hostname
          report.pictureUrl = `${process.env.AWS_S3_BASE_URL}${report.pictureUrl}`;
          report.save().then(function() {
            callback();
          });
        }
      });
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
router.post('/:urlId/step2', function(req, res, next) {
  models.Report.create({
    what: req.body.what,
    other: req.body.other,
    location: req.body.location,
    name: req.body.name,
    pictureUrl: req.body.pictureUrl,
    phone: req.body.phone.replace(/[^0-9]/g, ''),
    streetNumber: req.body.streetNumber,
    streetName: req.body.streetName,
    unitNumber: req.body.unitNumber,
    city: res.locals.property.city,
    state: res.locals.property.state,
    postalCode: res.locals.property.postalCode,
    propertyId: res.locals.property.id
  }).then(function(report) {
    handlePictureFromStep2(report, function() {
      res.redirect(`/${req.params.urlId}/confirm?reportId=${report.id}`);
    })
  }).catch(function(error) {
    console.log(error);
    helpers.register(res, error.errors);
    res.render('submissions/step2', {
      title: 'Your Contact Info',
      report: req.body
    });
  });
});

router.get('/:urlId/confirm', function(req, res, next) {
  models.Report.findByPk(req.query.reportId).then(function(report) {
    res.render(`submissions/confirm`, {
      title: 'Report received',
      report: report
    });
  });
});

module.exports = router;
