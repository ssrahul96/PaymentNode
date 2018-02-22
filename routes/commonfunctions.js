var crypto = require('crypto');
var express = require('express');
var mongojs = require('mongojs');

var key = process.env.AES_KEY || 'B374A26A71490437AA024E4FADD5B848';
var iv = process.env.AED_IV || '7E892875A52C34A3';
var dbPass = process.env.DB_PASS || 'hornet160'
var authtoken = process.env.AUTH_TOKEN || 'ssrahul961234567'

module.exports = {
  checkAuthToken: function (tok) {
    var dec = this.decrypt(tok);
    console.log('dec : ' + dec);
    var ts = dec.substring(6, dec.length);
    console.log('ts : ' + ts);
    var current_ts = Math.floor(Date.now() / 1000);
    console.log(parseInt(current_ts) - parseInt(ts));
    if ((parseInt(current_ts) - parseInt(ts)) < 1000) {
      return true;
    } else {
      return false;
    }
  },
  encrypt: function (pt) {
    try {
      var cipher = crypto.createCipher('aes-256-cbc', key);
      var crypted = cipher.update(pt, 'utf-8', 'hex');
      crypted += cipher.final('hex');
      return crypted;
    } catch (ex) {
      //cosnole.log(ex);
      return "";
    }
  },
  decrypt: function (et) {
    try {
      var decipher = crypto.createDecipher('aes-256-cbc', key);
      var decrypted = decipher.update(et, 'hex', 'utf-8');
      decrypted += decipher.final('utf-8');
      return decrypted;
    } catch (ex) {
      //console.log(ex);
      return "";
    }
  },
  getMD5: function (pt) {
    return crypto.createHash('md5').update(pt).digest("hex").toUpperCase();
  },
  getDBConString: function () {
    return 'mongodb://ssrahul96:' + dbPass + '@ds127888.mlab.com:27888/payment';
  },
  checkToken: function (uid, tok, callback) {
    var db = mongojs(this.getDBConString(), ['ssrahul96']);
    var id = this.decrypt(tok);
    var callBackString = {};
    if(id===""){
      callBackString.sts=false;
      callBackString.desc='Invalid Token';
      callback(callBackString);
    }
    db.ssrahul96.findOne({
      uid: uid,
      _id: mongojs.ObjectId(id)
    }, {
      uname: 1,
      uid: 1,
      mobile: 1,
      email: 1,
      _id: 1
    }, function (err, user) {
      if (err) {
        callBackString.sts=false;
        callBackString.desc='Database error';
        callback(callBackString);
      }
      if (user !== null) {
        console.log(user.uname.toString());
        callBackString.sts=true;
        callBackString.desc='success';
        callback(callBackString);
      } else {
        callBackString.sts=false;
        callBackString.desc='user not found';
        callback(callBackString);
      }
    });
  }
};