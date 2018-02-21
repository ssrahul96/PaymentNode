var md5 = require('md5');
var express = require('express');
var aesjs = require('aes-js');

var key = process.env.AES_KEY || 'B374A26A71490437AA024E4FADD5B848';
var iv = process.env.AED_IV || '7E892875A52C34A3';
var dbPass = process.env.DB_PASS || 'hornet160'
var authtoken = process.env.AUTH_TOKEN || 'ssrahul961234567'

module.exports = {
  checkAuthToken: function (tok) {
    var dec = this.decrypt(tok);
    console.log('dec : '+dec);
    var ts = dec.substring(6,dec.length);
    console.log('ts : '+ts);
    var current_ts = Math.floor(Date.now() / 1000);
    console.log(parseInt(current_ts) - parseInt(ts));
    if((parseInt(current_ts) - parseInt(ts)) < 1000){
      return true;
    }else{
      return false;
    }

  },
  encrypt: function (pt) {
    var textBytes = aesjs.utils.utf8.toBytes(pt);
    var aesCbc = new aesjs.ModeOfOperation.cbc(new Buffer(key), new Buffer(iv));
    return aesjs.utils.hex.fromBytes(aesCbc.encrypt(textBytes));
  },
  decrypt: function (et) {
    var encryptedBytes = aesjs.utils.hex.toBytes(et);
    var aesCbc = new aesjs.ModeOfOperation.cbc(new Buffer(key), new Buffer(iv));
    return aesjs.utils.utf8.fromBytes(aesCbc.decrypt(encryptedBytes));
  },
  getMD5 : function(pt) {
    return md5(pt).toUpperCase();
  },
  getDBConString : function () {
    return 'mongodb://ssrahul96:' + dbPass + '@ds127888.mlab.com:27888/payment';
  }
};