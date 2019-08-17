'use strict';

const express = require('express');
const router = express.Router();

const sequelize = require('sequelize');
const models = require('../../models');
const interceptors = require('../interceptors');

router.get('/', function(req, res, next) {
  const options = {
    page: req.query.page || 1,
    order: [['name', 'ASC']],
  };
  if (!req.user.isAdmin) {
    options.include = [
      {
        model: models.Membership,
        where: {
          userId: req.user.id
        },
        as: 'memberships'
      }
    ]
  }
  models.Property.paginate(options).then(function({docs, pages, total}) {
    res.json(docs.map(p => p.toJSON()));
  });
});

router.post('/', interceptors.requireAdmin, function(req, res, next) {
  models.Property.create({
    name: req.body.name,
    urlId: req.body.urlId,
    streetNames: req.body.streetNames,
    city: req.body.city,
    state: req.body.state,
    postalCode: req.body.postalCode,
    confirmation: req.body.confirmation
  }).then(function(property) {
    res.json(property.toJSON());
  }).catch(function(error) {
    if (error.name == 'SequelizeValidationError') {
      res.status(422).json({
        status: 422,
        messages: error.errors
      });
    } else {
      res.sendStatus(500);
    }
  });
});

router.get('/:id', interceptors.requireAdmin, function(req, res, next) {
  models.Property.findByPk(req.params.id).then(function(property) {
    if (property) {
      res.json(property.toJSON());
    } else {
      res.sendStatus(404);
    }
  });
});

router.patch('/:id', interceptors.requireAdmin, function(req, res, next) {
  models.Property.findByPk(req.params.id).then(function(property) {
    property.update({
      name: req.body.name,
      urlId: req.body.urlId,
      streetNames: req.body.streetNames,
      city: req.body.city,
      state: req.body.state,
      postalCode: req.body.postalCode,
      confirmation: req.body.confirmation
    }).then(function(property) {
      res.json(property.toJSON());
    }).catch(function(error) {
      if (error.name == 'SequelizeValidationError') {
        res.status(422).json({
          status: 422,
          messages: error.errors
        });
      } else {
        res.sendStatus(500);
      }
    });
  });
});

router.delete('/:id', interceptors.requireAdmin, function(req, res, next) {
  models.Property.findByPk(req.params.id).then(function(property) {
    property.destroy().then(function() {
      res.sendStatus(204);
    });
  });
});

module.exports = router;
