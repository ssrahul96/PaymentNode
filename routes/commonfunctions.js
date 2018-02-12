var md5 = require('md5');
var express = require('express');
var aesjs = require('aes-js');

var key1 = process.env.AES_KEY ;
var iv1 = process.env.AED_IV ;
var key =  new Buffer(key1);
var iv= new Buffer(iv1);
module.exports = {
    add: function (a,b) {
      return parseInt(a)+b;
    },
    bar: function (a,b) {
      return a*b;
    },
    getauthkey : function(name){
      return md5(name).toUpperCase();
    },
    encrypt : function(pt){
      var textBytes = aesjs.utils.utf8.toBytes(pt);
      var aesCbc = new aesjs.ModeOfOperation.cbc(key, iv);
      return aesjs.utils.hex.fromBytes(aesCbc.encrypt(textBytes));
    },
    decrypt : function(et){
      var encryptedBytes = aesjs.utils.hex.toBytes(et);
      var aesCbc = new aesjs.ModeOfOperation.cbc(key, iv);
      var decryptedBytes = aesCbc.decrypt(encryptedBytes);
      return  aesjs.utils.utf8.fromBytes(decryptedBytes);
    } 
  };