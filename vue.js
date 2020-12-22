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

function cached (fn) {
  var cache = Object.create(null)
  return (
    function cachedFn (str) {
      var hit = cache[str]
      return hit || (cache[str] = fn(str))
    }
  )
}

var camelizeRE = /-(\w)/g
var camlize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : '' })
})

var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
})

var hyphenateRE = /\B([A-Z])/g
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
})

function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }
  boundFn._length = fn.length
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0
  var i = list.length - start
  var ret = new Array(i)
  while (i--) {
    ret[i] = list[i + start]
  }
  return ret
}

/**
 * Mix properties into target object
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key]
  }
  return to
}

/**
 * Merge an Array of Objects to a single Object.
 */
function toObject (arr) {
  var res = {}
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i])
    }
  }
  return res
}

function noop (a, b, c) { }

/**
 * Always return false
 */
function no (a, b, c) { return false }

/**
 * Return the same value.
 */
 function identity (_) { return _ }

 /**
  * Generate a string containing static keys from compiler modules.
  */
function genStaticKeys (modules) {
  return modules.reduce(function (keys, m) {
    return keys.concat(m.staticKeys || [])
  }, []).join(',')
}

/**
 * Check if two values are loosely equal.
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a)
  var isObjectB = isObject(b)
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a)
      var isArrayB = Array.isArray(b)
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a)
        var keysB = Object.keys(b)
        return keysA.length === keysB.length && keysA.every(function(key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        return false
      }
    } catch (error) {
      return false
    }
  } else if (!isObject && !isObjectB) {
    return String(a) == String(b)
  } else {
    return false
  }
}

function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}


console.log(111)