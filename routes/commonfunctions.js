var crypto = require('crypto');
var express = require('express');

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
    var cipher = crypto.createCipher('aes-256-cbc', key);
    var crypted = cipher.update(pt, 'utf-8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
  },
  decrypt: function (et) {
    var decipher = crypto.createDecipher('aes-256-cbc', key);
    var decrypted = decipher.update(et, 'hex', 'utf-8');
    decrypted += decipher.final('utf-8');
    return decrypted;
  },
  getMD5: function (pt) {
    return crypto.createHash('md5').update(pt).digest("hex").toUpperCase();
  },
  getDBConString: function () {
    return 'mongodb://ssrahul96:' + dbPass + '@ds127888.mlab.com:27888/payment';
  }
};