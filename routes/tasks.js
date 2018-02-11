var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://ssrahul96:hornet160@ds127888.mlab.com:27888/payment',['paydetails']);

//all paydetails
router.get('/paydetails',function(req,res,next){
    db.paydetails.find(function(err,paydetails){
        console.log(db);
        if(err){
            res.send(err);
        }
        res.json(paydetails);
    });
});

//pay details
router.get('/paydetail/:name/:mode', function(req, res, next){
    db.paydetails.find({pname:req.params.name,ptype:req.params.mode}, function(err, paydetail){
        if(err){
            res.send(err);
        }
        res.json(paydetail);
    });
});


module.exports = router;


