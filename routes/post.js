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
router.post('/updateData/:itemName/:itemID', function(req, res, next) {
  const itemID = req.params.itemID;
  const itemName = req.params.itemName;
  const flag = ms.updateOneDataByBody(req.body, itemID);

  console.log(`/lists/${itemName}`);
  if (flag) {
    res.redirect(302, `/lists/${itemName}`);
  } else {
    res.redirect(503, '/');
  }
});


module.exports = router;
