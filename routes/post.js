const express = require('express');
const ms = require('../Services/mongoServices');
const paginate = require('express-paginate');

const router = express.Router();

router.post('/postData', function(req, res, next) {
  const promise = ms.savesForQuestionerData(req.body);
  promise.then(
      function() {
        res.redirect(302, '/');
      },
      function() {
        res.redirect(503, '/');
      });
});

router.post('/search', function(req, res, next) {
  res.cookie('searchRes', req.body, {path: '/search'});
  res.redirect(301, '/search/result');
});



router.post('/updateData/:itemName/:itemID', function(req, res, next) {
  const itemID = req.params.itemID;
  const itemName = req.params.itemName;
  const flag = ms.updateOneDataByBody(req.body, itemID);

  if (flag) {
    res.redirect(302, `/lists/${itemName}`);
  } else {
    res.redirect(503, '/');
  }
});

module.exports = router;
