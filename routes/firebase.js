var express = require('express');
var router = express.Router();
var comfun = require('./commonfunctions');
var fs = require('fs');
var admin = require('firebase-admin');
const functions = require('firebase-functions');
var serviceAccount = require("./frndspayment-firebase-adminsdk-ncg46-f05a79fd0d.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://frndspayment.firebaseio.com"
});

router.get('/', function (req, res, next) {
    res.json({
        "status": "success",
        "message": "It works"
    })
});

router.post('/signup', function (req, res, next) {
    var userdet = (req.body);
    var db = admin.firestore();
    var docRef = db.collection('users').doc(userdet.uid);
    var setAda = docRef.set({
        userdet
    }).then(() => {
        res.statusCode=200;
        res.json({
            "status": "success",
            "message": "saved succesfully"
        })
    }).catch((err) => {
        res.statusCode=500;
        res.json({
            "status": "failure",
            "message": err
        })
    });

});

module.exports = router;