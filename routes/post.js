const express = require('express');
//var Model = require('../data/db/model');
const Mongo = require('../mongo');

const router = express.Router();

//folderNameがダブっていない＝＞DBへsave
//folderNameがダブっている＝＞redirect
router.post('/postData', function(req, res, next) {
    
    const model = new Mongo.FormedModel({
    date: req.body.date,
    stuff: req.body.stuff,
    ident: req.body.ident,
    questioner: req.body.questioner,
    questionersNumber: req.body.questionersNumber,
    questionersAddress: req.body.questionersAddress,
    questionersID: req.body.questionersID,
    questions: req.body.questions,
    questionsCon: req.body.questionsCon,
    specialText: req.body.specialText,
    checkFin: req.body.checkFin
    });

    model.save(function(err) {
        if (err) {
            res.send(err);
        }
    });
    res.redirect(302, "/");
});

// router.post('/data2csv', function(req, res, next) {

//     res.redirect(302,"users");
// });

module.exports = router;
