const express = require('express');
const ms = require('../Services/mongoServices');

const router = express.Router();

//folderNameがダブっていない＝＞DBへsave
//folderNameがダブっている＝＞redirect
router.post('/postData', function(req, res, next) {
    const savedb = ms.savesForQuestionerData(res, req.body);
    if (savedb === 0) {
        res.redirect(302, '/');
    }else{
        // TODO: errorページの作成&そっちに飛ばす
        res.redirect(503, '/');
    }
});

module.exports = router;
