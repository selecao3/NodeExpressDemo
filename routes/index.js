const express = require('express');
const router = express.Router();
require('date-utils');
const json2csv = require('json2csv');
const jconv = require('jconv');
const encodingJ = require('encoding-japanese');
const mongoservice = require('../Services/mongoServices');

/* GET home page. */
router.get('/', function (req, res, next) {
  const dt = new Date();
  res.render('index', {
    defaultYear: dt.toFormat('YYYY'),
    defaultMonth: dt.toFormat('M'),
    defaultDay: dt.toFormat('D'),
    defaultHour: dt.toFormat('HH24'),
    defaultMin: dt.toFormat('MI')
  });
});

router.get('/data2csv', function (req, res, next) {
  const promise = mongoservice.findById(req.param.id);
  // json2csvが型を見てるのか
  promise.then(
    function (csvTarget) {
      const csv = json2csv.parse(csvTarget.result, [
        'date',
        'stuff',
        'ident',
        'questioner',
        'questionersNumber',
        'questionersAddress',
        'questionersID',
        'questions',
        'questionsCon',
        'specialText'
      ]);
      res.setHeader('Content-disposition', 'attachment; filename=data.csv');
      res.setHeader('Content-Type', 'text/csv; charset=Shift_JIS');
      console.log(csv);
      // TODO: 電話番号の先頭０が消える問題
      // TODO: varからconstかletへ
      const csv2jp = encodingJ.convert(csv, {
        to: 'SJIS',
        from: 'UTF8',
        type: 'string'
      });
      console.log(csv2jp);
      res.send(csv2jp);
    },
    function (error) {
      console.log(error);
    }
  );
});

router.get('/lists', function (req, res, next) {
  let fld = [];
  const title = [
    'パスワードリクエスト',
    'ICカード不具合',
    '履修登録関連',
    '学内ライセンスソフトウェア',
    '端末設定対応',
    '証明書リクエスト',
    '教育用端末関連',
    'その他'
  ];
  fld = mongoservice.findForLatestDates(title);
  Promise.all(fld).then(
    function(fld) {
      const result = fld.filter(v => v);
      res.render('lists', {
      title:result 
      });
    },
    function(error) {
      console.log(error);
    }
  )

});

router.get('/lists/:itemName', function (req, res, next) {
  const promise = mongoservice.findByQuestions(req.params.itemName);
  promise.then(
    function (items) {
      res.render('itemFormat', {
        items: items.reverse()
      });
    },
    function (error) {
      console.log(error);
    }
  );
});
module.exports = router;
