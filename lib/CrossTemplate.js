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

var parse = require('microtemplate').parse;
var util = require('xutil');

function CrossTemplate(options) {
  var opt = {
    language: 'javascript',
    template: ''
  };
  util.merge(opt, options);
  util.merge(this, opt);
  this.init();
}

function _parse() {
  return parse(this.template);
}

function _load() {
  return require('./language/' + this.language + '.tpl');
}

function _build(tree) {
  var template = _load.call(this);
  return new template(tree).compile();
}

var proto = CrossTemplate.prototype;

proto.init = function() {
  var tree = _parse.call(this);
  this.result = _build.call(this, tree);
}

proto.getResult = function() {
  return this.result;
}

module.exports = CrossTemplate;
