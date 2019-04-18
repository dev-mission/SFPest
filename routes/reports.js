var express = require('express');
var router = express.Router();
var models = require('../models');

/* GET All Pest Reports. */
router.get('/', function(req, res, next) {
    models.Report.findAll({
        order: [
         ['createdAt', 'DESC']],
        }).then(function(reports) {
        res.render('reports/index', {
            title: 'All Pest Reports',
            reports: reports
        });
    });
});

router.get('/:id', function(req, res, next) {
    models.Report.findByPk(req.params.id).then(function(report) {
        res.render('reports/show', {
            title: "Report Details",
            report: report
        });
    });
});

module.exports = router;
