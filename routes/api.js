var express = require('express');
var router = express.Router();
var comfun = require('./commonfunctions');
var mongojs = require('mongojs');

router.get('/', function (req, res, next) {
    res.json({
        "status": "success",
        "message": "It works fine"
    })
});

router.put("/savetrans/:uid", function (req, res, next) {
    var param = req.body;
    var uid = req.params.uid;
    var token = req.get("auth");
    comfun.checkToken(uid, token, function (sts) {
        console.log(sts)
        if (sts.sts) {
            res.json({
                "status": "success",
                "description": "authorised"
            });
        } else {
            res.status(403);
            res.json({
                "status": "error",
                "description": sts.desc
            });
        }
    })

    var db = mongojs(comfun.getDBConString(), ['ssrahul96']);

});


module.exports = router;