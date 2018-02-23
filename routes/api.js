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

router.get("/getpending/:requid", function (req, res, next) {
    var param = req.body;
    var requid = req.params.requid;
    var token = req.get("auth");
    //console.log(param);
    comfun.checkToken(requid, token, function (resp) {
        if (resp.sts) {
            var db = mongojs(comfun.getDBConString(), ['ssrahul96']);
            db.ssrahul96.find({
                "uid": {
                    $eq: requid
                }
            }, function (err, ssrahul96) {
                if (err) {
                    res.send(err);
                }
                var pend_pay = [];
                for (var count in ssrahul96[0]['pending']) {
                    if (!ssrahul96[0]['pending'][count]['paid']) {
                        pend_pay.push(ssrahul96[0]['pending'][count]);
                    }
                }
                res.send(pend_pay);
            });

        } else {
            res.status(403);
            res.json({
                "status": "error",
                "description": sts.desc
            });
        }
    })
});

router.put("/newtrans/:requid", function (req, res, next) {
    var param = req.body;
    var requid = req.params.requid;
    var token = req.get("auth");
    comfun.checkToken(requid, token, function (resp) {
        if (resp.sts) {
            var db = mongojs(comfun.getDBConString(), ['ssrahul96']);
            db.ssrahul96.find({
                "uid": {
                    $eq: requid
                }
            }, function (err, ssrahul96) {
                if (err) {
                    res.send(err);
                }
                var pend_pay = [];
                for (var count in ssrahul96[0]['pending']) {
                    pend_pay.push(ssrahul96[0]['pending'][count]);
                }
                pend_pay.push(param);

                db.ssrahul96.findAndModify({
                    query: { uid: requid },
                    update: { $set: { 'pending': pend_pay } },
                    new: true
                }, function (err, doc, lastErrorObject) {
                    res.json(doc);
                })

                
            });

        } else {
            res.status(403);
            res.json({
                "status": "error",
                "description": sts.desc
            });
        }
    })
});


router.put("/updatetrans/:requid", function (req, res, next) {
    var param = req.body;
    var requid = req.params.requid;
    var token = req.get("auth");
    comfun.checkToken(requid, token, function (resp) {
        if (resp.sts) {
            var db = mongojs(comfun.getDBConString(), ['ssrahul96']);
            db.ssrahul96.find({
                "uid": {
                    $eq: requid
                }
            }, function (err, ssrahul96) {
                if (err) {
                    res.send(err);
                }
                var pend_pay = [];
                for (var count in ssrahul96[0]['pending']) {
                    if (ssrahul96[0]['pending'][count]['description'] === param.description && ssrahul96[0]['pending'][count]['timestamp'] === param.timestamp && ssrahul96[0]['pending'][count]['amount'] === param.amount) {
                        ssrahul96[0]['pending'][count]['paid']=true;
                        pend_pay.push(ssrahul96[0]['pending'][count]);
                    }else{
                        pend_pay.push(ssrahul96[0]['pending'][count]);
                    }
                }
                db.ssrahul96.findAndModify({
                    query: { uid: requid },
                    update: { $set: { 'pending': pend_pay } },
                    new: true
                }, function (err, doc, lastErrorObject) {
                    res.json(doc);
                })

                
            });

        } else {
            res.status(403);
            res.json({
                "status": "error",
                "description": sts.desc
            });
        }
    })
});


module.exports = router;