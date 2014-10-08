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

var _ = require('microtemplate')._;
var TAGS = {
  BLANK: ' ',
  WRAP: '\n',
  $: '$!'
};

var IfStatementReg = /(?:^|\n)if\s+\S+/,
    ElseStatementReg = /(?:^|\n)else\s*/,
    ElseIfStatementReg = /(?:^|\n)elseif\s+\S+.*/,
    EachStatementReg = /(?:^|\n)each\s+\S+\s+in\s+\S+/,
    LiteralsStatementReg = /\=\s*\w+([\.]\w+)*\s*/,
    StopStatementReg = /\s*stop\s*/,
    CommentStatementReg = /(?:^|\n)#[^\n]*/,
    IfAndEachEndStatementReg = /(?:^|\n)\/(each|if)\s*/,
    StatementReg = /\$[\w\d]+/g;

function _codeDeepIndex(deep) {
  var content = '';
  while (deep > 1) {
    content += TAGS.BLANK;
    content += TAGS.BLANK;
    deep --;
  }
  return content;
}

function _parseLogic(code) {
  var content;
  var creaseIndex;

  if (IfStatementReg.test(code)) {
    this.deep ++;
    content = '#if (' + TAGS.$ + _.trim(_.trim(code).split('if')[1]) + ')';
  } else if (ElseIfStatementReg.test(code)) {
    content = '#elseif (' + TAGS.$ + _.trim(_.trim(code).split('elseif')[1]) + ')';
  } else if (ElseStatementReg.test(code)) {
    content = '#else';
  } else if (EachStatementReg.test(code)) {
    this.deep ++;
    var temp = _.trim(code).split(' ');
    var $item = TAGS.$ + temp[3];
    var $val = TAGS.$ + temp[1].split(',')[0];
    var $index = TAGS.$ + temp[1].split(',')[1];
    content = '#foreach (' + $val + ' in ' + $item + ')';
    if ($index) {
      content += TAGS.WRAP + _codeDeepIndex(this.deep) + '#set (' + $index + ' = $!velocityCount - 1)';
    }
  } else if (LiteralsStatementReg.test(code)) {
    content = TAGS.$ + '{' + _.trim(code).split('=')[1] + '}';
  } else if (StopStatementReg.test(code)) {
  } else if (CommentStatementReg.test(code)) {
    content = '##' + _.trim(code).split('#')[1];
  } else if (IfAndEachEndStatementReg.test(code)) {
    this.deep --;
    creaseIndex = true;
    content = '#end';
  } else {
    throw new Error('syntax error' + code);
  }
  return content ? _codeDeepIndex(this.deep + (creaseIndex ? 1 : 0)) + content : '';
}

function _parseStatic(code) {
  return code;
}

function _compile() {
  var that = this;
  var content = '';
  this.deep = 0;
  this.code.forEach(function(i) {
    var l = i.logic;
    var s = i.static;
    if (l) content += _parseLogic.call(that, l);
    if (s) content += _parseStatic.call(that, s);
  });
  return content;
}

function Velocity(code) {
  this.code = code;
  this.init();
}

var proto = Velocity.prototype;

proto.init = function() {
  this.compile();
}

proto.compile = function() {
  return _compile.call(this);
}

module.exports = Velocity;
