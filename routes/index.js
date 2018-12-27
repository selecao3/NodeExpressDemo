var express = require('express');
var router = express.Router();
require('date-utils');


/* GET home page. */
router.get('/', function (req, res, next) {
  var dt = new Date();
  res.render('index', {
    defaultYear: dt.toFormat("YYYY"),
    defaultMonth: dt.toFormat("M"),
    defaultDay: dt.toFormat("D"),
    defaultHour: dt.toFormat("HH24"),
    defaultMin: dt.toFormat("MI")
  });
});

router.get('/lists', function (req, res, next) {
  res.render('lists', {
  });
});
router.get('/lists/:itemName', function (req, res, next) {
  var names = ['name01','name02','name03'];
  res.render('itemFormat', {
    // name: req.params.itemName
    name: names
  });
});

module.exports = router;


