'use strict';

var emptyObject = Object.freeze({});

function isUndef(v) {
  return v === undefined || v === null
}

function isDef(v) {
  return v !== undefined && v !== null
}

function isTrue(v) {
  return v === true
}

function isFalse(v) {
  return v === false
}

function isPrimitive(value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

function isObject(obj) {
  return obj !== null && typeof obj === 'object'
}

var _toString = Object.prototype.toString

function toRawType(value) {
  return _toString.call(value).slice(8, -1)
}

function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

function isVaildArrayIndex (val) {
  var n = parseFloat(String(val))
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val)
      && typeof val.then === 'function'
      && typeof val.catch === 'function'
  )
}

function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      :String(val)
}

function toNumber (val) {
  var n = parseFloat(val)
  return isNaN(n) ? val : n
}

function makeMap (str, expectsLowerCase) {
  var map = Object.create(null)
  var list = str.split(',')
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()] }
    : function (val) { return map[val] }

}

var isBuiltInTag = makeMap('slot, component', true)

var isReserved = makeMap('key,ref,slot,slot-scope,is')

// 为什么需要return
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item)
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

var hasOweProperty = Object.prototype.hasOwnProperty
function hasOwn (obj, key) {
  return hasOweProperty.call(obj, key)
}

// 为什么需要缓存函数结果值
function cached (fn) {
  var cache = Object.create(null)
  return (
    function cachedFn (str) {
      var hit = cache[str]
      return hit || (cache[str] = fn(str))
    }
  )
}

  