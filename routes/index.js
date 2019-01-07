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
  Mongo.FormedModel.find({ id: req.param.id }, function (err, result) {
    if (err) throw err;
    dataList = [{
      date: result[0].date,
      stuff: result[0].stuff,
      ident: result[0].ident,
      questioner: result[0].questioner,
      questionersNumber: result[0].questionersNumber,
      questionersAddress: result[0].questionersAddress,
      questionersID: result[0].questionersID,
      questions: result[0].questions,
      questionsCon: result[0].questionsCon,
      specialText: result[0].specialText,
    }]
    console.log(result[0]);
    const csv = json2csv.parse(dataList, [
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
    var csv2jp = encodingJ.convert(csv,{
      to: 'SJIS',
      from: 'UTF8',
      type: 'string'
    });

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


