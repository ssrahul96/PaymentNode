var md5 = require('md5');
var express = require('express');
var aesjs = require('aes-js');

var key = process.env.AES_KEY || 'B374A26A71490437AA024E4FADD5B848';
var iv = process.env.AED_IV || '7E892875A52C34A3';
var dbPass = process.env.DB_PASS || 'hornet160'
var authtoken = process.env.AUTH_TOKEN || 'ssrahul961234567'
module.exports = {
    getAuthToken : function(){
      return this.encrypt(authtoken);
    },
    encrypt : function(pt){
      var textBytes = aesjs.utils.utf8.toBytes(pt);
      var aesCbc = new aesjs.ModeOfOperation.cbc(new Buffer(key), new Buffer(iv));
      return aesjs.utils.hex.fromBytes(aesCbc.encrypt(textBytes));
    },
    decrypt : function(et){
      var encryptedBytes = aesjs.utils.hex.toBytes(et);
      var aesCbc = new aesjs.ModeOfOperation.cbc(new Buffer(key), new Buffer(iv));
      return  aesjs.utils.utf8.fromBytes(aesCbc.decrypt(encryptedBytes));
    } ,
    getDBConString : function(){
      return 'mongodb://ssrahul96:'+dbPass+'@ds127888.mlab.com:27888/payment';
    }
  };