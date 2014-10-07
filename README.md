CrossTemplate
===

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![node version][node-image]][node-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/CrossTemplate.svg?style=flat-square
[npm-url]: https://npmjs.org/package/CrossTemplate
[travis-image]: https://img.shields.io/travis/xudafeng/CrossTemplate.svg?style=flat-square
[travis-url]: https://travis-ci.org/xudafeng/CrossTemplate
[coveralls-image]: https://img.shields.io/coveralls/xudafeng/CrossTemplate.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/xudafeng/CrossTemplate?branch=master
[node-image]: https://img.shields.io/badge/node.js-%3E=_0.10-green.svg?style=flat-square
[node-url]: http://nodejs.org/download/
[download-image]: https://img.shields.io/npm/dm/CrossTemplate.svg?style=flat-square
[download-url]: https://npmjs.org/package/CrossTemplate

> CrossTemplate

## Installment

```bash
$ npm i CrossTemplate -g
```

## Syntax

### Set

```
<#set#>
```

### Literals

```
<#=$header#>
```

### If / ElseIf / Else

```
<#if first#>
this is first
<#elseif second#>
this is second
<#else#>
this is else
<#/if#>
```

### Foreach Loop

```
<#each val,index in items#> 
  <#$val#>
<#/each#>
```

### include

```
<#include 'tpl', data#>
```

### stop

```
<#stop#>
```

### comment

```
<##content#>
```

## License

The MIT License (MIT)

Copyright (c) 2013 xdf

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
