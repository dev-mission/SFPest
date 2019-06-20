'use strict';

const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const Op = Sequelize.Op

const models = require('../../models');
const interceptors = require('../interceptors');

router.get('/', interceptors.requirePropertyAdmin, function(req, res, next) {
  if (req.query.propertyId) {
    const options = {
      page: req.query.page || 1,
      where: { propertyId: req.query.propertyId },
      order: [['created_at', 'DESC']],
      include: [{model: models.User, as: 'revoker'}, {model: models.User, as: 'inviter'}, {model: models.Membership, as: 'accepted', include: ['user']}]
    };
    models.Invite.paginate(options).then(function({docs, pages, total}) {
      res.json(docs.map(d => d.toJSON()));
    });
  } else {
    res.sendStatus(422);
  }
});

router.post('/', interceptors.requirePropertyAdmin, function(req, res, next) {
  models.Invite.create({
    propertyId: req.body.propertyId,
    inviterId: req.user.id,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    isAdmin: req.body.isAdmin,
  }).then(function(invite) {
    res.json(invite.toJSON());
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

router.get('/:id', interceptors.requirePropertyAdmin, function(req, res, next) {
  models.Invite.findByPk(req.params.id, {
    include: [{model: models.User, as: 'revoker'}, {model: models.User, as: 'inviter'}, {model: models.Membership, as: 'accepted', include: ['user']}]
  }).then(function(invite) {
    if (invite) {
      res.json(invite.toJSON());
    } else {
      res.sendStatus(404);
    }
  });
});

router.delete('/:id', interceptors.requirePropertyAdmin, function(req, res, next) {
  models.Invite.findByPk(req.params.id).then(function(invite) {
    if (invite) {
      if (invite.acceptedAt) {
        //// invite already accepted, not allowed
        res.sendStatus(405);
      } else if (invite.revokedAt) {
        //// invite already revoked, confirm as success
        res.sendStatus(204);
      } else {
        //// revoke
        invite.update({
          revokedAt: Date.now(),
          revokerId: req.user.id
        }).then(function() {
          res.sendStatus(204);
        });
      }
    } else {
      res.sendStatus(404);
    }
  });
});

module.exports = router;
