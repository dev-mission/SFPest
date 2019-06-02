'use strict';

const express = require('express');
const router = express.Router();
const sequelize = require('sequelize');

const models = require('../../models');
const interceptors = require('../interceptors');

router.get('/', interceptors.requirePropertyMember, function(req, res, next) {
  const options = {
    page: req.query.page || 1,
    order: [['created_at', 'DESC']],
  };
  if (req.query.propertyId) {
    options.where = { propertyId: req.query.propertyId };
  } else {
    if (!req.user.isAdmin) {
      options.include = [
        {
          model: models.Property,
          include: [
            {
              model: models.Membership,
              where: {
                userId: req.user.id
              }
            }
          ]
        }
      ]
    }
  }
  models.Report.paginate(options).then(function({docs, pages, total}) {
    res.json(docs.map(d => d.toJSON()));
  });
});

router.get('/:id', interceptors.requirePropertyMember, function(req, res, next) {
  models.Report.findByPk(req.params.id).then(function(report) {
    res.json(report.toJSON());
  });
});

module.exports = router;
