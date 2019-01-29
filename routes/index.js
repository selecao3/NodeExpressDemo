const express = require('express');
const router = express.Router();
require('date-utils');
const Json2csvParser = require('json2csv').Parser;
const iconv = require('iconv-lite');
const ms = require('../Services/mongoServices');

/* GET home page. */
router.get('/', function(req, res, next) {
  const dt = new Date();
  res.render('index', {
    defaultYear: dt.toFormat('YYYY'),
    defaultMonth: dt.toFormat('M'),
    defaultDay: dt.toFormat('D'),
    defaultHour: dt.toFormat('HH24'),
    defaultMin: dt.toFormat('MI')
  });
});

router.get('/data2csv/:id', function(req, res, next) {
  // MEMO: req.params.id => findByIdのidは_idでないといけない
  const promise = ms.findById(req.params.id);
  const fields = [
    'date', 'stuff', 'ident', 'questioner', 'questionersNumber',
    'questionersAddress', 'questionersID', 'questions', 'questionsCon',
    'specialText'
  ];
  promise.then(
      function(csvTarget) {
        console.log(csvTarget);
        const json2csvParser = new Json2csvParser({fields});
        const csv = json2csvParser.parse(csvTarget);
        res.setHeader('Content-disposition', 'attachment; filename=data.csv');
        res.setHeader('Content-Type', 'text/csv; charset=UTF-8');
        console.log(csv);
        const csvJP = iconv.encode(csv, 'Shift-JIS');
        console.log(csvJP);
        res.send(csvJP);
      },
      function(error) {
        console.log(error);
      });
});

router.get('/lists/:targetName/deleteData/:id', function(req, res, next) {
  const flag = ms.deleteByID(req.params.id);
  const targetName = req.params.targetName;
  console.log(flag);
  if (flag) {
    res.redirect(302, `/lists/${targetName}`);
  } else {
    res.redirect(502, '/');
  }
});

router.get('/lists', function(req, res, next) {
  let fld = [];
  const title = [
    'パスワードリクエスト', 'ICカード不具合', '履修登録関連',
    '学内ライセンスソフトウェア', '端末設定対応', '証明書リクエスト',
    '教育用端末関連', 'その他'
  ];
  fld = ms.findForLatestDates(title);
  Promise.all(fld).then(
      function(fld) {
        const result = fld.filter(v => v);
        res.render('lists', {title: result});
      },
      function(error) {
        console.log(error);
      });
});

// TODO: pagingの実装

router.get('/lists/:itemName', function(req, res, next) {
  const promise = ms.findByQuestions(req.params.itemName);
  promise.then(
      function(items) {
        res.render('itemFormat', {items: items.reverse()});
      },
      function(error) {
        console.log(error);
      });
});

router.get('/lists/:itemName', function(req, res, next) {
  console.log(req.query.page);
  const promise = ms.findByQuestions(req.params.itemName);
  promise.then(
      function(items) {
        res.render('itemFormat', {items: items.reverse()});
      },
      function(error) {
        console.log(error);
      });
});



router.get('/lists/:itemName/:itemID', function(req, res, next) {
  const targetName = req.params.itemName;
  const targetId = req.params.itemID;
  const tmp = ms.FinCheck2True(targetId);
  console.log(tmp);
  res.redirect(302, `/lists/${targetName}/#${targetId}`);
});

router.get('/updateData/edit/:itemID', function(req, res, next) {
  console.log(req.params.itemID);
  const promise = ms.findById(req.params.itemID);
  console.log(promise);
  promise.then(
      function(items) {
        res.render('update', {v: items});
      },
      function(error) {
        console.log(error);
        res.render('error');
      });
});

module.exports = router;
