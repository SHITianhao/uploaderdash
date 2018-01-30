/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 14);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(6);
var isBuffer = __webpack_require__(18);

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim
};


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = React;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(17);

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(0);
var normalizeHeaderName = __webpack_require__(21);

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(7);
  } else if (typeof process !== 'undefined') {
    // For node use HTTP adapter
    adapter = __webpack_require__(7);
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(20)))

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getFileSize = exports.convertToTrees = exports.readChunks = exports.getFileTotalChunk = exports.getFileMD5 = undefined;

var _Constants = __webpack_require__(37);

var _sparkMd = __webpack_require__(38);

var _sparkMd2 = _interopRequireDefault(_sparkMd);

var _TreeNode = __webpack_require__(11);

var _TreeNode2 = _interopRequireDefault(_TreeNode);

var _FileNode = __webpack_require__(5);

var _FileNode2 = _interopRequireDefault(_FileNode);

var _FolderNode = __webpack_require__(39);

var _FolderNode2 = _interopRequireDefault(_FolderNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice;

var getFileMD5 = exports.getFileMD5 = function getFileMD5(file) {
    var spark = new _sparkMd2.default();
    spark.append(file.lastModified);
    spark.append(file.name);
    spark.append(file.size);
    spark.append(file.type);
    return spark.end();
};

var getFileTotalChunk = exports.getFileTotalChunk = function getFileTotalChunk(file) {
    return Math.ceil(file.size / _Constants.FILE_CHUNK_SIZE);
};

var readChunk = function readChunk(fileReader, file, chunkIndex, chunkSize) {
    var fileSize = file.size;
    var start = chunkIndex * chunkSize;
    var end = start + chunkSize > fileSize ? fileSize : start + chunkSize;
    var chunk = blobSlice.call(file, start, end);
    fileReader.readAsArrayBuffer(chunk);
    return chunk;
};

var readChunks = exports.readChunks = function readChunks(file, onChunkLoaded) {
    var totalChunk = getFileTotalChunk(file);

    var loadedChunk = null;
    var loadChunkIndex = 0;
    var allChunkLoaded = totalChunk == 0;
    var fileReader = new FileReader();
    return new Promise(function (resolve, reject) {
        var readNextChunk = function readNextChunk() {
            if (!allChunkLoaded) {
                loadedChunk = readChunk(fileReader, file, loadChunkIndex, _Constants.FILE_CHUNK_SIZE);
            } else {
                resolve();
            }
        };
        fileReader.onload = function (event) {
            // calculat chunk MD5
            console.log('file onload');
            loadChunkIndex++;
            allChunkLoaded = loadChunkIndex >= totalChunk;
            var buffer = event.target.result;
            var spark = new _sparkMd2.default.ArrayBuffer();
            spark.append(buffer);
            var md5 = spark.end();

            onChunkLoaded({
                data: loadedChunk,
                index: loadChunkIndex,
                md5: md5
            });
            readNextChunk();
        };

        readNextChunk();
    });
};

var convertToTrees = exports.convertToTrees = function convertToTrees(files) {
    var dump = new _TreeNode2.default('root');

    for (var i = 0; i < files.length; i++) {
        var file = files[i];
        var path = file.webkitRelativePath;
        var pathList = path.split('/');
        var parentNode = dump;
        var nodeName = pathList.shift();
        if (nodeName == '') nodeName = file.name;
        while (nodeName != undefined) {
            var nextNode = pathList.shift();
            if (nextNode == undefined) {
                var fileNode = new _FileNode2.default(file);
                parentNode.addChild(nodeName, fileNode);
            } else {
                if (parentNode.hasChild(nodeName)) {
                    parentNode = parentNode.getChild(nodeName);
                } else {
                    var folderNode = new _FolderNode2.default(nodeName);
                    parentNode.addChild(nodeName, folderNode);
                    parentNode = folderNode;
                }
            }
            nodeName = nextNode;
        }
    }
    return dump;
};

var getFileSize = exports.getFileSize = function getFileSize(file) {
    var bytes = file.size;
    var thresh = 1024;
    if (Math.abs(bytes) < thresh) {
        return bytes + ' B';
    }
    var units = ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    var u = -1;
    do {
        bytes /= thresh;
        ++u;
    } while (Math.abs(bytes) >= thresh && u < units.length - 1);
    return bytes.toFixed(1) + ' ' + units[u];
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _IFileNode2 = __webpack_require__(12);

var _IFileNode3 = _interopRequireDefault(_IFileNode2);

var _axios = __webpack_require__(2);

var _axios2 = _interopRequireDefault(_axios);

var _Files = __webpack_require__(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FileNode = function (_IFileNode) {
    _inherits(FileNode, _IFileNode);

    function FileNode(file) {
        _classCallCheck(this, FileNode);

        var _this = _possibleConstructorReturn(this, (FileNode.__proto__ || Object.getPrototypeOf(FileNode)).call(this, file.name));

        _this.sendFileInitRequest = function (url) {
            return _axios2.default.post(url, { files: [_this.fileInfo] }).then(function (resp) {
                var data = resp.data[0];
                var id = data.id;

                _this.fileId = id;
                _this.inited = true;
                // all sub files inited
                if (typeof _this._onUpdate === 'function') _this._onUpdate(_this);
                return _this;
            });
        };

        _this.sendChunks = function (baseUrl) {
            var fileMD5 = (0, _Files.getFileMD5)(_this.file);
            var chunkUrl = baseUrl + '/chunks';
            var mergeUrl = baseUrl + '/merge';
            return (0, _Files.readChunks)(_this.file, function (_ref, allChunkLoaded) {
                var data = _ref.data,
                    index = _ref.index,
                    md5 = _ref.md5;

                var form = new FormData();
                form.append('data', data);
                form.append('fileId', _this.fileId);
                form.append('fileMD5', fileMD5);
                form.append('chunkIndex', index);
                form.append('chunkMD5', md5);
                _axios2.default.post('' + chunkUrl, form, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then(function (resp) {
                    _this.uploadedChunks++;
                    if (typeof _this._onUpdate === 'function') _this._onUpdate(_this);
                    console.log(resp.data);
                });
            }).then(function () {
                console.log(_this.name + ' chunks uploading done');
                _this.uploaded = true;
                if (typeof _this._onUpdate === 'function') _this._onUpdate(_this);
                var mergeData = {
                    fileId: _this.fileId
                };
                return _axios2.default.post('' + mergeUrl, mergeData);
            }).then(function (resp) {
                console.log(resp.data);
                _this.merged = true;
                if (typeof _this._onUpdate === 'function') _this._onUpdate(_this);
            });
        };

        _this.file = file;
        _this.fileId = null;
        _this.uploadedChunks = 0;
        return _this;
    }

    _createClass(FileNode, [{
        key: 'fileInfo',
        get: function get() {
            return {
                "filename": this.file.name,
                "md5": (0, _Files.getFileMD5)(this.file),
                "totalChunk": (0, _Files.getFileTotalChunk)(this.file),
                "relativePath": this.file.webkitRelativePath,
                "fileSize": this.file.size
            };
        }
    }, {
        key: 'totalChunk',
        get: function get() {
            return (0, _Files.getFileTotalChunk)(this.file);
        }
    }, {
        key: 'uploadingPercentage',
        get: function get() {
            return (this.uploadedChunks / this.totalChunk * 100).toFixed(1);
        }
    }]);

    return FileNode;
}(_IFileNode3.default);

exports.default = FileNode;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);
var settle = __webpack_require__(22);
var buildURL = __webpack_require__(24);
var parseHeaders = __webpack_require__(25);
var isURLSameOrigin = __webpack_require__(26);
var createError = __webpack_require__(8);
var btoa = (typeof window !== 'undefined' && window.btoa && window.btoa.bind(window)) || __webpack_require__(27);

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();
    var loadEvent = 'onreadystatechange';
    var xDomain = false;

    // For IE 8/9 CORS support
    // Only supports POST and GET calls and doesn't returns the response headers.
    // DON'T do this for testing b/c XMLHttpRequest is mocked, not XDomainRequest.
    if ("development" !== 'test' &&
        typeof window !== 'undefined' &&
        window.XDomainRequest && !('withCredentials' in request) &&
        !isURLSameOrigin(config.url)) {
      request = new window.XDomainRequest();
      loadEvent = 'onload';
      xDomain = true;
      request.onprogress = function handleProgress() {};
      request.ontimeout = function handleTimeout() {};
    }

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request[loadEvent] = function handleLoad() {
      if (!request || (request.readyState !== 4 && !xDomain)) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        // IE sends 1223 instead of 204 (https://github.com/axios/axios/issues/201)
        status: request.status === 1223 ? 204 : request.status,
        statusText: request.status === 1223 ? 'No Content' : request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      var cookies = __webpack_require__(28);

      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ?
          cookies.read(config.xsrfCookieName) :
          undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (config.withCredentials) {
      request.withCredentials = true;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (requestData === undefined) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__(23);

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TreeNode = function TreeNode(name) {
    _classCallCheck(this, TreeNode);

    _initialiseProps.call(this);

    this.name = name;
    this.children = {};
}

/**
 * Add Child node
 * 
 * @param string name
 * @param TreeNode node
 */
;

var _initialiseProps = function _initialiseProps() {
    var _this = this;

    this.addChild = function (name, node) {
        var newChild = {};
        // child: {name: node}
        newChild[name] = node;
        _this.children = Object.assign(_this.children, newChild);
    };

    this.removeChild = function (name) {
        delete _this.children[name];
    };

    this.hasChild = function (name) {
        return _this.children[name] !== undefined && _this.children[name] !== null;
    };

    this.getChild = function (name) {
        return _this.children[name];
    };

    this.getChildrenNum = function () {
        return Object.keys(_this.children).length;
    };

    this.isLeaf = function () {
        return Object.keys(_this.children).length === 0;
    };
};

exports.default = TreeNode;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _TreeNode2 = __webpack_require__(11);

var _TreeNode3 = _interopRequireDefault(_TreeNode2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var IFileNode = function (_TreeNode) {
    _inherits(IFileNode, _TreeNode);

    function IFileNode(name) {
        _classCallCheck(this, IFileNode);

        var _this = _possibleConstructorReturn(this, (IFileNode.__proto__ || Object.getPrototypeOf(IFileNode)).call(this, name));

        _this.isFolder = function () {
            return _this.isLeaf();
        };

        _this.filterFileNode = function (key) {
            var child = _this.children[key];
            return child.isLeaf();
        };

        _this.filterFolderNode = function (key) {
            var child = _this.children[key];
            return !child.isLeaf();
        };

        _this.setOnUpdate = function (cb) {
            if (typeof cb === 'function') _this._onUpdate = cb;
            return _this;
        };

        _this.inited = false;
        _this.uploaded = false;
        _this.merged = false;
        _this._onUpdate = null;
        return _this;
    }

    return IFileNode;
}(_TreeNode3.default);

exports.default = IFileNode;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _FileNode = __webpack_require__(41);

var _FileNode2 = _interopRequireDefault(_FileNode);

var _FolderNode = __webpack_require__(42);

var _FolderNode2 = _interopRequireDefault(_FolderNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Node = function Node(_ref) {
  var nodes = _ref.nodes,
      level = _ref.level;
  return Object.keys(nodes).map(function (key, index) {
    var node = nodes[key];
    return node.isLeaf() ? _react2.default.createElement(_FileNode2.default, { node: node, key: level + '-' + index }) : _react2.default.createElement(_FolderNode2.default, { node: node, level: level, key: level + '-' + index });
  });
};

exports.default = Node;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(15);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _App = __webpack_require__(16);

var _App2 = _interopRequireDefault(_App);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function (OC, window, $) {
  $(document).ready(function () {
    _reactDom2.default.render(_react2.default.createElement(_App2.default, { OC: OC }), document.getElementById('react-app'));
  });
})(OC, window, jQuery);

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = ReactDOM;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _UploadButton = __webpack_require__(36);

var _UploadButton2 = _interopRequireDefault(_UploadButton);

var _Tree = __webpack_require__(40);

var _Tree2 = _interopRequireDefault(_Tree);

var _Loading = __webpack_require__(66);

var _Loading2 = _interopRequireDefault(_Loading);

var _TreeNode = __webpack_require__(11);

var _TreeNode2 = _interopRequireDefault(_TreeNode);

var _Files = __webpack_require__(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_Component) {
    _inherits(App, _Component);

    function App(props) {
        _classCallCheck(this, App);

        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

        _this.updateTree = function (newNode) {
            var dumpRoot = _this.state.dumpRoot;
            dumpRoot.addChild(newNode.name, newNode);
            _this.setState({
                dumpRoot: dumpRoot
            });
        };

        _this.sendChunks = function () {
            Object.keys(_this.state.dumpRoot.children).map(function (key) {
                var root = _this.state.dumpRoot.getChild(key);
                root.setOnUpdate(_this.updateTree).sendChunks(OC.generateUrl('/apps/uploaderdash')).then(function () {
                    console.log('done');
                }).catch(function (err) {
                    console.error(err);
                });
            });
        };

        _this.sendUploadFileRequest = function () {
            Object.keys(_this.state.dumpRoot.children).map(function (key) {
                var root = _this.state.dumpRoot.getChild(key);
                root.setOnUpdate(_this.updateTree).sendFileInitRequest(OC.generateUrl('/apps/uploaderdash/files')).then(function () {
                    console.log('done');
                    _this.sendChunks();
                }).catch(function (err) {
                    console.error(err);
                });
            });
        };

        _this.onFiles = function (files) {
            _this.setState({
                loading: false
            });
            // console.log(files);
            console.log(files.length);
            var dumpRoot = (0, _Files.convertToTrees)(files);
            console.log(dumpRoot);
            _this.setState({
                dumpRoot: dumpRoot
            });
        };

        _this.onSubmitClick = function () {
            _this.sendUploadFileRequest();
        };

        _this.onUploadBtnClick = function () {
            _this.setState({
                loading: true
            });
        };

        _this.render = function () {
            return _react2.default.createElement(
                'div',
                { className: 'app-content' },
                _react2.default.createElement(
                    'div',
                    { className: 'app-row' },
                    _react2.default.createElement(_UploadButton2.default, { onFiles: _this.onFiles, onClick: _this.onUploadBtnClick }),
                    _react2.default.createElement(
                        'a',
                        { className: 'button', onClick: _this.onSubmitClick },
                        '\u53D1\u9001\u8BF7\u6C42'
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'app-row flex-container' },
                    _react2.default.createElement(_Tree2.default, { root: _this.state.dumpRoot })
                ),
                _react2.default.createElement(_Loading2.default, { text: '加载中', show: _this.state.loading })
            );
        };

        _this.state = {
            dumpRoot: new _TreeNode2.default('root'),
            loading: false
        };
        return _this;
    }

    return App;
}(_react.Component);

exports.default = App;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);
var bind = __webpack_require__(6);
var Axios = __webpack_require__(19);
var defaults = __webpack_require__(3);

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(utils.merge(defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__(10);
axios.CancelToken = __webpack_require__(34);
axios.isCancel = __webpack_require__(9);

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(35);

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;


/***/ }),
/* 18 */
/***/ (function(module, exports) {

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
module.exports = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
}

function isBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
}


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var defaults = __webpack_require__(3);
var utils = __webpack_require__(0);
var InterceptorManager = __webpack_require__(29);
var dispatchRequest = __webpack_require__(30);

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = utils.merge({
      url: arguments[0]
    }, arguments[1]);
  }

  config = utils.merge(defaults, this.defaults, { method: 'get' }, config);
  config.method = config.method.toLowerCase();

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;


/***/ }),
/* 20 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__(8);

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  // Note: status is not exposed by XDomainRequest
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }
  error.request = request;
  error.response = response;
  return error;
};


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

function encode(val) {
  return encodeURIComponent(val).
    replace(/%40/gi, '@').
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      }

      if (!utils.isArray(val)) {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
  (function standardBrowserEnv() {
    var msie = /(msie|trident)/i.test(navigator.userAgent);
    var urlParsingNode = document.createElement('a');
    var originURL;

    /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
    function resolveURL(url) {
      var href = url;

      if (msie) {
        // IE needs attribute set twice to normalize properties
        urlParsingNode.setAttribute('href', href);
        href = urlParsingNode.href;
      }

      urlParsingNode.setAttribute('href', href);

      // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
      return {
        href: urlParsingNode.href,
        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
        host: urlParsingNode.host,
        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
        hostname: urlParsingNode.hostname,
        port: urlParsingNode.port,
        pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
                  urlParsingNode.pathname :
                  '/' + urlParsingNode.pathname
      };
    }

    originURL = resolveURL(window.location.href);

    /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
    return function isURLSameOrigin(requestURL) {
      var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
      return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
    };
  })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return function isURLSameOrigin() {
      return true;
    };
  })()
);


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// btoa polyfill for IE<10 courtesy https://github.com/davidchambers/Base64.js

var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

function E() {
  this.message = 'String contains an invalid character';
}
E.prototype = new Error;
E.prototype.code = 5;
E.prototype.name = 'InvalidCharacterError';

function btoa(input) {
  var str = String(input);
  var output = '';
  for (
    // initialize result and counter
    var block, charCode, idx = 0, map = chars;
    // if the next str index does not exist:
    //   change the mapping table to "="
    //   check if d has no fractional digits
    str.charAt(idx | 0) || (map = '=', idx % 1);
    // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
    output += map.charAt(63 & block >> 8 - idx % 1 * 8)
  ) {
    charCode = str.charCodeAt(idx += 3 / 4);
    if (charCode > 0xFF) {
      throw new E();
    }
    block = block << 8 | charCode;
  }
  return output;
}

module.exports = btoa;


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
  (function standardBrowserEnv() {
    return {
      write: function write(name, value, expires, path, domain, secure) {
        var cookie = [];
        cookie.push(name + '=' + encodeURIComponent(value));

        if (utils.isNumber(expires)) {
          cookie.push('expires=' + new Date(expires).toGMTString());
        }

        if (utils.isString(path)) {
          cookie.push('path=' + path);
        }

        if (utils.isString(domain)) {
          cookie.push('domain=' + domain);
        }

        if (secure === true) {
          cookie.push('secure');
        }

        document.cookie = cookie.join('; ');
      },

      read: function read(name) {
        var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
        return (match ? decodeURIComponent(match[3]) : null);
      },

      remove: function remove(name) {
        this.write(name, '', Date.now() - 86400000);
      }
    };
  })() :

  // Non standard browser env (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return {
      write: function write() {},
      read: function read() { return null; },
      remove: function remove() {}
    };
  })()
);


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);
var transformData = __webpack_require__(31);
var isCancel = __webpack_require__(9);
var defaults = __webpack_require__(3);
var isAbsoluteURL = __webpack_require__(32);
var combineURLs = __webpack_require__(33);

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Support baseURL config
  if (config.baseURL && !isAbsoluteURL(config.url)) {
    config.url = combineURLs(config.baseURL, config.url);
  }

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers || {}
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__(10);

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _Files = __webpack_require__(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UploadButton = function (_Component) {
    _inherits(UploadButton, _Component);

    function UploadButton(props) {
        _classCallCheck(this, UploadButton);

        var _this = _possibleConstructorReturn(this, (UploadButton.__proto__ || Object.getPrototypeOf(UploadButton)).call(this, props));

        _this.uploadFolderOnClick = function (event) {
            _this.setState({
                uploadFolder: true,
                menuOpen: false
            }, function () {
                _this.folderUploader.click();
            });
            _this.props.onClick(event);
        };

        _this.uploadFileOnClick = function (event) {
            _this.setState({
                uploadFolder: false,
                menuOpen: false
            }, function () {
                _this.fileUploader.click();
            });
            _this.props.onClick(event);
        };

        _this.handleFile = function (event) {
            console.log(event);
            _this.setState({ menuOpen: false });
            var loader = _this.state.uploadFolder ? _this.folderUploader : _this.fileUploader;
            var files = Array.from(loader.files);
            _this.props.onFiles(files);
        };

        _this.openMenu = function () {
            _this.setState({ menuOpen: true });
        };

        _this.render = function () {
            return _react2.default.createElement(
                'div',
                { style: { display: 'inline-block' } },
                _react2.default.createElement('input', {
                    ref: function ref(input) {
                        _this.fileUploader = input;
                    },
                    type: 'file',
                    onChange: _this.handleFile,
                    style: { display: 'none' } }),
                _react2.default.createElement('input', {
                    ref: function ref(input) {
                        _this.folderUploader = input;
                    },
                    type: 'file',
                    onChange: _this.handleFile,
                    style: { display: 'none' } }),
                _react2.default.createElement(
                    'a',
                    { className: 'button', onClick: _this.openMenu },
                    _react2.default.createElement('span', { className: 'icon-upload' }),
                    ' \u9009\u62E9\u4E0A\u4F20',
                    _react2.default.createElement(
                        'div',
                        { className: 'popovermenu menu menu-left ' + (_this.state.menuOpen ? 'open' : '') },
                        _react2.default.createElement(
                            'ul',
                            null,
                            _react2.default.createElement(
                                'li',
                                null,
                                _react2.default.createElement(
                                    'button',
                                    { className: 'menuitem', onClick: _this.uploadFileOnClick },
                                    _react2.default.createElement('span', { className: 'icon icon-file' }),
                                    _react2.default.createElement(
                                        'span',
                                        null,
                                        '\u6DFB\u52A0\u6587\u4EF6'
                                    )
                                )
                            ),
                            _react2.default.createElement(
                                'li',
                                null,
                                _react2.default.createElement(
                                    'button',
                                    { className: 'menuitem', onClick: _this.uploadFolderOnClick },
                                    _react2.default.createElement('span', { className: 'icon icon-folder' }),
                                    _react2.default.createElement(
                                        'span',
                                        null,
                                        '\u6DFB\u52A0\u6587\u4EF6\u5939'
                                    )
                                )
                            )
                        )
                    )
                )
            );
        };

        _this.fileUploader = null;
        _this.folderUploader = null;
        _this.state = {
            uploadFolder: false,
            menuOpen: false
        };
        return _this;
    }

    _createClass(UploadButton, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            // folder uploader
            this.folderUploader.directory = true;
            this.folderUploader.webkitdirectory = true;
            this.folderUploader.mozdirectory = true;
            this.folderUploader.nwdirectory = true;
            this.folderUploader.multiple = true;
            // multiple files
            this.fileUploader.multiple = true;
        }
    }]);

    return UploadButton;
}(_react.Component);

exports.default = UploadButton;

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var FILE_CHUNK_SIZE = exports.FILE_CHUNK_SIZE = 1024 * 1024 * 20; // 20MB

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

(function (factory) {
    if (true) {
        // Node/CommonJS
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        // AMD
        define(factory);
    } else {
        // Browser globals (with support for web workers)
        var glob;

        try {
            glob = window;
        } catch (e) {
            glob = self;
        }

        glob.SparkMD5 = factory();
    }
}(function (undefined) {

    'use strict';

    /*
     * Fastest md5 implementation around (JKM md5).
     * Credits: Joseph Myers
     *
     * @see http://www.myersdaily.org/joseph/javascript/md5-text.html
     * @see http://jsperf.com/md5-shootout/7
     */

    /* this function is much faster,
      so if possible we use it. Some IEs
      are the only ones I know of that
      need the idiotic second function,
      generated by an if clause.  */
    var add32 = function (a, b) {
        return (a + b) & 0xFFFFFFFF;
    },
        hex_chr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];


    function cmn(q, a, b, x, s, t) {
        a = add32(add32(a, q), add32(x, t));
        return add32((a << s) | (a >>> (32 - s)), b);
    }

    function md5cycle(x, k) {
        var a = x[0],
            b = x[1],
            c = x[2],
            d = x[3];

        a += (b & c | ~b & d) + k[0] - 680876936 | 0;
        a  = (a << 7 | a >>> 25) + b | 0;
        d += (a & b | ~a & c) + k[1] - 389564586 | 0;
        d  = (d << 12 | d >>> 20) + a | 0;
        c += (d & a | ~d & b) + k[2] + 606105819 | 0;
        c  = (c << 17 | c >>> 15) + d | 0;
        b += (c & d | ~c & a) + k[3] - 1044525330 | 0;
        b  = (b << 22 | b >>> 10) + c | 0;
        a += (b & c | ~b & d) + k[4] - 176418897 | 0;
        a  = (a << 7 | a >>> 25) + b | 0;
        d += (a & b | ~a & c) + k[5] + 1200080426 | 0;
        d  = (d << 12 | d >>> 20) + a | 0;
        c += (d & a | ~d & b) + k[6] - 1473231341 | 0;
        c  = (c << 17 | c >>> 15) + d | 0;
        b += (c & d | ~c & a) + k[7] - 45705983 | 0;
        b  = (b << 22 | b >>> 10) + c | 0;
        a += (b & c | ~b & d) + k[8] + 1770035416 | 0;
        a  = (a << 7 | a >>> 25) + b | 0;
        d += (a & b | ~a & c) + k[9] - 1958414417 | 0;
        d  = (d << 12 | d >>> 20) + a | 0;
        c += (d & a | ~d & b) + k[10] - 42063 | 0;
        c  = (c << 17 | c >>> 15) + d | 0;
        b += (c & d | ~c & a) + k[11] - 1990404162 | 0;
        b  = (b << 22 | b >>> 10) + c | 0;
        a += (b & c | ~b & d) + k[12] + 1804603682 | 0;
        a  = (a << 7 | a >>> 25) + b | 0;
        d += (a & b | ~a & c) + k[13] - 40341101 | 0;
        d  = (d << 12 | d >>> 20) + a | 0;
        c += (d & a | ~d & b) + k[14] - 1502002290 | 0;
        c  = (c << 17 | c >>> 15) + d | 0;
        b += (c & d | ~c & a) + k[15] + 1236535329 | 0;
        b  = (b << 22 | b >>> 10) + c | 0;

        a += (b & d | c & ~d) + k[1] - 165796510 | 0;
        a  = (a << 5 | a >>> 27) + b | 0;
        d += (a & c | b & ~c) + k[6] - 1069501632 | 0;
        d  = (d << 9 | d >>> 23) + a | 0;
        c += (d & b | a & ~b) + k[11] + 643717713 | 0;
        c  = (c << 14 | c >>> 18) + d | 0;
        b += (c & a | d & ~a) + k[0] - 373897302 | 0;
        b  = (b << 20 | b >>> 12) + c | 0;
        a += (b & d | c & ~d) + k[5] - 701558691 | 0;
        a  = (a << 5 | a >>> 27) + b | 0;
        d += (a & c | b & ~c) + k[10] + 38016083 | 0;
        d  = (d << 9 | d >>> 23) + a | 0;
        c += (d & b | a & ~b) + k[15] - 660478335 | 0;
        c  = (c << 14 | c >>> 18) + d | 0;
        b += (c & a | d & ~a) + k[4] - 405537848 | 0;
        b  = (b << 20 | b >>> 12) + c | 0;
        a += (b & d | c & ~d) + k[9] + 568446438 | 0;
        a  = (a << 5 | a >>> 27) + b | 0;
        d += (a & c | b & ~c) + k[14] - 1019803690 | 0;
        d  = (d << 9 | d >>> 23) + a | 0;
        c += (d & b | a & ~b) + k[3] - 187363961 | 0;
        c  = (c << 14 | c >>> 18) + d | 0;
        b += (c & a | d & ~a) + k[8] + 1163531501 | 0;
        b  = (b << 20 | b >>> 12) + c | 0;
        a += (b & d | c & ~d) + k[13] - 1444681467 | 0;
        a  = (a << 5 | a >>> 27) + b | 0;
        d += (a & c | b & ~c) + k[2] - 51403784 | 0;
        d  = (d << 9 | d >>> 23) + a | 0;
        c += (d & b | a & ~b) + k[7] + 1735328473 | 0;
        c  = (c << 14 | c >>> 18) + d | 0;
        b += (c & a | d & ~a) + k[12] - 1926607734 | 0;
        b  = (b << 20 | b >>> 12) + c | 0;

        a += (b ^ c ^ d) + k[5] - 378558 | 0;
        a  = (a << 4 | a >>> 28) + b | 0;
        d += (a ^ b ^ c) + k[8] - 2022574463 | 0;
        d  = (d << 11 | d >>> 21) + a | 0;
        c += (d ^ a ^ b) + k[11] + 1839030562 | 0;
        c  = (c << 16 | c >>> 16) + d | 0;
        b += (c ^ d ^ a) + k[14] - 35309556 | 0;
        b  = (b << 23 | b >>> 9) + c | 0;
        a += (b ^ c ^ d) + k[1] - 1530992060 | 0;
        a  = (a << 4 | a >>> 28) + b | 0;
        d += (a ^ b ^ c) + k[4] + 1272893353 | 0;
        d  = (d << 11 | d >>> 21) + a | 0;
        c += (d ^ a ^ b) + k[7] - 155497632 | 0;
        c  = (c << 16 | c >>> 16) + d | 0;
        b += (c ^ d ^ a) + k[10] - 1094730640 | 0;
        b  = (b << 23 | b >>> 9) + c | 0;
        a += (b ^ c ^ d) + k[13] + 681279174 | 0;
        a  = (a << 4 | a >>> 28) + b | 0;
        d += (a ^ b ^ c) + k[0] - 358537222 | 0;
        d  = (d << 11 | d >>> 21) + a | 0;
        c += (d ^ a ^ b) + k[3] - 722521979 | 0;
        c  = (c << 16 | c >>> 16) + d | 0;
        b += (c ^ d ^ a) + k[6] + 76029189 | 0;
        b  = (b << 23 | b >>> 9) + c | 0;
        a += (b ^ c ^ d) + k[9] - 640364487 | 0;
        a  = (a << 4 | a >>> 28) + b | 0;
        d += (a ^ b ^ c) + k[12] - 421815835 | 0;
        d  = (d << 11 | d >>> 21) + a | 0;
        c += (d ^ a ^ b) + k[15] + 530742520 | 0;
        c  = (c << 16 | c >>> 16) + d | 0;
        b += (c ^ d ^ a) + k[2] - 995338651 | 0;
        b  = (b << 23 | b >>> 9) + c | 0;

        a += (c ^ (b | ~d)) + k[0] - 198630844 | 0;
        a  = (a << 6 | a >>> 26) + b | 0;
        d += (b ^ (a | ~c)) + k[7] + 1126891415 | 0;
        d  = (d << 10 | d >>> 22) + a | 0;
        c += (a ^ (d | ~b)) + k[14] - 1416354905 | 0;
        c  = (c << 15 | c >>> 17) + d | 0;
        b += (d ^ (c | ~a)) + k[5] - 57434055 | 0;
        b  = (b << 21 |b >>> 11) + c | 0;
        a += (c ^ (b | ~d)) + k[12] + 1700485571 | 0;
        a  = (a << 6 | a >>> 26) + b | 0;
        d += (b ^ (a | ~c)) + k[3] - 1894986606 | 0;
        d  = (d << 10 | d >>> 22) + a | 0;
        c += (a ^ (d | ~b)) + k[10] - 1051523 | 0;
        c  = (c << 15 | c >>> 17) + d | 0;
        b += (d ^ (c | ~a)) + k[1] - 2054922799 | 0;
        b  = (b << 21 |b >>> 11) + c | 0;
        a += (c ^ (b | ~d)) + k[8] + 1873313359 | 0;
        a  = (a << 6 | a >>> 26) + b | 0;
        d += (b ^ (a | ~c)) + k[15] - 30611744 | 0;
        d  = (d << 10 | d >>> 22) + a | 0;
        c += (a ^ (d | ~b)) + k[6] - 1560198380 | 0;
        c  = (c << 15 | c >>> 17) + d | 0;
        b += (d ^ (c | ~a)) + k[13] + 1309151649 | 0;
        b  = (b << 21 |b >>> 11) + c | 0;
        a += (c ^ (b | ~d)) + k[4] - 145523070 | 0;
        a  = (a << 6 | a >>> 26) + b | 0;
        d += (b ^ (a | ~c)) + k[11] - 1120210379 | 0;
        d  = (d << 10 | d >>> 22) + a | 0;
        c += (a ^ (d | ~b)) + k[2] + 718787259 | 0;
        c  = (c << 15 | c >>> 17) + d | 0;
        b += (d ^ (c | ~a)) + k[9] - 343485551 | 0;
        b  = (b << 21 | b >>> 11) + c | 0;

        x[0] = a + x[0] | 0;
        x[1] = b + x[1] | 0;
        x[2] = c + x[2] | 0;
        x[3] = d + x[3] | 0;
    }

    function md5blk(s) {
        var md5blks = [],
            i; /* Andy King said do it this way. */

        for (i = 0; i < 64; i += 4) {
            md5blks[i >> 2] = s.charCodeAt(i) + (s.charCodeAt(i + 1) << 8) + (s.charCodeAt(i + 2) << 16) + (s.charCodeAt(i + 3) << 24);
        }
        return md5blks;
    }

    function md5blk_array(a) {
        var md5blks = [],
            i; /* Andy King said do it this way. */

        for (i = 0; i < 64; i += 4) {
            md5blks[i >> 2] = a[i] + (a[i + 1] << 8) + (a[i + 2] << 16) + (a[i + 3] << 24);
        }
        return md5blks;
    }

    function md51(s) {
        var n = s.length,
            state = [1732584193, -271733879, -1732584194, 271733878],
            i,
            length,
            tail,
            tmp,
            lo,
            hi;

        for (i = 64; i <= n; i += 64) {
            md5cycle(state, md5blk(s.substring(i - 64, i)));
        }
        s = s.substring(i - 64);
        length = s.length;
        tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        for (i = 0; i < length; i += 1) {
            tail[i >> 2] |= s.charCodeAt(i) << ((i % 4) << 3);
        }
        tail[i >> 2] |= 0x80 << ((i % 4) << 3);
        if (i > 55) {
            md5cycle(state, tail);
            for (i = 0; i < 16; i += 1) {
                tail[i] = 0;
            }
        }

        // Beware that the final length might not fit in 32 bits so we take care of that
        tmp = n * 8;
        tmp = tmp.toString(16).match(/(.*?)(.{0,8})$/);
        lo = parseInt(tmp[2], 16);
        hi = parseInt(tmp[1], 16) || 0;

        tail[14] = lo;
        tail[15] = hi;

        md5cycle(state, tail);
        return state;
    }

    function md51_array(a) {
        var n = a.length,
            state = [1732584193, -271733879, -1732584194, 271733878],
            i,
            length,
            tail,
            tmp,
            lo,
            hi;

        for (i = 64; i <= n; i += 64) {
            md5cycle(state, md5blk_array(a.subarray(i - 64, i)));
        }

        // Not sure if it is a bug, however IE10 will always produce a sub array of length 1
        // containing the last element of the parent array if the sub array specified starts
        // beyond the length of the parent array - weird.
        // https://connect.microsoft.com/IE/feedback/details/771452/typed-array-subarray-issue
        a = (i - 64) < n ? a.subarray(i - 64) : new Uint8Array(0);

        length = a.length;
        tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        for (i = 0; i < length; i += 1) {
            tail[i >> 2] |= a[i] << ((i % 4) << 3);
        }

        tail[i >> 2] |= 0x80 << ((i % 4) << 3);
        if (i > 55) {
            md5cycle(state, tail);
            for (i = 0; i < 16; i += 1) {
                tail[i] = 0;
            }
        }

        // Beware that the final length might not fit in 32 bits so we take care of that
        tmp = n * 8;
        tmp = tmp.toString(16).match(/(.*?)(.{0,8})$/);
        lo = parseInt(tmp[2], 16);
        hi = parseInt(tmp[1], 16) || 0;

        tail[14] = lo;
        tail[15] = hi;

        md5cycle(state, tail);

        return state;
    }

    function rhex(n) {
        var s = '',
            j;
        for (j = 0; j < 4; j += 1) {
            s += hex_chr[(n >> (j * 8 + 4)) & 0x0F] + hex_chr[(n >> (j * 8)) & 0x0F];
        }
        return s;
    }

    function hex(x) {
        var i;
        for (i = 0; i < x.length; i += 1) {
            x[i] = rhex(x[i]);
        }
        return x.join('');
    }

    // In some cases the fast add32 function cannot be used..
    if (hex(md51('hello')) !== '5d41402abc4b2a76b9719d911017c592') {
        add32 = function (x, y) {
            var lsw = (x & 0xFFFF) + (y & 0xFFFF),
                msw = (x >> 16) + (y >> 16) + (lsw >> 16);
            return (msw << 16) | (lsw & 0xFFFF);
        };
    }

    // ---------------------------------------------------

    /**
     * ArrayBuffer slice polyfill.
     *
     * @see https://github.com/ttaubert/node-arraybuffer-slice
     */

    if (typeof ArrayBuffer !== 'undefined' && !ArrayBuffer.prototype.slice) {
        (function () {
            function clamp(val, length) {
                val = (val | 0) || 0;

                if (val < 0) {
                    return Math.max(val + length, 0);
                }

                return Math.min(val, length);
            }

            ArrayBuffer.prototype.slice = function (from, to) {
                var length = this.byteLength,
                    begin = clamp(from, length),
                    end = length,
                    num,
                    target,
                    targetArray,
                    sourceArray;

                if (to !== undefined) {
                    end = clamp(to, length);
                }

                if (begin > end) {
                    return new ArrayBuffer(0);
                }

                num = end - begin;
                target = new ArrayBuffer(num);
                targetArray = new Uint8Array(target);

                sourceArray = new Uint8Array(this, begin, num);
                targetArray.set(sourceArray);

                return target;
            };
        })();
    }

    // ---------------------------------------------------

    /**
     * Helpers.
     */

    function toUtf8(str) {
        if (/[\u0080-\uFFFF]/.test(str)) {
            str = unescape(encodeURIComponent(str));
        }

        return str;
    }

    function utf8Str2ArrayBuffer(str, returnUInt8Array) {
        var length = str.length,
           buff = new ArrayBuffer(length),
           arr = new Uint8Array(buff),
           i;

        for (i = 0; i < length; i += 1) {
            arr[i] = str.charCodeAt(i);
        }

        return returnUInt8Array ? arr : buff;
    }

    function arrayBuffer2Utf8Str(buff) {
        return String.fromCharCode.apply(null, new Uint8Array(buff));
    }

    function concatenateArrayBuffers(first, second, returnUInt8Array) {
        var result = new Uint8Array(first.byteLength + second.byteLength);

        result.set(new Uint8Array(first));
        result.set(new Uint8Array(second), first.byteLength);

        return returnUInt8Array ? result : result.buffer;
    }

    function hexToBinaryString(hex) {
        var bytes = [],
            length = hex.length,
            x;

        for (x = 0; x < length - 1; x += 2) {
            bytes.push(parseInt(hex.substr(x, 2), 16));
        }

        return String.fromCharCode.apply(String, bytes);
    }

    // ---------------------------------------------------

    /**
     * SparkMD5 OOP implementation.
     *
     * Use this class to perform an incremental md5, otherwise use the
     * static methods instead.
     */

    function SparkMD5() {
        // call reset to init the instance
        this.reset();
    }

    /**
     * Appends a string.
     * A conversion will be applied if an utf8 string is detected.
     *
     * @param {String} str The string to be appended
     *
     * @return {SparkMD5} The instance itself
     */
    SparkMD5.prototype.append = function (str) {
        // Converts the string to utf8 bytes if necessary
        // Then append as binary
        this.appendBinary(toUtf8(str));

        return this;
    };

    /**
     * Appends a binary string.
     *
     * @param {String} contents The binary string to be appended
     *
     * @return {SparkMD5} The instance itself
     */
    SparkMD5.prototype.appendBinary = function (contents) {
        this._buff += contents;
        this._length += contents.length;

        var length = this._buff.length,
            i;

        for (i = 64; i <= length; i += 64) {
            md5cycle(this._hash, md5blk(this._buff.substring(i - 64, i)));
        }

        this._buff = this._buff.substring(i - 64);

        return this;
    };

    /**
     * Finishes the incremental computation, reseting the internal state and
     * returning the result.
     *
     * @param {Boolean} raw True to get the raw string, false to get the hex string
     *
     * @return {String} The result
     */
    SparkMD5.prototype.end = function (raw) {
        var buff = this._buff,
            length = buff.length,
            i,
            tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            ret;

        for (i = 0; i < length; i += 1) {
            tail[i >> 2] |= buff.charCodeAt(i) << ((i % 4) << 3);
        }

        this._finish(tail, length);
        ret = hex(this._hash);

        if (raw) {
            ret = hexToBinaryString(ret);
        }

        this.reset();

        return ret;
    };

    /**
     * Resets the internal state of the computation.
     *
     * @return {SparkMD5} The instance itself
     */
    SparkMD5.prototype.reset = function () {
        this._buff = '';
        this._length = 0;
        this._hash = [1732584193, -271733879, -1732584194, 271733878];

        return this;
    };

    /**
     * Gets the internal state of the computation.
     *
     * @return {Object} The state
     */
    SparkMD5.prototype.getState = function () {
        return {
            buff: this._buff,
            length: this._length,
            hash: this._hash
        };
    };

    /**
     * Gets the internal state of the computation.
     *
     * @param {Object} state The state
     *
     * @return {SparkMD5} The instance itself
     */
    SparkMD5.prototype.setState = function (state) {
        this._buff = state.buff;
        this._length = state.length;
        this._hash = state.hash;

        return this;
    };

    /**
     * Releases memory used by the incremental buffer and other additional
     * resources. If you plan to use the instance again, use reset instead.
     */
    SparkMD5.prototype.destroy = function () {
        delete this._hash;
        delete this._buff;
        delete this._length;
    };

    /**
     * Finish the final calculation based on the tail.
     *
     * @param {Array}  tail   The tail (will be modified)
     * @param {Number} length The length of the remaining buffer
     */
    SparkMD5.prototype._finish = function (tail, length) {
        var i = length,
            tmp,
            lo,
            hi;

        tail[i >> 2] |= 0x80 << ((i % 4) << 3);
        if (i > 55) {
            md5cycle(this._hash, tail);
            for (i = 0; i < 16; i += 1) {
                tail[i] = 0;
            }
        }

        // Do the final computation based on the tail and length
        // Beware that the final length may not fit in 32 bits so we take care of that
        tmp = this._length * 8;
        tmp = tmp.toString(16).match(/(.*?)(.{0,8})$/);
        lo = parseInt(tmp[2], 16);
        hi = parseInt(tmp[1], 16) || 0;

        tail[14] = lo;
        tail[15] = hi;
        md5cycle(this._hash, tail);
    };

    /**
     * Performs the md5 hash on a string.
     * A conversion will be applied if utf8 string is detected.
     *
     * @param {String}  str The string
     * @param {Boolean} raw True to get the raw string, false to get the hex string
     *
     * @return {String} The result
     */
    SparkMD5.hash = function (str, raw) {
        // Converts the string to utf8 bytes if necessary
        // Then compute it using the binary function
        return SparkMD5.hashBinary(toUtf8(str), raw);
    };

    /**
     * Performs the md5 hash on a binary string.
     *
     * @param {String}  content The binary string
     * @param {Boolean} raw     True to get the raw string, false to get the hex string
     *
     * @return {String} The result
     */
    SparkMD5.hashBinary = function (content, raw) {
        var hash = md51(content),
            ret = hex(hash);

        return raw ? hexToBinaryString(ret) : ret;
    };

    // ---------------------------------------------------

    /**
     * SparkMD5 OOP implementation for array buffers.
     *
     * Use this class to perform an incremental md5 ONLY for array buffers.
     */
    SparkMD5.ArrayBuffer = function () {
        // call reset to init the instance
        this.reset();
    };

    /**
     * Appends an array buffer.
     *
     * @param {ArrayBuffer} arr The array to be appended
     *
     * @return {SparkMD5.ArrayBuffer} The instance itself
     */
    SparkMD5.ArrayBuffer.prototype.append = function (arr) {
        var buff = concatenateArrayBuffers(this._buff.buffer, arr, true),
            length = buff.length,
            i;

        this._length += arr.byteLength;

        for (i = 64; i <= length; i += 64) {
            md5cycle(this._hash, md5blk_array(buff.subarray(i - 64, i)));
        }

        this._buff = (i - 64) < length ? new Uint8Array(buff.buffer.slice(i - 64)) : new Uint8Array(0);

        return this;
    };

    /**
     * Finishes the incremental computation, reseting the internal state and
     * returning the result.
     *
     * @param {Boolean} raw True to get the raw string, false to get the hex string
     *
     * @return {String} The result
     */
    SparkMD5.ArrayBuffer.prototype.end = function (raw) {
        var buff = this._buff,
            length = buff.length,
            tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            i,
            ret;

        for (i = 0; i < length; i += 1) {
            tail[i >> 2] |= buff[i] << ((i % 4) << 3);
        }

        this._finish(tail, length);
        ret = hex(this._hash);

        if (raw) {
            ret = hexToBinaryString(ret);
        }

        this.reset();

        return ret;
    };

    /**
     * Resets the internal state of the computation.
     *
     * @return {SparkMD5.ArrayBuffer} The instance itself
     */
    SparkMD5.ArrayBuffer.prototype.reset = function () {
        this._buff = new Uint8Array(0);
        this._length = 0;
        this._hash = [1732584193, -271733879, -1732584194, 271733878];

        return this;
    };

    /**
     * Gets the internal state of the computation.
     *
     * @return {Object} The state
     */
    SparkMD5.ArrayBuffer.prototype.getState = function () {
        var state = SparkMD5.prototype.getState.call(this);

        // Convert buffer to a string
        state.buff = arrayBuffer2Utf8Str(state.buff);

        return state;
    };

    /**
     * Gets the internal state of the computation.
     *
     * @param {Object} state The state
     *
     * @return {SparkMD5.ArrayBuffer} The instance itself
     */
    SparkMD5.ArrayBuffer.prototype.setState = function (state) {
        // Convert string to buffer
        state.buff = utf8Str2ArrayBuffer(state.buff, true);

        return SparkMD5.prototype.setState.call(this, state);
    };

    SparkMD5.ArrayBuffer.prototype.destroy = SparkMD5.prototype.destroy;

    SparkMD5.ArrayBuffer.prototype._finish = SparkMD5.prototype._finish;

    /**
     * Performs the md5 hash on an array buffer.
     *
     * @param {ArrayBuffer} arr The array buffer
     * @param {Boolean}     raw True to get the raw string, false to get the hex one
     *
     * @return {String} The result
     */
    SparkMD5.ArrayBuffer.hash = function (arr, raw) {
        var hash = md51_array(new Uint8Array(arr)),
            ret = hex(hash);

        return raw ? hexToBinaryString(ret) : ret;
    };

    return SparkMD5;
}));


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _IFileNode2 = __webpack_require__(12);

var _IFileNode3 = _interopRequireDefault(_IFileNode2);

var _FileNode = __webpack_require__(5);

var _FileNode2 = _interopRequireDefault(_FileNode);

var _axios = __webpack_require__(2);

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FolderNode = function (_IFileNode) {
    _inherits(FolderNode, _IFileNode);

    function FolderNode(name) {
        _classCallCheck(this, FolderNode);

        var _this = _possibleConstructorReturn(this, (FolderNode.__proto__ || Object.getPrototypeOf(FolderNode)).call(this, name));

        _this.childUpdate = function (newChild) {
            _this.addChild(newChild.name, newChild);
            if (typeof _this._onUpdate === 'function') _this._onUpdate(_this);
        };

        _this.sendFileInitRequest = function (url) {
            var filenames = Object.keys(_this.children);
            var filesInfo = filenames.filter(_this.filterFileNode).map(function (filename) {
                var child = _this.children[filename];
                return child.fileInfo;
            });

            return _axios2.default.post(url, { files: filesInfo }).then(function (resp) {
                var data = resp.data;
                data.map(function (initFile) {
                    var filename = initFile.filename,
                        id = initFile.id;

                    var newChilNode = Object.assign(_this.children[filename], { inited: true, fileId: id });
                    _this.children[filename] = newChilNode;
                });
                // all sub files inited
                if (typeof _this._onUpdate === 'function') _this._onUpdate(_this);
            }).then(function () {
                var subFolders = filenames.filter(_this.filterFolderNode).map(function (folderName) {
                    return _this.children[folderName].setOnUpdate(function (value) {
                        if (typeof _this._onUpdate === 'function') _this._onUpdate(_this);
                    });
                });

                var subFolderInitPromises = subFolders.reduce(function (list, folder) {
                    var promise = folder.sendFileInitRequest(url);
                    return list.concat([promise]);
                }, []);

                return Promise.all(subFolderInitPromises).then(function () {
                    _this.inited = true;
                    if (typeof _this._onUpdate === 'function') _this._onUpdate(_this);
                    return _this;
                });
            });
        };

        _this.sendChunks = function (baseUrl) {

            var filenames = Object.keys(_this.children);
            var promises = filenames.filter(_this.filterFileNode).map(function (filename) {
                return _this.children[filename];
            }).reduce(function (list, file) {
                var promise = file.setOnUpdate(_this.childUpdate).sendChunks(baseUrl);
                return list.concat([promise]);
            }, []);

            return Promise.all(promises);
        };

        return _this;
    }

    return FolderNode;
}(_IFileNode3.default);

exports.default = FolderNode;

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _FileNode = __webpack_require__(5);

var _FileNode2 = _interopRequireDefault(_FileNode);

var _Node = __webpack_require__(13);

var _Node2 = _interopRequireDefault(_Node);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Tree = function Tree(_ref) {
  var root = _ref.root;

  return _react2.default.createElement(
    'ul',
    { className: 'tree' },
    _react2.default.createElement(_Node2.default, { nodes: root.children, level: 0 })
  );
};

exports.default = Tree;

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _Icons = __webpack_require__(43);

var _Files = __webpack_require__(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FileStatusIcon = function FileStatusIcon(_ref) {
    var node = _ref.node;

    var merging = node.inited && node.uploaded && !node.merged;
    var finish = node.inited && node.uploaded && node.merged;
    return _react2.default.createElement(
        'div',
        { className: 'tree-file-status-icon ' + (finish ? 'icon-checkmark-color' : '') },
        merging ? _react2.default.createElement(
            'div',
            { style: { height: '100%', width: '16px' } },
            _react2.default.createElement(_Icons.MergeIcon, null)
        ) : ''
    );
};

var FileIcon = function FileIcon(_ref2) {
    var node = _ref2.node;

    var Icon = (0, _Icons.getFileIcon)(node.file);
    return _react2.default.createElement(
        'div',
        { className: 'tree-file-icon file-icon icon' },
        _react2.default.createElement(Icon, null)
    );
};

var FileSize = function FileSize(_ref3) {
    var node = _ref3.node;
    return _react2.default.createElement(
        'div',
        { className: 'tree-file-size' },
        (0, _Files.getFileSize)(node.file)
    );
};

var showProcess = function showProcess(node) {
    return node.inited && !node.uploaded && !node.merged;
};
var FileNode = function FileNode(_ref4) {
    var node = _ref4.node;
    return _react2.default.createElement(
        'li',
        { className: 'node-desc' },
        _react2.default.createElement(FileIcon, { node: node }),
        _react2.default.createElement(
            'div',
            { className: 'tree-file-name' },
            node.name
        ),
        _react2.default.createElement(
            'div',
            { className: 'tree-file-status' },
            _react2.default.createElement(FileSize, { node: node }),
            _react2.default.createElement(FileStatusIcon, { node: node }),
            _react2.default.createElement(
                'div',
                { className: 'app-progress', hidden: !showProcess(node) },
                _react2.default.createElement(
                    'div',
                    { className: 'progress-text', hidden: !showProcess(node) },
                    node.uploadingPercentage,
                    '%'
                ),
                _react2.default.createElement('progress', { hidden: !showProcess(node), value: node.uploadingPercentage, max: '100' })
            )
        )
    );
};

exports.default = FileNode;

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _Icons = __webpack_require__(43);

var _Node = __webpack_require__(13);

var _Node2 = _interopRequireDefault(_Node);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FolderNode = function (_Component) {
    _inherits(FolderNode, _Component);

    function FolderNode(props) {
        _classCallCheck(this, FolderNode);

        var _this = _possibleConstructorReturn(this, (FolderNode.__proto__ || Object.getPrototypeOf(FolderNode)).call(this, props));

        _this.onFolderClick = function () {
            _this.setState({
                collapsed: !_this.state.collapsed
            });
        };

        _this.render = function () {
            return _react2.default.createElement(
                'li',
                null,
                _react2.default.createElement(
                    'div',
                    { onClick: _this.onFolderClick, className: 'node-desc' },
                    _react2.default.createElement(
                        'div',
                        { className: 'tree-file-icon file-icon icon' },
                        (0, _Icons.getFolderIcon)(_this.state.collapsed)
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'tree-file-name' },
                        _this.props.node.name
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'tree-file-status' },
                        _this.props.node.getChildrenNum()
                    )
                ),
                _this.state.collapsed ? '' : _react2.default.createElement(
                    'ul',
                    null,
                    _react2.default.createElement(_Node2.default, { nodes: _this.props.node.children, level: _this.props.level + 1 })
                )
            );
        };

        _this.state = {
            collapsed: true
        };
        return _this;
    }

    return FolderNode;
}(_react.Component);

exports.default = FolderNode;

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MergeIcon = exports.getFolderIcon = exports.getFileIcon = undefined;

var _Folder = __webpack_require__(55);

var _Folder2 = _interopRequireDefault(_Folder);

var _FolderOpen = __webpack_require__(56);

var _FolderOpen2 = _interopRequireDefault(_FolderOpen);

var _File = __webpack_require__(57);

var _File2 = _interopRequireDefault(_File);

var _PDF = __webpack_require__(58);

var _PDF2 = _interopRequireDefault(_PDF);

var _PPT = __webpack_require__(59);

var _PPT2 = _interopRequireDefault(_PPT);

var _Image = __webpack_require__(60);

var _Image2 = _interopRequireDefault(_Image);

var _Video = __webpack_require__(61);

var _Video2 = _interopRequireDefault(_Video);

var _Music = __webpack_require__(62);

var _Music2 = _interopRequireDefault(_Music);

var _Excel = __webpack_require__(63);

var _Excel2 = _interopRequireDefault(_Excel);

var _Word = __webpack_require__(64);

var _Word2 = _interopRequireDefault(_Word);

var _Zip = __webpack_require__(65);

var _Zip2 = _interopRequireDefault(_Zip);

var _Merge = __webpack_require__(67);

var _Merge2 = _interopRequireDefault(_Merge);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// PDF Icon
var pdfRex = [/application\/pdf/];

// PPT Icon
var pptRex = [/application\/vnd.ms-powerpoint/, /application\/vnd.openxmlformats-officedocument.presentationml.presentation/];

// Image Icon
var imageRex = [/image\/*/];

// Video Icon
var videoRex = [/video\/*/];

// Music Icon
var musicRex = [/audio\/*/];

// Excel Icon
var excelRex = [/application\/vnd.ms-excel/, /application\/vnd.openxmlformats-officedocument.spreadsheetml.sheet/];

// Word Icon
var wordRex = [/application\/msword/, /application\/vnd.openxmlformats-officedocument.wordprocessingml.document/];

// ZIP Icon
var zipRex = [/application\/x-gzip/, /application\/gzip/, /application\/x-7z-compressed/, /application\/x-tar/, /application\/zip/, /application\/x-zip-compressed/];


var rexMatch = function rexMatch(str) {
    var rexList = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

    return rexList.map(function (rex) {
        return str.match(rex);
    }).reduce(function (prev, curr) {
        return prev || curr;
    }, false);
};

var getFileIcon = exports.getFileIcon = function getFileIcon(file) {
    var type = file.type;
    if (rexMatch(type, pdfRex)) {
        return _PDF2.default;
    } else if (rexMatch(type, pptRex)) {
        return _PPT2.default;
    } else if (rexMatch(type, imageRex)) {
        return _Image2.default;
    } else if (rexMatch(type, videoRex)) {
        return _Video2.default;
    } else if (rexMatch(type, musicRex)) {
        return _Music2.default;
    } else if (rexMatch(type, excelRex)) {
        return _Excel2.default;
    } else if (rexMatch(type, wordRex)) {
        return _Word2.default;
    } else if (rexMatch(type, zipRex)) {
        return _Word2.default;
    } else {
        return _File2.default;
    }
};

var getFolderIcon = exports.getFolderIcon = function getFolderIcon(collapsed) {
    return collapsed ? React.createElement(_Folder2.default, null) : React.createElement(_FolderOpen2.default, null);
};
var MergeIcon = exports.MergeIcon = _Merge2.default;

/***/ }),
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Folder = function Folder() {
  return _react2.default.createElement(
    "svg",
    { height: "100%", width: "100%", viewBox: "0 0 1024 1024", version: "1.1", xmlns: "http://www.w3.org/2000/svg" },
    _react2.default.createElement("path", { d: "M977.6 238.4c-9.6-9.6-21.6-14.4-33.6-14.4H472L366.4 118.4c-4-4-9.6-8-15.2-10.4-6.4-2.4-12-4-18.4-4H80c-12 0-24.8 4.8-33.6 14.4S32 140 32 152v280h960V272c0-12-4.8-24.8-14.4-33.6z", fill: "#FFD766" }),
    _react2.default.createElement("path", { d: "M944 912H80c-26.4 0-48-21.6-48-48V352h960v512c0 26.4-21.6 48-48 48z", fill: "#FFAC33" })
  );
};

exports.default = Folder;

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FolderOpen = function FolderOpen() {
  return _react2.default.createElement(
    "svg",
    { height: "100%", width: "100%", viewBox: "0 0 1024 1024", version: "1.1", xmlns: "http://www.w3.org/2000/svg" },
    _react2.default.createElement("path", { d: "M841.6 238.4c-9.6-9.6-21.6-14.4-33.6-14.4H432L326.4 118.4c-4-4-9.6-8-15.2-10.4-6.4-2.4-12-4-18.4-4H80c-12 0-24.8 4.8-33.6 14.4S32 140 32 152v712c0 12 4.8 24.8 14.4 33.6S68 912 80 912h728c12 0 24.8-4.8 33.6-14.4 9.6-9.6 14.4-21.6 14.4-33.6V272c0-12-4.8-24.8-14.4-33.6z", fill: "#FFD766" }),
    _react2.default.createElement("path", { d: "M858.4 877.6c-3.2 9.6-8.8 18.4-17.6 24.8-8.8 6.4-18.4 9.6-28.8 9.6H88.8c-14.4 0-28.8-6.4-38.4-19.2s-12-28.8-7.2-42.4l139.2-464c3.2-9.6 8.8-18.4 17.6-24.8 8.8-6.4 18.4-9.6 28.8-9.6h724c14.4 0 28.8 6.4 38.4 19.2 9.6 12.8 12 28.8 7.2 42.4l-140 464z", fill: "#FFAC33" })
  );
};

exports.default = FolderOpen;

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var File = function File() {
  return _react2.default.createElement(
    "svg",
    { height: "100%", width: "100%", viewBox: "0 0 1024 1024", version: "1.1", xmlns: "http://www.w3.org/2000/svg" },
    _react2.default.createElement("path", { fill: "#333333", d: "M679.814 62.381H128.692v897.177h768.434V255.079L679.814 62.381zM203.758 890.606V131.333h414.026v188.205H822.06v571.068H203.758z" }),
    _react2.default.createElement("path", { fill: "#333333", d: "M293.825 417.364H746.64v67.229H293.825zM293.825 577.709H746.64v67.229H293.825zM293.825 738.054H746.64v67.229H293.825z" })
  );
};

exports.default = File;

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PDF = function PDF() {
  return _react2.default.createElement(
    "svg",
    { height: "100%", width: "100%", viewBox: "0 0 1024 1024", version: "1.1", xmlns: "http://www.w3.org/2000/svg" },
    _react2.default.createElement("path", { d: "M292.887 806.826H586.15V408.445h-68.687v329.436H292.887z", fill: "#DE5934" }),
    _react2.default.createElement("path", { d: "M728.345 63.14H224.056v252.205h68.687v-183.26h378.844V320.27h186.917v571.008H292.743V679.252h-68.687v280.971h703.135V255.819z", fill: "#819292" }),
    _react2.default.createElement("path", { d: "M660.276 418.086h129.217v67.221H660.276zM660.276 578.414h129.217v67.221H660.276zM660.276 738.742h129.217v67.221H660.276z", fill: "#819292" }),
    _react2.default.createElement("path", { d: "M153.415 615.473c-0.071 0.868-0.191 2.319 3.378 4.31 1.85 1.032 3.838 1.533 6.079 1.533 15.83 0 40.741-23.869 63.986-60.169-44.866 19.745-72.561 43.601-73.443 54.326z", fill: "#DE5934" }),
    _react2.default.createElement("path", { d: "M460.55 679.252V315.345H98.004v363.908H460.55z m-297.678-40.7c-5.163 0-10.015-1.246-14.419-3.702-11.532-6.432-12.563-15.789-12.151-20.794 2.166-26.339 53.854-58.453 104.834-77.227 13.764-25.553 24.693-52.454 31.088-76.504-12.704-18.632-22.722-35.513-29.066-48.992-8.791-18.678-10.874-31.236-6.555-39.518 1.741-3.338 6.166-8.937 16.249-8.937 2.853 0 5.944 0.434 9.449 1.328 11.783 3.003 26.864 11.759 31.802 36.421 3.003 14.994 1.881 33.92-3.331 56.301 14.28 20.406 31.117 42.029 47.932 61.552 38.823 1.538 65.211 17.411 76.433 46.054l0.218 0.557 0.139 0.582c2.753 11.489 2.225 18.85-1.712 23.868-2.57 3.276-6.405 5.082-10.799 5.084h-0.013c-5.375 0-14.008-2.177-33.201-19.101-11.241-9.913-24.665-23.669-38.967-39.924-22.839 0.226-49.629 5.489-77.775 15.272-13.471 23.998-52.774 87.68-90.155 87.68z", fill: "#DE5934" }),
    _react2.default.createElement("path", { d: "M399.969 576.394c-0.118-1.42-0.407-3.402-1.031-6.105-6.997-17.321-21.427-28.222-43.023-32.557 23.996 25.761 37.925 35.748 44.054 38.662zM316.391 519.054l-0.843-0.968 0.322 0.004a829 829 0 0 1-30.537-39.219l-0.082 0.328-0.467-0.675c-5.15 16.154-11.97 33.114-20.043 49.84l0.824-0.295-0.493 0.897c15.32-4.419 33.101-8.361 51.319-9.912zM258.075 380.911c-2.076-0.529-3.834-0.797-5.224-0.797-0.526 0-0.897 0.04-1.143 0.082-0.307 1.494-0.686 7.583 7.124 24.088 4.357 9.208 10.593 20.192 18.342 32.345 3.422-23.549 2.201-50.289-19.099-55.718z", fill: "#DE5934" }),
    _react2.default.createElement("path", { d: "M330.803 535.599c14.302 16.256 27.726 30.012 38.967 39.924 19.193 16.924 27.826 19.101 33.201 19.101h0.013c4.394-0.003 8.228-1.809 10.799-5.084 3.937-5.019 4.465-12.379 1.712-23.868l-0.139-0.582-0.218-0.557c-11.222-28.643-37.61-44.516-76.433-46.054-16.815-19.524-33.652-41.146-47.932-61.552 5.212-22.381 6.334-41.307 3.331-56.301-4.938-24.661-20.02-33.418-31.802-36.421-3.505-0.893-6.596-1.328-9.449-1.328-10.083 0-14.508 5.599-16.249 8.937-4.318 8.282-2.236 20.84 6.555 39.518 6.344 13.479 16.362 30.361 29.066 48.992-6.395 24.049-17.324 50.95-31.088 76.504-50.98 18.774-102.668 50.888-104.834 77.227-0.412 5.005 0.62 14.362 12.151 20.794 4.405 2.457 9.256 3.702 14.419 3.702 37.381 0 76.684-63.682 90.157-87.681 28.145-9.782 54.934-15.045 77.773-15.271z m68.134 34.69c0.624 2.703 0.913 4.685 1.031 6.105-6.129-2.914-20.057-12.901-44.055-38.662 21.597 4.335 36.028 15.236 43.024 32.557z m-236.065 51.026c-2.241 0-4.23-0.501-6.079-1.533-3.569-1.99-3.449-3.442-3.378-4.31 0.882-10.725 28.577-34.581 73.443-54.326-23.245 36.3-48.156 60.169-63.986 60.169z m95.96-217.031c-7.81-16.505-7.431-22.594-7.124-24.088a6.741 6.741 0 0 1 1.143-0.082c1.39 0 3.147 0.268 5.224 0.797 21.301 5.429 22.521 32.169 19.099 55.718-7.749-12.153-13.985-23.137-18.342-32.345z m5.91 124.08c8.072-16.726 14.893-33.686 20.043-49.84l0.467 0.675 0.082-0.328a830.025 830.025 0 0 0 30.537 39.219l-0.322-0.004 0.843 0.968c-18.219 1.551-35.999 5.492-51.319 9.913l0.493-0.897-0.824 0.294z", fill: "#FFFFFF" })
  );
};

exports.default = PDF;

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PPT = function PPT() {
  return _react2.default.createElement(
    "svg",
    { height: "100%", width: "100%", viewBox: "0 0 1024 1024", version: "1.1", xmlns: "http://www.w3.org/2000/svg" },
    _react2.default.createElement("path", { d: "M292.921 805.631h293.314v-397.16h-68.698v328.426H292.921z", fill: "#BD3C20" }),
    _react2.default.createElement("path", { d: "M728.455 64.223H224.078v251.432h68.699V132.957h378.91v187.609h186.951v569.259H292.777V678.449h-68.699v280.11h703.259V256.311z", fill: "#819292" }),
    _react2.default.createElement("path", { d: "M660.375 418.082h129.24v67.016h-129.24zM660.375 577.919h129.24v67.016h-129.24zM660.375 737.756h129.24v67.016h-129.24z", fill: "#819292" }),
    _react2.default.createElement("path", { d: "M225.642 428.656h114.832v53.005H225.642z", fill: "#BD3C20" }),
    _react2.default.createElement("path", { d: "M460.614 678.449V315.655H98.004v362.794h362.61zM220.823 541.803v83.383h-60.447V368.512h60.447v0.002h128.654c28.181 0 51.108 24.427 51.108 54.452v64.386c0 30.025-22.927 54.452-51.108 54.452H220.823z", fill: "#BD3C20" }),
    _react2.default.createElement("path", { d: "M349.477 541.803c28.181 0 51.108-24.427 51.108-54.452v-64.386c0-30.025-22.927-54.452-51.108-54.452H220.823v-0.002h-60.447v256.674h60.447v-83.383h128.654zM225.642 428.656h114.832v53.005H225.642v-53.005z", fill: "#FFFFFF" })
  );
};

exports.default = PPT;

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Image = function Image() {
  return _react2.default.createElement(
    "svg",
    { height: "100%", width: "100%", viewBox: "0 0 1024 1024", version: "1.1", xmlns: "http://www.w3.org/2000/svg" },
    _react2.default.createElement("path", { d: "M160 32c-12 0-24.8 4.8-33.6 14.4S112 68 112 80v864c0 12 4.8 24.8 14.4 33.6 9.6 9.6 21.6 14.4 33.6 14.4h704c12 0 24.8-4.8 33.6-14.4 9.6-9.6 14.4-21.6 14.4-33.6V304L640 32H160z", fill: "#FF5562" }),
    _react2.default.createElement("path", { d: "M912 304H688c-12 0-24.8-4.8-33.6-14.4-9.6-8.8-14.4-21.6-14.4-33.6V32l272 272z", fill: "#FFBBC0" }),
    _react2.default.createElement("path", { d: "M758.4 705.6L658.4 550.4c-3.2-4.8-8-7.2-13.6-7.2s-10.4 3.2-13.6 7.2l-53.6 83.2-120-194.4c-3.2-4.8-8-7.2-13.6-7.2s-10.4 3.2-13.6 7.2L265.6 705.6c-3.2 4.8-3.2 11.2 0 16 3.2 5.6 8 8 13.6 8h465.6c5.6 0 11.2-3.2 14.4-8 2.4-5.6 2.4-12-0.8-16z", fill: "#FFFFFF" }),
    _react2.default.createElement("path", { d: "M662.4 412m-40 0a40 40 0 1 0 80 0 40 40 0 1 0-80 0Z", fill: "#FFFFFF" })
  );
};

exports.default = Image;

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Video = function Video() {
  return _react2.default.createElement(
    "svg",
    { height: "100%", width: "100%", viewBox: "0 0 1024 1024", version: "1.1", xmlns: "http://www.w3.org/2000/svg" },
    _react2.default.createElement("path", { d: "M80 34.4h864v960H80z", fill: "#8095FF" }),
    _react2.default.createElement("path", { d: "M176 112m-40 0a40 40 0 1 0 80 0 40 40 0 1 0-80 0Z", fill: "#FFFFFF" }),
    _react2.default.createElement("path", { d: "M176 272m-40 0a40 40 0 1 0 80 0 40 40 0 1 0-80 0Z", fill: "#FFFFFF" }),
    _react2.default.createElement("path", { d: "M176 432m-40 0a40 40 0 1 0 80 0 40 40 0 1 0-80 0Z", fill: "#FFFFFF" }),
    _react2.default.createElement("path", { d: "M176 592m-40 0a40 40 0 1 0 80 0 40 40 0 1 0-80 0Z", fill: "#FFFFFF" }),
    _react2.default.createElement("path", { d: "M176 752m-40 0a40 40 0 1 0 80 0 40 40 0 1 0-80 0Z", fill: "#FFFFFF" }),
    _react2.default.createElement("path", { d: "M176 912m-40 0a40 40 0 1 0 80 0 40 40 0 1 0-80 0Z", fill: "#FFFFFF" }),
    _react2.default.createElement("path", { d: "M864 112m-40 0a40 40 0 1 0 80 0 40 40 0 1 0-80 0Z", fill: "#FFFFFF" }),
    _react2.default.createElement("path", { d: "M864 272m-40 0a40 40 0 1 0 80 0 40 40 0 1 0-80 0Z", fill: "#FFFFFF" }),
    _react2.default.createElement("path", { d: "M864 432m-40 0a40 40 0 1 0 80 0 40 40 0 1 0-80 0Z", fill: "#FFFFFF" }),
    _react2.default.createElement("path", { d: "M864 592m-40 0a40 40 0 1 0 80 0 40 40 0 1 0-80 0Z", fill: "#FFFFFF" }),
    _react2.default.createElement("path", { d: "M864 752m-40 0a40 40 0 1 0 80 0 40 40 0 1 0-80 0Z", fill: "#FFFFFF" }),
    _react2.default.createElement("path", { d: "M864 912m-40 0a40 40 0 1 0 80 0 40 40 0 1 0-80 0Z", fill: "#FFFFFF" }),
    _react2.default.createElement("path", { d: "M648 508L436 362.4c-4.8-3.2-11.2-4-16.8-0.8-5.6 3.2-8.8 8.8-8.8 14.4v290.4c0 5.6 3.2 11.2 8.8 14.4 5.6 3.2 12 2.4 16.8-0.8L648 533.6c4.8-2.4 7.2-8 7.2-12.8 0-4.8-3.2-9.6-7.2-12.8z", fill: "#FFFFFF" })
  );
};

exports.default = Video;

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Music = function Music() {
  return _react2.default.createElement(
    "svg",
    { height: "100%", width: "100%", viewBox: "0 0 1024 1024", version: "1.1", xmlns: "http://www.w3.org/2000/svg" },
    _react2.default.createElement("path", { d: "M160 32c-12 0-24.8 4.8-33.6 14.4S112 68 112 80v864c0 12 4.8 24.8 14.4 33.6 9.6 9.6 21.6 14.4 33.6 14.4h704c12 0 24.8-4.8 33.6-14.4 9.6-9.6 14.4-21.6 14.4-33.6V304L640 32H160z", fill: "#FF5562" }),
    _react2.default.createElement("path", { d: "M912 304H688c-12 0-24.8-4.8-33.6-14.4-9.6-8.8-14.4-21.6-14.4-33.6V32l272 272z", fill: "#FFBBC0" }),
    _react2.default.createElement("path", { d: "M669.6 491.2c0-1.6 0.8-4 0-6.4V369.6c0-4.8-2.4-8.8-5.6-12-4-3.2-8-4-12.8-3.2l-250.4 70.4c-7.2 1.6-12 7.2-12 14.4v275.2c-9.6-4-20.8-6.4-32.8-6.4-8.8 0-17.6 0.8-26.4 3.2-40.8 11.2-66.4 43.2-58.4 72.8 6.4 23.2 30.4 37.6 60.8 37.6 8.8 0 17.6-1.6 26.4-3.2 36.8-10.4 60.8-36.8 60-63.2 0.8-1.6 0.8-3.2 0.8-5.6V570.4l220-61.6v136c-9.6-4-20.8-6.4-32.8-6.4-8.8 0-17.6 0.8-26.4 3.2-40.8 11.2-66.4 43.2-58.4 72.8 6.4 23.2 30.4 37.6 60.8 37.6 8.8 0 17.6-0.8 26.4-3.2 36-9.6 60-36 60-62.4 0.8-1.6 0.8-3.2 0.8-5.6V491.2z m-250.4 48v-53.6L639.2 424v53.6l-220 61.6z", fill: "#FFFFFF" })
  );
};

exports.default = Music;

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Excel = function Excel() {
    return _react2.default.createElement(
        "svg",
        { height: "100%", width: "100%", viewBox: "0 0 1024 1024", version: "1.1", xmlns: "http://www.w3.org/2000/svg" },
        _react2.default.createElement("path", { d: "M728.345 64.223H224.056V321.34h68.687V133.019h378.844v187.78h186.917v569.777H292.743v-84.271h-0.715v-68.796h0.715v-53.046h-68.687v274.909h703.135V256.486z", fill: "#819292" }),
        _react2.default.createElement("path", { d: "M660.276 418.403h129.217v67.077H660.276zM660.276 578.386h129.217v67.077H660.276zM660.276 738.369h129.217v67.077H660.276z", fill: "#819292" }),
        _react2.default.createElement("path", { d: "M586.15 408.784h-68.687v328.725H292.028v68.796H586.15z", fill: "#50A135" }),
        _react2.default.createElement("path", { d: "M460.55 684.463V321.34H98.004v363.123H460.55z m-234.043-70.305l-85.787 0.722 93.843-110.912-93.843-113.045 81.805 0.225 53.747 63.523 53.747-63.523 81.805-0.225-93.843 113.044 93.843 110.912-85.787-0.722-49.765-59.948-49.765 59.949z", fill: "#50A135" }),
        _react2.default.createElement("path", { d: "M326.038 614.158l85.787 0.722-93.843-110.913 93.843-113.044-81.805 0.225-53.747 63.524-53.748-63.524-81.805-0.225 93.844 113.044L140.72 614.88l85.787-0.722 49.766-59.948z", fill: "#FFFFFF" })
    );
};

exports.default = Excel;

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Word = function Word() {
  return _react2.default.createElement(
    "svg",
    { height: "100%", width: "100%", viewBox: "0 0 1024 1024", version: "1.1", xmlns: "http://www.w3.org/2000/svg" },
    _react2.default.createElement("path", { d: "M727.949 64.223H223.977v250.866h68.644V132.802h378.605v187.187h186.801v567.978H292.621V677.066h-68.644v279.48H926.67V255.879z", fill: "#819292" }),
    _react2.default.createElement("path", { d: "M659.923 417.285h129.136v66.865H659.923zM659.923 576.763h129.136v66.865H659.923zM659.923 736.24h129.136v66.865H659.923z", fill: "#819292" }),
    _react2.default.createElement("path", { d: "M292.765 803.962h293.078V407.696h-68.644v327.687H292.765z", fill: "#287CB0" }),
    _react2.default.createElement("path", { d: "M460.322 677.066V315.089H98.004v361.977h362.318z m-239.598-53.143l-0.335-0.335v0.741h-60.063V367.827h60.063v159.446l58.178-58.123 0.254 0.254 1.112-1.111 58.005 57.95V367.827h60.063v255.644h-60.063v-0.568l-0.162 0.162-58.097-58.042-58.955 58.9z", fill: "#287CB0" }),
    _react2.default.createElement("path", { d: "M337.775 623.065l0.163-0.162v0.568h60.063V367.827h-60.063v158.416l-58.005-57.951-1.112 1.112-0.255-0.254-58.177 58.122V367.827h-60.063v256.501h60.063v-0.74l0.335 0.335 58.955-58.899z", fill: "#FFFFFF" })
  );
};

exports.default = Word;

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Zip = function Zip() {
  return _react2.default.createElement(
    "svg",
    { height: "100%", width: "100%", viewBox: "0 0 1024 1024", version: "1.1", xmlns: "http://www.w3.org/2000/svg" },
    _react2.default.createElement("path", { fill: "#333333", d: "M64.301 167.661v676.771h895.032V167.661H64.301z m70.641 76.259h288.575v101.565h-60.059v22.347H134.942V243.92z m0 200.172h228.516v123.911H134.942V444.092z m0 200.17h228.516v27.093h60.059v96.818H134.942V644.262z m753.751 123.912H600.118v-96.818h60.059v-27.093h228.516v123.911z m0-200.171H660.177V444.092h228.516v123.911z m0-200.171H660.177v-22.347h-60.059V243.92h288.575v123.912z" })
  );
};

exports.default = Zip;

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Loading = function Loading(_ref) {
    var show = _ref.show,
        text = _ref.text;
    return _react2.default.createElement(
        "div",
        { className: "loading-mask", hidden: !show },
        _react2.default.createElement(
            "div",
            { className: "center-loading" },
            _react2.default.createElement("div", { className: "loading icon icon-loading" }),
            _react2.default.createElement(
                "div",
                { className: "center-loading-text" },
                text
            )
        )
    );
};

exports.default = Loading;

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Merge = function Merge() {
  return _react2.default.createElement(
    "svg",
    { height: "100%", width: "100%", viewBox: "0 0 1024 1024", version: "1.1", xmlns: "http://www.w3.org/2000/svg" },
    _react2.default.createElement("path", { fill: "#515151", d: "M832.984615 866.461538c-110.276923-53.169231-189.046154-147.692308-228.430769-256-15.753846-39.384615-25.6-84.676923-29.538461-124.061538v-68.923077H787.692308c15.753846 0 27.569231-17.723077 15.753846-35.446154l-279.630769-334.769231c-9.846154-11.815385-31.507692-11.815385-39.384616 0l-271.753846 334.769231c-9.846154 11.815385 0 35.446154 15.753846 35.446154h214.646154v68.923077c-5.907692 41.353846-15.753846 86.646154-29.538461 124.061538-39.384615 108.307692-118.153846 202.830769-228.43077 256-15.753846 5.907692-21.661538 25.6-15.753846 39.384616l25.6 61.046154c7.876923 15.753846 25.6 21.661538 41.353846 11.815384 118.153846-57.107692 212.676923-147.692308 269.784616-256 59.076923 108.307692 151.630769 198.892308 271.753846 256 15.753846 7.876923 35.446154 5.907692 41.353846-11.815384l25.6-61.046154c11.815385-13.784615 3.938462-31.507692-11.815385-39.384616z" })
  );
};

exports.default = Merge;

/***/ })
/******/ ]);
//# sourceMappingURL=main.js.map