var express = require('express');
var router = express.Router();


router.get('/pay',function(req,res,next){
    res.send('Tasks');
});

module.exports = router;


