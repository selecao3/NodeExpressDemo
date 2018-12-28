var express = require('express');
//var Model = require('../data/db/model');
var Mongo = require('../data/db/mongo');


var router = express.Router();

//folderNameがダブっていない＝＞DBへsave
//folderNameがダブっている＝＞redirect
router.post('/postData', function(req, res, next) {
    
    var model = new Mongo.FormedModel({
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

    console.log(req.body);
    model.save(function(err) {
        if (err) {
            res.send(err);
        }
        console.log("posted!!");
    });
    
    res.redirect(302, "/");
});

router.post('/test', function(req, res, next) {
    var db = req.db;
    var collection = db.post('node_demo_coll');
    collection
    if (req.folderName) {
        
    }

    res.redirect(302,"users");
});

module.exports = router;
