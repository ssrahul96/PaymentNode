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
    var db = mongojs(comfun.getDBConString(), ['ssrahul96']);
    db.ssrahul96.findOne({
        uid: userdet.uid
    }, {
        uid: 1,
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
                "description": userdet.uid + " already exists"
            });
        }
    });
});

router.post('/signin',function(req,res,next){
    var userdet = req.body;
    var db = mongojs(comfun.getDBConString(), ['ssrahul96']);
    db.ssrahul96.findOne({
        uid: userdet.uid,
        password: userdet.password
    }, {
        uname: 1,
        uid:1,
        mobile:1,
        email:1,
        _id: 1
    }, function (err, user) {
        if (err) {
            res.json({
                "status": "error",
                "description": err
            });
        }
        if (user !== null) {
            res.json({
                "status": "success",
                "authey" : comfun.encrypt(user._id.toString()),
                "details" : user                
            })
        } else {
            res.json({
                "status": "failed",
                "description": "username or password mismatch"
            });
        }
    });
});


module.exports = router;