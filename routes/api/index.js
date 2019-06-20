const express = require('express');
const router = express.Router();

const invitesRouter = require('./invites');
const membershipsRouter = require('./memberships');
const propertiesRouter = require('./properties');
const reportsRouter = require('./reports');
const usersRouter = require('./users');

router.use('/invites', invitesRouter);
router.use('/memberships', membershipsRouter);
router.use('/properties', propertiesRouter);
router.use('/reports', reportsRouter);
router.use('/users', usersRouter);

module.exports = router;
