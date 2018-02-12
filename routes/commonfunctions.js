var md5 = require('md5');
var express = require('express');

module.exports = {
    add: function (a,b) {
      return parseInt(a)+b;
    },
    bar: function (a,b) {
      return a*b;
    },
    getauthkey : function(name){
      return md5(name).toUpperCase();
    }
  };