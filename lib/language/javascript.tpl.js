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
  OUT: '$out += ',
  BLANK: ' ',
  WRAP: '\n'
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
  var content = TAGS.BLANK;
  while (deep > 0) {
    content += TAGS.BLANK;
    content += TAGS.BLANK;
    deep --;
  }
  return content;
}

function _parseLogic(code) {
  var content;
  var increseIndex;

  if (IfStatementReg.test(code)) {
    this.deep ++;
    content = 'if (' + _.trim(_.trim(code).split('if')[1]) + ') {';
  } else if (ElseIfStatementReg.test(code)) {
    content = '} else if (' + _.trim(_.trim(code).split('elseif')[1]) + ') {';
  } else if (ElseStatementReg.test(code)) {
    content = '} else {';
  } else if (EachStatementReg.test(code)) {
    this.deep ++;
    var temp = _.trim(code).split(' ');
    var $item = temp[3];
    var $val = temp[1].split(',')[0];
    var $index = temp[1].split(',')[1];
    content = 'for (var ' + $index + ' in ' + $item + ') {';
    content += TAGS.WRAP + _codeDeepIndex(this.deep + 1) + 'var ' + $val + ' = ' + $item + '[' + $index + ']' + ';';
  } else if (LiteralsStatementReg.test(code)) {
    increseIndex = true;
    content = TAGS.OUT + _.trim(_.trim(code).split('=')[1]) + ';';
  } else if (StopStatementReg.test(code)) {
  } else if (CommentStatementReg.test(code)) {
    increseIndex = true;
    content = '//' + _.trim(_.trim(code).split('#')[1]);
  } else if (IfAndEachEndStatementReg.test(code)) {
    increseIndex = true;
    this.deep --;
    content = '}';
  } else {
    throw new Error('syntax error' + code);
  }
  return content ? _codeDeepIndex(this.deep + (increseIndex ? 1 : 0)) + content + TAGS.WRAP : '';
}

function _parseStatic(code) {
  return _codeDeepIndex(this.deep + 1) + TAGS.OUT + '\'' + _.filter(code) + '\';' + TAGS.WRAP;
}

function _build(code) {
  code += _codeDeepIndex(1) + 'return $out;';
  return new Function('$data', _codeDeepIndex(0) + 'with ($data) {' + TAGS.WRAP + code + TAGS.WRAP + _codeDeepIndex(0) + '}');
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
  return _build(content);
}

function JavaScript(code) {
  this.code = code;
}

var proto = JavaScript.prototype;

proto.compile = function() {
  return _compile.call(this);
}

module.exports = JavaScript;
