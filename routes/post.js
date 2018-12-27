var express = require('express');

var router = express.Router();

//folderNameがダブっていない＝＞DBへsave
//folderNameがダブっている＝＞redirect
router.post('/postData', function(req, res, next) {
    console.log(req.body);
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
