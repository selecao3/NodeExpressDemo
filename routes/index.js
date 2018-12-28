var express = require('express');
var router = express.Router();
require('date-utils');
var Mongo = require('../data/db/mongo');


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
  var title = [
    'パスワードリクエスト',
    'ICカード不具合',
    '履修登録関連',
    '学内ライセンスソフトウェア',
    '端末設定対応',
    '証明書リクエスト',
    '教育用端末関連',
    'その他',
  ];
  res.render('lists', {
    title: title
  });
});

router.get('/lists/:itemName', function (req, res, next) {
  Mongo.FormedModel.find({questions: req.params.itemName}, function(err, result) {
    if (err) throw err;
    res.render('itemFormat', {
      items: result.reverse()
    });
    console.log(result);
  })

});

module.exports = router;


