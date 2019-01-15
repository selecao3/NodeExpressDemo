const express = require('express');
const ms = require('../Services/mongoServices');

const router = express.Router();

//folderNameがダブっていない＝＞DBへsave
//folderNameがダブっている＝＞redirect
router.post('/postData', function(req, res, next) {
    const promise = ms.savesForQuestionerData(res, req.body);
    promise.then(function() {
        res.redirect(302, '/');
    }, function() {
        res.redirect(503, '/');
    })
    // if (savedb === 0) {
        
    // }else{
    //     // TODO: errorページの作成&そっちに飛ばす
    //     res.redirect(503, '/');
    // }
});

module.exports = router;
