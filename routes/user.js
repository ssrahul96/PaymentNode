var express = require('express');
var router = express.Router();
var comfun = require('./commonfunctions');
var mongojs = require('mongojs');

router.get('/', function (req, res, next) {
    res.json({
        "status": "success",
        "message": "It works"
    })
});

router.post('/signup', function (req, res, next) {
    var userdet = (req.body);
    //console.log(userdet);
    var token = req.get("auth")
    if (token != 123456) {
        res.status(403);
        res.json({
            "error": "Unauthorised"
        });
    }
    var db = mongojs(comfun.getDBConString(), ['ssrahul96']);
    db.ssrahul96.findOne({
        uname: userdet.uname
    }, {
        uname: 1,
        _id: 0
    }, function (err, user) {
        if (err) {
            res.json({
                "status": "error",
                "description": err
            });
        }
        console.log(user);
        if (user === null) {
            db.ssrahul96.save(userdet, function (err, signup) {
                if (err) {
                    res.json({
                        "status": "error",
                        "description": err
                    });
                } else {
                    res.json({
                        "status": "success",
                        "description": "saved succesfully"
                    });
                }
            });
        } else {
            res.json({
                "status": "failed",
                "description": userdet.uname + " already exists"
            });
        }
    });
});


module.exports = router;