var express = require('express');
var router = express.Router();
require('date-utils');
var Mongo = require('../data/db/mongo');
var json2csv = require('json2csv');
var jconv = require('jconv');
var encodingJ = require('encoding-japanese');


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

router.get('/data2csv', function (req, res, next) {
  Mongo.FormedModel.findOne({ id: req.param.id }, function (err, result) {
    if (err) throw err;
    // json2csvが型を見てるのか
    const csv = json2csv.parse(result, [
      'date',
      'stuff',
      'ident',
      'questioner',
      'questionersNumber',
      'questionersAddress',
      'questionersID',
      'questions',
      'questionsCon',
      'specialText',
    ]);
    
    res.setHeader('Content-disposition', 'attachment; filename=data.csv');
    res.setHeader('Content-Type', 'text/csv; charset=Shift_JIS');
    console.log(csv);
    // TODO: 電話番号の先頭０が消える問題
    // TODO: varからconstかletへ
    var csv2jp = encodingJ.convert(csv,{
      to: 'SJIS',
      from: 'UTF8',
      type: 'string'
    });
    console.log(csv2jp);
    res.send(csv2jp);
  })

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
  Mongo.FormedModel.find({ questions: req.params.itemName }, function (err, result) {
    if (err) throw err;
    res.render('itemFormat', {
      items: result.reverse()
    });
  })
  

});

module.exports = router;


