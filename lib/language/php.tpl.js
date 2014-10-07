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
  OPEN: '<?php',
  CLOSE: '?>',
  BLANK: ' ',
  $: '$'
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
  while (deep > 1) {
    content += TAGS.BLANK;
    content += TAGS.BLANK;
    deep --;
  }
  return content;
}

function _parseLogic(code) {
  var content;
  if (IfStatementReg.test(code)) {
    this.deep ++;
    content = 'if (' + TAGS.$ + _.trim(_.trim(code).split('if')[1]) + ') {';
  } else if (ElseIfStatementReg.test(code)) {
    content = '} elseif (' + TAGS.$ + _.trim(_.trim(code).split('elseif')[1]) + ') {';
  } else if (ElseStatementReg.test(code)) {
    content = '} else {';
  } else if (EachStatementReg.test(code)) {
    this.deep ++;
    var temp = _.trim(code).split(' ');
    var $item = TAGS.$ + temp[3];
    var $val = TAGS.$ + temp[1].split(',')[0];
    var $index = TAGS.$ + temp[1].split(',')[1];
    content = 'foreach (' + $item + ' as ' + $val;

    if ($index) content += ' => ' + $index;
    content += ') {';
  } else if (LiteralsStatementReg.test(code)) {
    content = 'echo ' + TAGS.$ + _.trim(code).split('=')[1] + ';';
  } else if (StopStatementReg.test(code)) {
  } else if (CommentStatementReg.test(code)) {
    content = '//' + _.trim(code).split('#')[1];
  } else if (IfAndEachEndStatementReg.test(code)) {
    this.deep --;
    content = '}';
  } else {
    throw new Error('syntax error' + code);
  }
  content = content ? TAGS.OPEN + _codeDeepIndex(this.deep) + content + TAGS.BLANK + TAGS.CLOSE : '';
  return content;
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

function Php(code) {
  this.code = code;
  this.init();
}

var proto = Php.prototype;

proto.init = function() {
  this.compile();
}

proto.compile = function() {
  return _compile.call(this);
}

module.exports = Php;
