const express = require('express');

const router = express.Router();
require('date-utils');
const Json2csvParser = require('json2csv').Parser;
const iconv = require('iconv-lite');
const ms = require('../Services/mongoServices');
const paginate = require('express-paginate');

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
        const json2csvParser = new Json2csvParser({fields});
        const csv = json2csvParser.parse(csvTarget);
        res.setHeader('Content-disposition', 'attachment; filename=data.csv');
        res.setHeader('Content-Type', 'text/csv; charset=UTF-8');
        const csvJP = iconv.encode(csv, 'Shift-JIS');
        res.send(csvJP);
      },
      function(error) {
        console.log(error);
      });
});

router.get('/deleteData/:id', function(req, res, next) {
  const flag = ms.deleteByID(req.params.id);
  console.log(flag);
  if (flag) {
    res.redirect(302, '/');
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
  // ms.paginateTest();
  const page = req.query.page;
  const promise = ms.findByQuestions(req.params.itemName, page);

  promise.then(
      function(items) {
        res.render('itemFormat', {
          items: items.docs,
          pages: paginate.getArrayPages(req)(5, items.pages, req.query.page),
          maxPage: items.pages
        });
      },
      function(error) {
        console.log(error);
      });
});

router.get('/search/result', function(req, res, next) {
  const page = req.query.page;
  const items = req.cookies.searchRes;
  const promise = ms.searchByBody(items, page)
  promise.then(
      function(items) {
        res.render('itemFormat', {
          items: items.docs,
          pages: paginate.getArrayPages(req)(5, items.pages, req.query.page),
          maxPage: items.pages
        });
      },
      function() {
        console.log('coockie\'s error');
      })
});


router.get('/lists/:itemName/:itemID', function(req, res, next) {
  const targetName = req.params.itemName;
  const targetId = req.params.itemID;
  ms.FinCheck2True(targetId);
  res.redirect(302, `/lists/${targetName}`);
});

router.get('/updateData/edit/:itemID', function(req, res, next) {
  const promise = ms.findById(req.params.itemID);
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
