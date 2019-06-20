'use strict';

const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const Op = Sequelize.Op

const models = require('../../models');
const interceptors = require('../interceptors');

router.get('/', interceptors.requirePropertyMember, function(req, res, next) {
  if (req.query.propertyId) {
    const options = {
      page: req.query.page || 1,
      where: {
        propertyId: req.query.propertyId,
        revokedAt: null
      },
      order: [['created_at', 'DESC']],
      include: 'user'
    };
    models.Membership.paginate(options).then(function({docs, pages, total}) {
      res.json(docs.map(d => d.toJSON()));
    });
  }
});

router.get('/:id', interceptors.requirePropertyMember, function(req, res, next) {
  models.Membership.findOne({
    where: {
      id: req.params.id,
      revokedAt: null
    }
  }).then(function(membership) {
    if (membership) {
      res.json(membership.toJSON());
    } else {
      res.sendStatus(404);
    }
  });
});

router.delete('/:id', interceptors.requirePropertyAdmin, function(req, res, next) {
  models.Membership.findOne({
    where: {
      id: req.params.id,
      revokedAt: null
    }
  }).then(function(membership) {
    if (membership) {
      membership.update({
        revokedAt: Date.now(),
        revokerId: req.user.id
      }).then(function() {
        res.sendStatus(204);
      });
    } else {
      res.sendStatus(404);
    }
  });
});

module.exports = router;
