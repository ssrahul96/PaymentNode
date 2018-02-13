var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var comfun = require('./commonfunctions');


//all users
router.get('/users',function(req,res,next){
    var token = req.get("AuthToken");
    if(token != comfun.getAuthToken()){
        res.status(403);
        res.json({
            "error": "Unauthorised"
        });
    }else{
        var db = mongojs(comfun.getDBConString(),['users']);
        db.users.find(function(err,users){
            console.log(db);
            if(err){
                res.send(err);
            }
            res.json(users);
        });
    }
});


//all paydetails
router.get('/paydetails',function(req,res,next){
    var token = req.get("auth");
    if(token != 123456){
        res.status(403);
        res.json({
            "error": "Unauthorised"
        });
    }else{
        var db = mongojs(comfun.getDBConString(),['paydetails']);
        db.paydetails.find(function(err,paydetails){
            console.log(db);
            if(err){
                res.send(err);
            }
            res.json(paydetails);
        });
    }
});

//pay details by trans
router.get('/paydetail/:name/:mode', function(req, res, next){
    var token = req.get("auth");
    if(token != 123456){
        res.status(403);
        res.json({
            "error": "Unauthorised"
        });
    }else{
        var db = mongojs(comfun.getDBConString(),['paydetails']);
        db.paydetails.find({pname:req.params.name,ptype:req.params.mode}, function(err, paydetail){
            if(err){
                res.send(err);
            }
            res.json(paydetail);
        });
    }
});

//pay details without trans
router.get('/paydetail/:name', function(req, res, next){
    var token = req.get("auth");
    if(token != 123456){
        res.status(403);
        res.json({
            "error": "Unauthorised"
        });
    }else{
        var db = mongojs(comfun.getDBConString(),['paydetails']);
        db.paydetails.find({pname:req.params.name}, function(err, paydetail){
            if(err){
                res.send(err);
            }
            res.json(paydetail);
        });
    }
});


//invidual pending
router.get('/getpaydetail/:name', function(req, res, next){
    var token = req.get("auth");
    if(token != 123456){
        res.status(403);
        res.json({
            "error": "Unauthorised"
        });
    }else{
        var db = mongojs(comfun.getDBConString(),['paydetails']);
        db.paydetails.find({pname:req.params.name}, function(err, paydetail){
            if(err){
                res.send(err);
            }
            var final_amount=0;
            for(var detail of paydetail){
                if(detail.ptype === 'cr'){
                    final_amount = parseInt(final_amount) + parseInt(detail.pamount);
                }else{
                    final_amount = parseInt(final_amount) - parseInt(detail.pamount);
                }
            }
            console.log(final_amount);
            res.json({"pname":req.params.name,"amount" : final_amount});
        });
    }
});

//Save Task
router.post('/paysave', function(req, res, next){
    var paydet = (req.body);
    var token = req.get("auth")
    if(token != 123456){
        res.status(403);
        res.json({
            "error": "Unauthorised"
        });
    }
    if(paydet.pname === "" || paydet.ptype === "" || paydet.pdesc === "" || paydet.pdate === "" || paydet.pamount === ""){
        res.status(400);
        res.json({
            "error": "Bad Data"
        });
    }else{
        var db = mongojs(comfun.getDBConString(),['paydetails']);
        db.paydetails.save(paydet, function(err, paysave){
            if(err){
                res.json({
                    "error": err
                });
            }else{
                res.json({
                    "status": "saved succesfully"
                });
            }
        });
    }
});

module.exports = router;


