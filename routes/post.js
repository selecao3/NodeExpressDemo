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
    }
  );
});

module.exports = router;
