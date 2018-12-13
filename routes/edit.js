var express = require('express');
require('date-utils');

var router = express.Router();

// router.post('/', function(req, res, next) {
//     console.log(req.body);
//     console.log(req.body.name);
//     res.redirect(302,"page");
// });
router.get('/', function (req, res, next) {
    var dt = new Date();
    res.render('edit',
    {
        month: dt.toFormat("M")
        ,day: dt.toFormat("D")
        ,hour: dt.toFormat("HH24")
        ,min: dt.toFormat("MI")
    }
    );
});

module.exports = router;
