const express = require('express');
const ms = require('../Services/mongoServices');

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

// MEMO: 問題あり
router.post('/updateData/:itemID', function(req, res, next) {
  const itemID = req.params.itemID;
  const flag = ms.updateOneDataByBody(req.body, itemID);
  if (flag) {
    res.redirect(302, '/');
  } else {
    res.redirect(503, '/');
  }
});


module.exports = router;
