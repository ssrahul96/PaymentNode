var express = require('express');
var router = express.Router();


router.get('/', function (req, res, next) {
    res.render('index.html');
});

router.get('/example', function (req, res, next) {
    res.render('example.html');
});

module.exports = router;