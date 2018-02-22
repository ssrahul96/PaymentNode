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

router.put("/savetrans/:requid", function (req, res, next) {
    var param = req.body;
    var requid = req.params.requid;
    var token = req.get("auth");
    console.log(param);
    comfun.checkToken(requid, token, function (resp) {
        if (resp.sts) {
            var db = mongojs(comfun.getDBConString(), ['ssrahul96']);
            // db.ssrahul96.findAndModify({
            //     query: {
            //         uid: requid
            //     },
            //     update: {
            //         $set: {
            //             'pending': param
            //         }
            //     },
            //     new: true
            // }, function (err, doc, lastErrorObject) {
            //     res.json({
            //         "status": "success",
            //         "description": "saved"
            //     });
            // })
            db.ssrahul96.find({
                "pending.paid": {$eq: false}
            }, {
                "pending": 1,
                _id: 0
            }, function (err, ssrahul96) {
                if (err) {
                    res.send(err);
                }
                res.json(ssrahul96);
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