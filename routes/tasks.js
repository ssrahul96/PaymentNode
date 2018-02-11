var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://ssrahul96:hornet160@ds127888.mlab.com:27888/payment', ['details'])


router.get('/pay',function(req,res,next){
    db.tasks.find(function(err,pay){
        console.log(db);
        if(err){
            console.log(err);
            return next(err)
        }
        res.json(pay);
    });
});

module.exports = router;


