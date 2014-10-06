/* ================================================================
 * CrossTemplate by xdf(xudafeng[at]126.com)
 *
 * first created at : Sat Oct 04 2014 13:17:51 GMT+0800 (CST)
 *
 * ================================================================
 * Copyright 2014 xdf
 *
 * Licensed under the MIT License
 * You may not use this file except in compliance with the License.
 *
 * ================================================================ */

'use strict';

function _php(code) {

}

function Php(code) {
  this.code = code;
  this.init();
}

var proto = Php.prototype;

proto.init = function() {
  this.scanner();
}

proto.scanner = function() {
  this.code.forEach(function(i) {
    console.log(i)
  });
}

module.exports = Php;
