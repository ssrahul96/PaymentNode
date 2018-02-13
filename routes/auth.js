var express = require('express');
var router = express.Router();
var comfun = require('./commonfunctions');

router.get('/encrypt/:val', function (req, res, next) {
    var token = req.get("auth");
    if (token != 123456) {
        res.status(403);
        res.json({
            "error": "Unauthorised"
        });
    } else {
        res.json({
            "Encrypted Text": comfun.encrypt(req.params.val)
        });
    }
});

router.get('/decrypt/:val', function (req, res, next) {
    var token = req.get("auth");
    if (token != 123456) {
        res.status(403);
        res.json({
            "error": "Unauthorised"
        });
    } else {
        res.json({
            "Decrypted Text": comfun.decrypt(req.params.val)
        });
    }
});

module.exports = router;