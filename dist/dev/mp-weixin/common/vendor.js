(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ 1:
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createApp = createApp;
exports.createComponent = createComponent;
exports.createPage = createPage;
exports.default = void 0;

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}
/**
 * Create a cached version of a pure function.
 */


function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}
/**
 * Camelize a hyphen-delimited string.
 */


var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {
    return c ? c.toUpperCase() : '';
  });
});
var HOOKS = ['invoke', 'success', 'fail', 'complete', 'returnValue'];
var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ? parentVal ? parentVal.concat(childVal) : Array.isArray(childVal) ? childVal : [childVal] : parentVal;
  return res ? dedupeHooks(res) : res;
}

function dedupeHooks(hooks) {
  var res = [];

  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }

  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);

  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }

  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (_typeof(obj) === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;

  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];

    if (promise) {
      promise = Promise.then(wrapperHook(hook));
    } else {
      var res = hook(data);

      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }

      if (res === false) {
        return {
          then: function then() {}
        };
      }
    }
  }

  return promise || {
    then: function then(callback) {
      return callback(data);
    }
  };
}

function wrapperOptions(interceptor) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];

      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];

  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }

  var interceptor = scopedInterceptors[method];

  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }

  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];

  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }

  return interceptor;
}

function invokeApi(method, api, options) {
  for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
    params[_key - 3] = arguments[_key];
  }

  var interceptor = getApiInterceptorHooks(method);

  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }

  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }

    return res.then(function (res) {
      return res[1];
    }).catch(function (res) {
      return res[0];
    });
  }
};
var SYNC_API_RE = /^\$|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;
var CONTEXT_API_RE = /^create|Manager$/;
var ASYNC_API = ['createBLEConnection'];
var CALLBACK_API_RE = /^on/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name);
}

function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).catch(function (err) {
    return [err];
  });
}

function shouldPromise(name) {
  if (isContextApi(name) || isSyncApi(name) || isCallbackApi(name)) {
    return false;
  }

  return true;
}
/* eslint-disable no-extend-native */


if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(function (value) {
      return promise.resolve(callback()).then(function () {
        return value;
      });
    }, function (reason) {
      return promise.resolve(callback()).then(function () {
        throw reason;
      });
    });
  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }

  return function promiseApi() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      params[_key2 - 1] = arguments[_key2];
    }

    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }

    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject
      })].concat(params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {
  var _wx$getSystemInfoSync = wx.getSystemInfoSync(),
      platform = _wx$getSystemInfoSync.platform,
      pixelRatio = _wx$getSystemInfoSync.pixelRatio,
      windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni


  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);

  if (number === 0) {
    return 0;
  }

  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);

  if (result < 0) {
    result = -result;
  }

  result = Math.floor(result + EPS);

  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      return 1;
    } else {
      return 0.5;
    }
  }

  return number < 0 ? -result : result;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor
};
var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  interceptors: interceptors,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor
});
var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);

    if (isNaN(currentIndex)) {
      return;
    }

    var urls = fromArgs.urls;

    if (!Array.isArray(urls)) {
      return;
    }

    var len = urls.length;

    if (!len) {
      return;
    }

    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }

    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(function (item, index) {
        return index < currentIndex ? item !== urls[currentIndex] : true;
      });
    } else {
      fromArgs.current = urls[0];
    }

    return {
      indicator: false,
      loop: false
    };
  }
};

function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom
    };
  }
}

var protocols = {
  previewImage: previewImage,
  getSystemInfo: {
    returnValue: addSafeAreaInsets
  },
  getSystemInfoSync: {
    returnValue: addSafeAreaInsets
  }
};
var todos = ['vibrate'];
var canIUses = [];
var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {
  var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

  if (isPlainObject(fromArgs)) {
    // 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值

    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }

    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];

        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }

        if (!keyOption) {
          // 不支持的参数
          console.warn("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F ".concat(methodName, "\u6682\u4E0D\u652F\u6301").concat(key));
        } else if (isStr(keyOption)) {
          // 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {
          // {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }

    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }

  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {
  var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

  if (isFn(protocols.returnValue)) {
    // 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }

  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];

    if (!protocol) {
      // 暂不支持的 api
      return function () {
        console.error("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F \u6682\u4E0D\u652F\u6301".concat(methodName));
      };
    }

    return function (arg1, arg2) {
      // 目前 api 最多两个参数
      var options = protocol;

      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);
      var args = [arg1];

      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }

      var returnValue = wx[options.name || methodName].apply(wx, args);

      if (isSyncApi(methodName)) {
        // 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }

      return returnValue;
    };
  }

  return method;
}

var todoApis = Object.create(null);
var TODOS = ['onTabBarMidButtonTap', 'subscribePush', 'unsubscribePush', 'onPush', 'offPush', 'share'];

function createTodoApi(name) {
  return function todoApi(_ref) {
    var fail = _ref.fail,
        complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail:\u6682\u4E0D\u652F\u6301 ").concat(name, " \u65B9\u6CD5")
    };
    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});
var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin']
};

function getProvider(_ref2) {
  var service = _ref2.service,
      success = _ref2.success,
      fail = _ref2.fail,
      complete = _ref2.complete;
  var res = false;

  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service]
    };
    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail:服务[' + service + ']不存在'
    };
    isFn(fail) && fail(res);
  }

  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider
});

var getEmitter = function () {
  if (typeof getUniEmitter === 'function') {
    /* eslint-disable no-undef */
    return getUniEmitter;
  }

  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }

    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}

function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}

function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}

function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit
});
var api = /*#__PURE__*/Object.freeze({
  __proto__: null
});
var MPPage = Page;
var MPComponent = Component;
var customizeRE = /:/g;
var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;

  mpInstance.triggerEvent = function (event) {
    for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
      args[_key3 - 1] = arguments[_key3];
    }

    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];

  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);

      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }

      return oldHook.apply(this, args);
    };
  }
}

Page = function Page() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('onLoad', options);
  return MPPage(options);
};

Component = function Component() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('created', options);
  return MPComponent(options);
};

var PAGE_EVENT_HOOKS = ['onPullDownRefresh', 'onReachBottom', 'onShareAppMessage', 'onPageScroll', 'onResize', 'onTabItemTap'];

function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }

    if (vueOptions.super && vueOptions.super.options && Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }

    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }

  var mixins = vueOptions.mixins;

  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {
      return hasHook(hook, mixin);
    });
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;

  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
    vueOptions = VueComponent.extendOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }

  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });
  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions['behaviors'];
  var vueExtends = vueOptions['extends'];
  var vueMixins = vueOptions['mixins'];
  var vueProps = vueOptions['props'];

  if (!vueProps) {
    vueOptions['props'] = vueProps = [];
  }

  var behaviors = [];

  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));

      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps['name'] = {
            type: String,
            default: ''
          };
          vueProps['value'] = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: ''
          };
        }
      }
    });
  }

  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(initBehavior({
      properties: initProperties(vueExtends.props, true)
    }));
  }

  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(initBehavior({
          properties: initProperties(vueMixin.props, true)
        }));
      }
    });
  }

  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }

  return type;
}

function initProperties(props) {
  var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};

  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: ''
    };
    properties.vueSlots = {
      // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots
        });
      }
    };
  }

  if (Array.isArray(props)) {
    // ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key)
      };
    });
  } else if (isPlainObject(props)) {
    // {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];

      if (isPlainObject(opts)) {
        // title:{type:String,default:''}
        var value = opts['default'];

        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);
        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key)
        };
      } else {
        // content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key)
        };
      }
    });
  }

  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;
  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];

    if (dataPath || typeof value !== 'undefined') {
      // ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];
      var vFor = dataPath ? vm.__get_value(dataPath, context) : context;

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
     *[
     *    ['data.items', 'data.id', item.data.id],
     *    ['metas', 'id', meta.id]
     *],
     *[
     *    ['data.items', 'data.id', item.data.id],
     *    ['metas', 'id', meta.id]
     *],
     *'test'
     */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {
          // model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {
            // $event
            extraObj['$' + index] = event;
          } else if (dataPath.indexOf('$event.') === 0) {
            // $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};

  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }

  return obj;
}

function processEventArgs(vm, event) {
  var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
  var isCustom = arguments.length > 4 ? arguments[4] : undefined;
  var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象

  if (isCustom) {
    // 自定义事件
    isCustomMPEvent = event.currentTarget && event.currentTarget.dataset && event.currentTarget.dataset.comType === 'wx';

    if (!args.length) {
      // 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }

      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);
  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {
        // input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {
          // wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });
  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType || optType === 'regionchange' && (eventType === 'begin' || eventType === 'end');
}

function handleEvent(event) {
  var _this = this;

  event = wrapper$1(event); // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]

  var dataset = (event.currentTarget || event.target).dataset;

  if (!dataset) {
    return console.warn("\u4E8B\u4EF6\u4FE1\u606F\u4E0D\u5B58\u5728");
  }

  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰

  if (!eventOpts) {
    return console.warn("\u4E8B\u4EF6\u4FE1\u606F\u4E0D\u5B58\u5728");
  } // [['handle',[1,2,a]],['handle1',[1,2,a]]]


  var eventType = event.type;
  var ret = [];
  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];
    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];

        if (methodName) {
          var handlerCtx = _this.$vm;

          if (handlerCtx.$options.generic && handlerCtx.$parent && handlerCtx.$parent.$parent) {
            // mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = handlerCtx.$parent.$parent;
          }

          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx, processEventArgs(_this.$vm, event, eventArray[1], eventArray[2], isCustom, methodName));
            return;
          }

          var handler = handlerCtx[methodName];

          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }

          if (isOnce) {
            if (handler.once) {
              return;
            }

            handler.once = true;
          }

          ret.push(handler.apply(handlerCtx, processEventArgs(_this.$vm, event, eventArray[1], eventArray[2], isCustom, methodName)));
        }
      });
    }
  });

  if (eventType === 'input' && ret.length === 1 && typeof ret[0] !== 'undefined') {
    return ret[0];
  }
}

var hooks = ['onShow', 'onHide', 'onError', 'onPageNotFound'];

function parseBaseApp(vm, _ref3) {
  var mocks = _ref3.mocks,
      initRefs = _ref3.initRefs;

  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;
      this.$mp = _defineProperty({
        data: {}
      }, this.mpType, this.$options.mpInstance);
      this.$scope = this.$options.mpInstance;
      delete this.$options.mpType;
      delete this.$options.mpInstance;

      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    }
  });

  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {
        // 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }

      {
        if (!wx.canIUse('nextTick')) {
          // 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }
      this.$vm = vm;
      this.$vm.$mp = {
        app: this
      };
      this.$vm.$scope = this; // vm 上也挂载 globalData

      this.$vm.globalData = this.globalData;
      this.$vm._isMounted = true;

      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    }
  }; // 兼容旧版本 globalData

  appOptions.globalData = vm.$options.globalData || {}; // 将 methods 中的方法挂在 getApp() 中

  var methods = vm.$options.methods;

  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initHooks(appOptions, hooks);
  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children; // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)

  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];

    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  } // 反向递归查找


  var parentVm;

  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);

    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      var components = mpInstance.selectAllComponents('.vue-ref');
      components.forEach(function (component) {
        var ref = component.dataset.ref;
        $refs[ref] = component.$vm || component;
      });
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;

        if (!$refs[ref]) {
          $refs[ref] = [];
        }

        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    }
  });
}

function handleLink(event) {
  var _ref4 = event.detail || event.value,
      vuePid = _ref4.vuePid,
      vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)


  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs
  });
}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

function parseBaseComponent(vueComponentOptions) {
  var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      isPage = _ref5.isPage,
      initRelation = _ref5.initRelation;

  var _initVueComponent = initVueComponent(_vue.default, vueComponentOptions),
      _initVueComponent2 = _slicedToArray(_initVueComponent, 2),
      VueComponent = _initVueComponent2[0],
      vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true
  }, vueOptions.options || {});

  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin']['options']) {
      Object.assign(options, vueOptions['mp-weixin']['options']);
    }
  }
  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;
        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties
        };
        initVueIds(properties.vueId, this); // 处理父子关系

        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options
        }); // 初始化 vue 实例

        this.$vm = new VueComponent(options); // 处理$slots,$scopedSlots（暂不支持动态变化$slots）

        initSlots(this.$vm, properties.vueSlots); // 触发首次 setData

        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;

          this.$vm.__call_hook('mounted');

          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      }
    },
    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      }
    },
    methods: {
      __l: handleLink,
      __e: handleEvent
    }
  };

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }

  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation
  });
}

var hooks$1 = ['onShow', 'onHide', 'onUnload'];
hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6) {
  var isPage = _ref6.isPage,
      initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);
  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (args) {
    this.$vm.$mp.query = args; // 兼容 mpvue

    this.$vm.__call_hook('onLoad', args);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation
  });
}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});
canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name : canIUseApi;

  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});
var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (target[name]) {
        return target[name];
      }

      if (baseApi[name]) {
        return baseApi[name];
      }

      if (api[name]) {
        return promisify(name, api[name]);
      }

      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }

        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }

      if (eventApi[name]) {
        return eventApi[name];
      }

      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }

      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    }
  });
} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });
  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }
  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });
  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });
  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;
var uni$1 = uni;
var _default = uni$1;
exports.default = _default;

/***/ }),

/***/ 14:
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 15:
/*!***************************!*\
  !*** ./src/cool/index.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "CoolUI", {
  enumerable: true,
  get: function get() {
    return _ui.default;
  }
});

var _ui = _interopRequireDefault(__webpack_require__(/*! ./ui */ 16));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),

/***/ 16:
/*!******************************!*\
  !*** ./src/cool/ui/index.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

__webpack_require__(/*! ./assets/css/index.scss */ 17);

// 消息提示
function Message() {
  var _this = this;

  this.$message = function (opts) {
    _this.$refs['cl-message'].open(opts);
  };
} // 全局注入


var _default = {
  mounted: function mounted() {
    Message.bind(this)();
  }
};
exports.default = _default;

/***/ }),

/***/ 17:
/*!*******************************************!*\
  !*** ./src/cool/ui/assets/css/index.scss ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ }),

/***/ 2:
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2020 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
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
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
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
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    {
      if(vm.$scope && vm.$scope.is){
        return vm.$scope.is
      }
    }
    if (vm.$root === vm) {
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  // fixed by xxxxxx (nvue vuex)
  /* eslint-disable no-undef */
  if(typeof SharedObject !== 'undefined'){
    this.id = SharedObject.uid++;
  } else {
    this.id = uid++;
  }
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = typeof SharedObject !== 'undefined' ? SharedObject : {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i++, i)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu'){//百度 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    vm.mpHost !== 'mp-toutiao' && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    vm.mpHost !== 'mp-toutiao' && initProvide(vm); // resolve provide after data/props
    vm.mpHost !== 'mp-toutiao' && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue != pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);
  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  vm.mpHost !== 'mp-toutiao' && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err) {
    console.error(err);
    /* eslint-disable no-undef */
    var app = getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string,number
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onError',
    //Page
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 201:
/*!*********************************!*\
  !*** ./src/assets/icon/all.png ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 202:
/*!*************************************!*\
  !*** ./src/assets/icon/balance.png ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 203:
/*!***********************************!*\
  !*** ./src/assets/icon/stats.png ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 204:
/*!***************************************!*\
  !*** ./src/assets/icon/bank-card.png ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 207:
/*!**************************************!*\
  !*** ./src/assets/images/avatar.jpg ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/jpeg;base64,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"

/***/ }),

/***/ 22:
/*!**********************************!*\
  !*** ./src/assets/icon/logo.png ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 275:
/*!************************************!*\
  !*** ./src/cool/ui/utils/index.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isArray = isArray;
exports.isObject = isObject;
exports.isFunction = isFunction;
exports.isString = isString;
exports.isNull = isNull;
exports.isBoolean = isBoolean;
exports.isNumber = isNumber;
exports.isPromise = isPromise;
exports.isEmpty = isEmpty;
exports.compareValue = compareValue;
exports.cloneDeep = cloneDeep;
exports.getParent = getParent;
exports.diffForm = diffForm;
exports.getCurrentColor = getCurrentColor;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function isArray(value) {
  if (typeof Array.isArray === 'function') {
    return Array.isArray(value);
  } else {
    return Object.prototype.toString.call(value) === '[object Array]';
  }
}

function isObject(value) {
  return Object.prototype.toString.call(value) === '[object Object]';
}

function isFunction(value) {
  return typeof value === 'function';
}

function isString(value) {
  return typeof value === 'string';
}

function isNull(value) {
  return !value && value !== 0;
}

function isBoolean(value) {
  return typeof value === 'boolean';
}

function isNumber(value) {
  return typeof value === 'number' && !isNaN(value);
}

function isPromise(obj) {
  obj !== null && (_typeof(obj) === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function isEmpty(value) {
  if (isArray(value)) {
    return value.length === 0;
  }

  if (isObject(value)) {
    return Object.keys(value).length === 0;
  }

  return value === '' || value === undefined || value === null;
}

function compareValue(a, b) {
  return String(a) === String(b);
}

function cloneDeep(v) {
  var d = v;

  if (isObject(v)) {
    for (var k in v) {
      if (v.hasOwnProperty && v.hasOwnProperty(k)) {
        if (v[k] && _typeof(v[k]) === 'object') {
          d[k] = cloneDeep(v[k]);
        } else {
          d[k] = v[k];
        }
      }
    }
  } else if (isArray(v)) {
    d = v.map(cloneDeep);
  }

  return d;
}
/**
 * 获取父级节点
 * @param {*} name componentName
 * @param {*} keys 保留的参数
 */


function getParent(name, keys) {
  var parent = this.$parent;

  while (parent) {
    if (parent.$options.componentName !== name) {
      parent = parent.$parent;
    } else {
      return keys.reduce(function (result, key) {
        result[key] = parent[key];
        return result;
      }, {});
    }
  }

  return null;
}
/**
 * 检查数据变化的表单
 *
 * @param {*} d1 新数据
 * @param {*} d2 旧数据
 */


function diffForm(d1, d2) {
  var deep = function deep(d1, d2) {
    if (isArray(d2)) {
      if (isArray(d1)) {
        if (d2.length === d1.length) {
          return !d2.some(function (v, i) {
            return !deep(d2[i], d1[i]);
          });
        }
      }

      return false;
    }

    if (isObject(d2)) {
      if (isObject(d1)) {
        var flag = true;

        for (var i in d2) {
          flag = deep(d2[i], d1[i]);

          if (!flag) {
            return false;
          }
        }

        return true;
      }

      return false;
    }

    if (isString(d2)) {
      return d1 === d2;
    }

    if (isNumber(d2)) {
      return d1 === d2;
    }

    if (isBoolean(d2)) {
      return d1 === d2;
    }
  };

  return Object.keys(d2).filter(function (k) {
    return !deep(d1[k], d2[k]);
  });
}
/**
 * 获取当前颜色
 *
 * @param {*} { color, max, value }
 */


function getCurrentColor(_ref) {
  var color = _ref.color,
      max = _ref.max,
      value = _ref.value;

  if (isString(color)) {
    return color;
  } else {
    var colorArray = color.map(function (item, index) {
      if (isString(item)) {
        return {
          color: item,
          value: (index + 1) * (max / color.length)
        };
      }

      return item;
    }).sort(function (a, b) {
      return a.value - b.value;
    });

    for (var i = 0; i < colorArray.length; i++) {
      if (colorArray[i].value >= value) {
        return colorArray[i].color;
      }
    }

    return colorArray[colorArray.length - 1].color;
  }
}

/***/ }),

/***/ 3:
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 351:
/*!**********************************************!*\
  !*** ./src/cool/ui/utils/async-validator.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}
/* eslint no-console:0 */


var formatRegExp = /%[sdj%]/g;

var warning = function warning() {}; // don't print warning message when in production env or node runtime


if (typeof process !== 'undefined' && Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}) && "development" !== 'production' && typeof window !== 'undefined' && typeof document !== 'undefined') {
  warning = function warning(type, errors) {
    if (typeof console !== 'undefined' && console.warn) {
      if (errors.every(function (e) {
        return typeof e === 'string';
      })) {
        console.warn(type, errors);
      }
    }
  };
}

function convertFieldsError(errors) {
  if (!errors || !errors.length) return null;
  var fields = {};
  errors.forEach(function (error) {
    var field = error.field;
    fields[field] = fields[field] || [];
    fields[field].push(error);
  });
  return fields;
}

function format() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  var i = 1;
  var f = args[0];
  var len = args.length;

  if (typeof f === 'function') {
    return f.apply(null, args.slice(1));
  }

  if (typeof f === 'string') {
    var str = String(f).replace(formatRegExp, function (x) {
      if (x === '%%') {
        return '%';
      }

      if (i >= len) {
        return x;
      }

      switch (x) {
        case '%s':
          return String(args[i++]);

        case '%d':
          return Number(args[i++]);

        case '%j':
          try {
            return JSON.stringify(args[i++]);
          } catch (_) {
            return '[Circular]';
          }

          break;

        default:
          return x;
      }
    });

    for (var arg = args[i]; i < len; arg = args[++i]) {
      str += ' ' + arg;
    }

    return str;
  }

  return f;
}

function isNativeStringType(type) {
  return type === 'string' || type === 'url' || type === 'hex' || type === 'email' || type === 'pattern';
}

function isEmptyValue(value, type) {
  if (value === undefined || value === null) {
    return true;
  }

  if (type === 'array' && Array.isArray(value) && !value.length) {
    return true;
  }

  if (isNativeStringType(type) && typeof value === 'string' && !value) {
    return true;
  }

  return false;
}

function asyncParallelArray(arr, func, callback) {
  var results = [];
  var total = 0;
  var arrLength = arr.length;

  function count(errors) {
    results.push.apply(results, errors);
    total++;

    if (total === arrLength) {
      callback(results);
    }
  }

  arr.forEach(function (a) {
    func(a, count);
  });
}

function asyncSerialArray(arr, func, callback) {
  var index = 0;
  var arrLength = arr.length;

  function next(errors) {
    if (errors && errors.length) {
      callback(errors);
      return;
    }

    var original = index;
    index = index + 1;

    if (original < arrLength) {
      func(arr[original], next);
    } else {
      callback([]);
    }
  }

  next([]);
}

function flattenObjArr(objArr) {
  var ret = [];
  Object.keys(objArr).forEach(function (k) {
    ret.push.apply(ret, objArr[k]);
  });
  return ret;
}

function asyncMap(objArr, option, func, callback) {
  if (option.first) {
    var _pending = new Promise(function (resolve, reject) {
      var next = function next(errors) {
        callback(errors);
        return errors.length ? reject({
          errors: errors,
          fields: convertFieldsError(errors)
        }) : resolve();
      };

      var flattenArr = flattenObjArr(objArr);
      asyncSerialArray(flattenArr, func, next);
    });

    _pending['catch'](function (e) {
      return e;
    });

    return _pending;
  }

  var firstFields = option.firstFields || [];

  if (firstFields === true) {
    firstFields = Object.keys(objArr);
  }

  var objArrKeys = Object.keys(objArr);
  var objArrLength = objArrKeys.length;
  var total = 0;
  var results = [];
  var pending = new Promise(function (resolve, reject) {
    var next = function next(errors) {
      results.push.apply(results, errors);
      total++;

      if (total === objArrLength) {
        callback(results);
        return results.length ? reject({
          errors: results,
          fields: convertFieldsError(results)
        }) : resolve();
      }
    };

    objArrKeys.forEach(function (key) {
      var arr = objArr[key];

      if (firstFields.indexOf(key) !== -1) {
        asyncSerialArray(arr, func, next);
      } else {
        asyncParallelArray(arr, func, next);
      }
    });
  });
  pending['catch'](function (e) {
    return e;
  });
  return pending;
}

function complementError(rule) {
  return function (oe) {
    if (oe && oe.message) {
      oe.field = oe.field || rule.fullField;
      return oe;
    }

    return {
      message: typeof oe === 'function' ? oe() : oe,
      field: oe.field || rule.fullField
    };
  };
}

function deepMerge(target, source) {
  if (source) {
    for (var s in source) {
      if (source.hasOwnProperty(s)) {
        var value = source[s];

        if (_typeof(value) === 'object' && _typeof(target[s]) === 'object') {
          target[s] = _extends({}, target[s], {}, value);
        } else {
          target[s] = value;
        }
      }
    }
  }

  return target;
}
/**
 *  Rule for validating required fields.
 *
 *  @param rule The validation rule.
 *  @param value The value of the field on the source object.
 *  @param source The source object being validated.
 *  @param errors An array of errors that this rule may add
 *  validation errors to.
 *  @param options The validation options.
 *  @param options.messages The validation messages.
 */


function required(rule, value, source, errors, options, type) {
  if (rule.required && (!source.hasOwnProperty(rule.field) || isEmptyValue(value, type || rule.type))) {
    errors.push(format(options.messages.required, rule.fullField));
  }
}
/**
 *  Rule for validating whitespace.
 *
 *  @param rule The validation rule.
 *  @param value The value of the field on the source object.
 *  @param source The source object being validated.
 *  @param errors An array of errors that this rule may add
 *  validation errors to.
 *  @param options The validation options.
 *  @param options.messages The validation messages.
 */


function whitespace(rule, value, source, errors, options) {
  if (/^\s+$/.test(value) || value === '') {
    errors.push(format(options.messages.whitespace, rule.fullField));
  }
}
/* eslint max-len:0 */


var pattern = {
  // http://emailregex.com/
  email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  url: new RegExp("^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$", 'i'),
  hex: /^#?([a-f0-9]{6}|[a-f0-9]{3})$/i
};
var types = {
  integer: function integer(value) {
    return types.number(value) && parseInt(value, 10) === value;
  },
  float: function float(value) {
    return types.number(value) && !types.integer(value);
  },
  array: function array(value) {
    return Array.isArray(value);
  },
  regexp: function regexp(value) {
    if (value instanceof RegExp) {
      return true;
    }

    try {
      return !!new RegExp(value);
    } catch (e) {
      return false;
    }
  },
  date: function date(value) {
    return typeof value.getTime === 'function' && typeof value.getMonth === 'function' && typeof value.getYear === 'function';
  },
  number: function number(value) {
    if (isNaN(value)) {
      return false;
    }

    return typeof value === 'number';
  },
  object: function object(value) {
    return _typeof(value) === 'object' && !types.array(value);
  },
  method: function method(value) {
    return typeof value === 'function';
  },
  email: function email(value) {
    return typeof value === 'string' && !!value.match(pattern.email) && value.length < 255;
  },
  url: function url(value) {
    return typeof value === 'string' && !!value.match(pattern.url);
  },
  hex: function hex(value) {
    return typeof value === 'string' && !!value.match(pattern.hex);
  }
};
/**
 *  Rule for validating the type of a value.
 *
 *  @param rule The validation rule.
 *  @param value The value of the field on the source object.
 *  @param source The source object being validated.
 *  @param errors An array of errors that this rule may add
 *  validation errors to.
 *  @param options The validation options.
 *  @param options.messages The validation messages.
 */

function type(rule, value, source, errors, options) {
  if (rule.required && value === undefined) {
    required(rule, value, source, errors, options);
    return;
  }

  var custom = ['integer', 'float', 'array', 'regexp', 'object', 'method', 'email', 'number', 'date', 'url', 'hex'];
  var ruleType = rule.type;

  if (custom.indexOf(ruleType) > -1) {
    if (!types[ruleType](value)) {
      errors.push(format(options.messages.types[ruleType], rule.fullField, rule.type));
    } // straight typeof check

  } else if (ruleType && _typeof(value) !== rule.type) {
    errors.push(format(options.messages.types[ruleType], rule.fullField, rule.type));
  }
}
/**
 *  Rule for validating minimum and maximum allowed values.
 *
 *  @param rule The validation rule.
 *  @param value The value of the field on the source object.
 *  @param source The source object being validated.
 *  @param errors An array of errors that this rule may add
 *  validation errors to.
 *  @param options The validation options.
 *  @param options.messages The validation messages.
 */


function range(rule, value, source, errors, options) {
  var len = typeof rule.len === 'number';
  var min = typeof rule.min === 'number';
  var max = typeof rule.max === 'number'; // 正则匹配码点范围从U+010000一直到U+10FFFF的文字（补充平面Supplementary Plane）

  var spRegexp = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
  var val = value;
  var key = null;
  var num = typeof value === 'number';
  var str = typeof value === 'string';
  var arr = Array.isArray(value);

  if (num) {
    key = 'number';
  } else if (str) {
    key = 'string';
  } else if (arr) {
    key = 'array';
  } // if the value is not of a supported type for range validation
  // the validation rule rule should use the
  // type property to also test for a particular type


  if (!key) {
    return false;
  }

  if (arr) {
    val = value.length;
  }

  if (str) {
    // 处理码点大于U+010000的文字length属性不准确的bug，如"𠮷𠮷𠮷".lenght !== 3
    val = value.replace(spRegexp, '_').length;
  }

  if (len) {
    if (val !== rule.len) {
      errors.push(format(options.messages[key].len, rule.fullField, rule.len));
    }
  } else if (min && !max && val < rule.min) {
    errors.push(format(options.messages[key].min, rule.fullField, rule.min));
  } else if (max && !min && val > rule.max) {
    errors.push(format(options.messages[key].max, rule.fullField, rule.max));
  } else if (min && max && (val < rule.min || val > rule.max)) {
    errors.push(format(options.messages[key].range, rule.fullField, rule.min, rule.max));
  }
}

var ENUM = 'enum';
/**
 *  Rule for validating a value exists in an enumerable list.
 *
 *  @param rule The validation rule.
 *  @param value The value of the field on the source object.
 *  @param source The source object being validated.
 *  @param errors An array of errors that this rule may add
 *  validation errors to.
 *  @param options The validation options.
 *  @param options.messages The validation messages.
 */

function enumerable(rule, value, source, errors, options) {
  rule[ENUM] = Array.isArray(rule[ENUM]) ? rule[ENUM] : [];

  if (rule[ENUM].indexOf(value) === -1) {
    errors.push(format(options.messages[ENUM], rule.fullField, rule[ENUM].join(', ')));
  }
}
/**
 *  Rule for validating a regular expression pattern.
 *
 *  @param rule The validation rule.
 *  @param value The value of the field on the source object.
 *  @param source The source object being validated.
 *  @param errors An array of errors that this rule may add
 *  validation errors to.
 *  @param options The validation options.
 *  @param options.messages The validation messages.
 */


function pattern$1(rule, value, source, errors, options) {
  if (rule.pattern) {
    if (rule.pattern instanceof RegExp) {
      // if a RegExp instance is passed, reset `lastIndex` in case its `global`
      // flag is accidentally set to `true`, which in a validation scenario
      // is not necessary and the result might be misleading
      rule.pattern.lastIndex = 0;

      if (!rule.pattern.test(value)) {
        errors.push(format(options.messages.pattern.mismatch, rule.fullField, value, rule.pattern));
      }
    } else if (typeof rule.pattern === 'string') {
      var _pattern = new RegExp(rule.pattern);

      if (!_pattern.test(value)) {
        errors.push(format(options.messages.pattern.mismatch, rule.fullField, value, rule.pattern));
      }
    }
  }
}

var rules = {
  required: required,
  whitespace: whitespace,
  type: type,
  range: range,
  enum: enumerable,
  pattern: pattern$1
};
/**
 *  Performs validation for string types.
 *
 *  @param rule The validation rule.
 *  @param value The value of the field on the source object.
 *  @param callback The callback function.
 *  @param source The source object being validated.
 *  @param options The validation options.
 *  @param options.messages The validation messages.
 */

function string(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value, 'string') && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options, 'string');

    if (!isEmptyValue(value, 'string')) {
      rules.type(rule, value, source, errors, options);
      rules.range(rule, value, source, errors, options);
      rules.pattern(rule, value, source, errors, options);

      if (rule.whitespace === true) {
        rules.whitespace(rule, value, source, errors, options);
      }
    }
  }

  callback(errors);
}
/**
 *  Validates a function.
 *
 *  @param rule The validation rule.
 *  @param value The value of the field on the source object.
 *  @param callback The callback function.
 *  @param source The source object being validated.
 *  @param options The validation options.
 *  @param options.messages The validation messages.
 */


function method(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (value !== undefined) {
      rules.type(rule, value, source, errors, options);
    }
  }

  callback(errors);
}
/**
 *  Validates a number.
 *
 *  @param rule The validation rule.
 *  @param value The value of the field on the source object.
 *  @param callback The callback function.
 *  @param source The source object being validated.
 *  @param options The validation options.
 *  @param options.messages The validation messages.
 */


function number(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (value === '') {
      value = undefined;
    }

    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (value !== undefined) {
      rules.type(rule, value, source, errors, options);
      rules.range(rule, value, source, errors, options);
    }
  }

  callback(errors);
}
/**
 *  Validates a boolean.
 *
 *  @param rule The validation rule.
 *  @param value The value of the field on the source object.
 *  @param callback The callback function.
 *  @param source The source object being validated.
 *  @param options The validation options.
 *  @param options.messages The validation messages.
 */


function _boolean(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (value !== undefined) {
      rules.type(rule, value, source, errors, options);
    }
  }

  callback(errors);
}
/**
 *  Validates the regular expression type.
 *
 *  @param rule The validation rule.
 *  @param value The value of the field on the source object.
 *  @param callback The callback function.
 *  @param source The source object being validated.
 *  @param options The validation options.
 *  @param options.messages The validation messages.
 */


function regexp(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (!isEmptyValue(value)) {
      rules.type(rule, value, source, errors, options);
    }
  }

  callback(errors);
}
/**
 *  Validates a number is an integer.
 *
 *  @param rule The validation rule.
 *  @param value The value of the field on the source object.
 *  @param callback The callback function.
 *  @param source The source object being validated.
 *  @param options The validation options.
 *  @param options.messages The validation messages.
 */


function integer(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (value !== undefined) {
      rules.type(rule, value, source, errors, options);
      rules.range(rule, value, source, errors, options);
    }
  }

  callback(errors);
}
/**
 *  Validates a number is a floating point number.
 *
 *  @param rule The validation rule.
 *  @param value The value of the field on the source object.
 *  @param callback The callback function.
 *  @param source The source object being validated.
 *  @param options The validation options.
 *  @param options.messages The validation messages.
 */


function floatFn(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (value !== undefined) {
      rules.type(rule, value, source, errors, options);
      rules.range(rule, value, source, errors, options);
    }
  }

  callback(errors);
}
/**
 *  Validates an array.
 *
 *  @param rule The validation rule.
 *  @param value The value of the field on the source object.
 *  @param callback The callback function.
 *  @param source The source object being validated.
 *  @param options The validation options.
 *  @param options.messages The validation messages.
 */


function array(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value, 'array') && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options, 'array');

    if (!isEmptyValue(value, 'array')) {
      rules.type(rule, value, source, errors, options);
      rules.range(rule, value, source, errors, options);
    }
  }

  callback(errors);
}
/**
 *  Validates an object.
 *
 *  @param rule The validation rule.
 *  @param value The value of the field on the source object.
 *  @param callback The callback function.
 *  @param source The source object being validated.
 *  @param options The validation options.
 *  @param options.messages The validation messages.
 */


function object(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (value !== undefined) {
      rules.type(rule, value, source, errors, options);
    }
  }

  callback(errors);
}

var ENUM$1 = 'enum';
/**
 *  Validates an enumerable list.
 *
 *  @param rule The validation rule.
 *  @param value The value of the field on the source object.
 *  @param callback The callback function.
 *  @param source The source object being validated.
 *  @param options The validation options.
 *  @param options.messages The validation messages.
 */

function enumerable$1(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (value !== undefined) {
      rules[ENUM$1](rule, value, source, errors, options);
    }
  }

  callback(errors);
}
/**
 *  Validates a regular expression pattern.
 *
 *  Performs validation when a rule only contains
 *  a pattern property but is not declared as a string type.
 *
 *  @param rule The validation rule.
 *  @param value The value of the field on the source object.
 *  @param callback The callback function.
 *  @param source The source object being validated.
 *  @param options The validation options.
 *  @param options.messages The validation messages.
 */


function pattern$2(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value, 'string') && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (!isEmptyValue(value, 'string')) {
      rules.pattern(rule, value, source, errors, options);
    }
  }

  callback(errors);
}

function date(rule, value, callback, source, options) {
  // console.log('integer rule called %j', rule);
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field); // console.log('validate on %s value', value);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (!isEmptyValue(value)) {
      var dateObject;

      if (typeof value === 'number') {
        dateObject = new Date(value);
      } else {
        dateObject = value;
      }

      rules.type(rule, dateObject, source, errors, options);

      if (dateObject) {
        rules.range(rule, dateObject.getTime(), source, errors, options);
      }
    }
  }

  callback(errors);
}

function required$1(rule, value, callback, source, options) {
  var errors = [];
  var type = Array.isArray(value) ? 'array' : _typeof(value);
  rules.required(rule, value, source, errors, options, type);
  callback(errors);
}

function type$1(rule, value, callback, source, options) {
  var ruleType = rule.type;
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value, ruleType) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options, ruleType);

    if (!isEmptyValue(value, ruleType)) {
      rules.type(rule, value, source, errors, options);
    }
  }

  callback(errors);
}
/**
 *  Performs validation for any type.
 *
 *  @param rule The validation rule.
 *  @param value The value of the field on the source object.
 *  @param callback The callback function.
 *  @param source The source object being validated.
 *  @param options The validation options.
 *  @param options.messages The validation messages.
 */


function any(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);
  }

  callback(errors);
}

var validators = {
  string: string,
  method: method,
  number: number,
  boolean: _boolean,
  regexp: regexp,
  integer: integer,
  float: floatFn,
  array: array,
  object: object,
  enum: enumerable$1,
  pattern: pattern$2,
  date: date,
  url: type$1,
  hex: type$1,
  email: type$1,
  required: required$1,
  any: any
};

function newMessages() {
  return {
    default: 'Validation error on field %s',
    required: '%s is required',
    enum: '%s must be one of %s',
    whitespace: '%s cannot be empty',
    date: {
      format: '%s date %s is invalid for format %s',
      parse: '%s date could not be parsed, %s is invalid ',
      invalid: '%s date %s is invalid'
    },
    types: {
      string: '%s is not a %s',
      method: '%s is not a %s (function)',
      array: '%s is not an %s',
      object: '%s is not an %s',
      number: '%s is not a %s',
      date: '%s is not a %s',
      boolean: '%s is not a %s',
      integer: '%s is not an %s',
      float: '%s is not a %s',
      regexp: '%s is not a valid %s',
      email: '%s is not a valid %s',
      url: '%s is not a valid %s',
      hex: '%s is not a valid %s'
    },
    string: {
      len: '%s must be exactly %s characters',
      min: '%s must be at least %s characters',
      max: '%s cannot be longer than %s characters',
      range: '%s must be between %s and %s characters'
    },
    number: {
      len: '%s must equal %s',
      min: '%s cannot be less than %s',
      max: '%s cannot be greater than %s',
      range: '%s must be between %s and %s'
    },
    array: {
      len: '%s must be exactly %s in length',
      min: '%s cannot be less than %s in length',
      max: '%s cannot be greater than %s in length',
      range: '%s must be between %s and %s in length'
    },
    pattern: {
      mismatch: '%s value %s does not match pattern %s'
    },
    clone: function clone() {
      var cloned = JSON.parse(JSON.stringify(this));
      cloned.clone = this.clone;
      return cloned;
    }
  };
}

var messages = newMessages();
/**
 *  Encapsulates a validation schema.
 *
 *  @param descriptor An object declaring validation rules
 *  for this schema.
 */

function Schema(descriptor) {
  this.rules = null;
  this._messages = messages;
  this.define(descriptor);
}

Schema.prototype = {
  messages: function messages(_messages) {
    if (_messages) {
      this._messages = deepMerge(newMessages(), _messages);
    }

    return this._messages;
  },
  define: function define(rules) {
    if (!rules) {
      throw new Error('Cannot configure a schema with no rules');
    }

    if (_typeof(rules) !== 'object' || Array.isArray(rules)) {
      throw new Error('Rules must be an object');
    }

    this.rules = {};
    var z;
    var item;

    for (z in rules) {
      if (rules.hasOwnProperty(z)) {
        item = rules[z];
        this.rules[z] = Array.isArray(item) ? item : [item];
      }
    }
  },
  validate: function validate(source_, o, oc) {
    var _this = this;

    if (o === void 0) {
      o = {};
    }

    if (oc === void 0) {
      oc = function oc() {};
    }

    var source = source_;
    var options = o;
    var callback = oc;

    if (typeof options === 'function') {
      callback = options;
      options = {};
    }

    if (!this.rules || Object.keys(this.rules).length === 0) {
      if (callback) {
        callback();
      }

      return Promise.resolve();
    }

    function complete(results) {
      var i;
      var errors = [];
      var fields = {};

      function add(e) {
        if (Array.isArray(e)) {
          var _errors;

          errors = (_errors = errors).concat.apply(_errors, e);
        } else {
          errors.push(e);
        }
      }

      for (i = 0; i < results.length; i++) {
        add(results[i]);
      }

      if (!errors.length) {
        errors = null;
        fields = null;
      } else {
        fields = convertFieldsError(errors);
      }

      callback(errors, fields);
    }

    if (options.messages) {
      var messages$1 = this.messages();

      if (messages$1 === messages) {
        messages$1 = newMessages();
      }

      deepMerge(messages$1, options.messages);
      options.messages = messages$1;
    } else {
      options.messages = this.messages();
    }

    var arr;
    var value;
    var series = {};
    var keys = options.keys || Object.keys(this.rules);
    keys.forEach(function (z) {
      arr = _this.rules[z];
      value = source[z];
      arr.forEach(function (r) {
        var rule = r;

        if (typeof rule.transform === 'function') {
          if (source === source_) {
            source = _extends({}, source);
          }

          value = source[z] = rule.transform(value);
        }

        if (typeof rule === 'function') {
          rule = {
            validator: rule
          };
        } else {
          rule = _extends({}, rule);
        }

        rule.validator = _this.getValidationMethod(rule);
        rule.field = z;
        rule.fullField = rule.fullField || z;
        rule.type = _this.getType(rule);

        if (!rule.validator) {
          return;
        }

        series[z] = series[z] || [];
        series[z].push({
          rule: rule,
          value: value,
          source: source,
          field: z
        });
      });
    });
    var errorFields = {};
    return asyncMap(series, options, function (data, doIt) {
      var rule = data.rule;
      var deep = (rule.type === 'object' || rule.type === 'array') && (_typeof(rule.fields) === 'object' || _typeof(rule.defaultField) === 'object');
      deep = deep && (rule.required || !rule.required && data.value);
      rule.field = data.field;

      function addFullfield(key, schema) {
        return _extends({}, schema, {
          fullField: rule.fullField + '.' + key
        });
      }

      function cb(e) {
        if (e === void 0) {
          e = [];
        }

        var errors = e;

        if (!Array.isArray(errors)) {
          errors = [errors];
        }

        if (!options.suppressWarning && errors.length) {
          Schema.warning('async-validator:', errors);
        }

        if (errors.length && rule.message) {
          errors = [].concat(rule.message);
        }

        errors = errors.map(complementError(rule));

        if (options.first && errors.length) {
          errorFields[rule.field] = 1;
          return doIt(errors);
        }

        if (!deep) {
          doIt(errors);
        } else {
          // if rule is required but the target object
          // does not exist fail at the rule level and don't
          // go deeper
          if (rule.required && !data.value) {
            if (rule.message) {
              errors = [].concat(rule.message).map(complementError(rule));
            } else if (options.error) {
              errors = [options.error(rule, format(options.messages.required, rule.field))];
            } else {
              errors = [];
            }

            return doIt(errors);
          }

          var fieldsSchema = {};

          if (rule.defaultField) {
            for (var k in data.value) {
              if (data.value.hasOwnProperty(k)) {
                fieldsSchema[k] = rule.defaultField;
              }
            }
          }

          fieldsSchema = _extends({}, fieldsSchema, {}, data.rule.fields);

          for (var f in fieldsSchema) {
            if (fieldsSchema.hasOwnProperty(f)) {
              var fieldSchema = Array.isArray(fieldsSchema[f]) ? fieldsSchema[f] : [fieldsSchema[f]];
              fieldsSchema[f] = fieldSchema.map(addFullfield.bind(null, f));
            }
          }

          var schema = new Schema(fieldsSchema);
          schema.messages(options.messages);

          if (data.rule.options) {
            data.rule.options.messages = options.messages;
            data.rule.options.error = options.error;
          }

          schema.validate(data.value, data.rule.options || options, function (errs) {
            var finalErrors = [];

            if (errors && errors.length) {
              finalErrors.push.apply(finalErrors, errors);
            }

            if (errs && errs.length) {
              finalErrors.push.apply(finalErrors, errs);
            }

            doIt(finalErrors.length ? finalErrors : null);
          });
        }
      }

      var res;

      if (rule.asyncValidator) {
        res = rule.asyncValidator(rule, data.value, cb, data.source, options);
      } else if (rule.validator) {
        res = rule.validator(rule, data.value, cb, data.source, options);

        if (res === true) {
          cb();
        } else if (res === false) {
          cb(rule.message || rule.field + ' fails');
        } else if (res instanceof Array) {
          cb(res);
        } else if (res instanceof Error) {
          cb(res.message);
        }
      }

      if (res && res.then) {
        res.then(function () {
          return cb();
        }, function (e) {
          return cb(e);
        });
      }
    }, function (results) {
      complete(results);
    });
  },
  getType: function getType(rule) {
    if (rule.type === undefined && rule.pattern instanceof RegExp) {
      rule.type = 'pattern';
    }

    if (typeof rule.validator !== 'function' && rule.type && !validators.hasOwnProperty(rule.type)) {
      throw new Error(format('Unknown rule type %s', rule.type));
    }

    return rule.type || 'string';
  },
  getValidationMethod: function getValidationMethod(rule) {
    if (typeof rule.validator === 'function') {
      return rule.validator;
    }

    var keys = Object.keys(rule);
    var messageIndex = keys.indexOf('message');

    if (messageIndex !== -1) {
      keys.splice(messageIndex, 1);
    }

    if (keys.length === 1 && keys[0] === 'required') {
      return validators.required;
    }

    return validators[this.getType(rule)] || false;
  }
};

Schema.register = function register(type, validator) {
  if (typeof validator !== 'function') {
    throw new Error('Cannot register a validator by type, validator is not a function');
  }

  validators[type] = validator;
};

Schema.warning = warning;
Schema.messages = messages;
var _default = Schema;
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/node-libs-browser/mock/process.js */ 352)))

/***/ }),

/***/ 352:
/*!********************************************************!*\
  !*** ./node_modules/node-libs-browser/mock/process.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports.nextTick = function nextTick(fn) {
    var args = Array.prototype.slice.call(arguments);
    args.shift();
    setTimeout(function () {
        fn.apply(null, args);
    }, 0);
};

exports.platform = exports.arch = 
exports.execPath = exports.title = 'browser';
exports.pid = 1;
exports.browser = true;
exports.env = {};
exports.argv = [];

exports.binding = function (name) {
	throw new Error('No such module. (Possibly not yet loaded)')
};

(function () {
    var cwd = '/';
    var path;
    exports.cwd = function () { return cwd };
    exports.chdir = function (dir) {
        if (!path) path = __webpack_require__(/*! path */ 353);
        cwd = path.resolve(dir, cwd);
    };
})();

exports.exit = exports.kill = 
exports.umask = exports.dlopen = 
exports.uptime = exports.memoryUsage = 
exports.uvCounters = function() {};
exports.features = {};


/***/ }),

/***/ 353:
/*!***********************************************!*\
  !*** ./node_modules/path-browserify/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {// .dirname, .basename, and .extname methods are extracted from Node.js v8.11.1,
// backported and transplited with Babel, with backwards-compat fixes

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function (path) {
  if (typeof path !== 'string') path = path + '';
  if (path.length === 0) return '.';
  var code = path.charCodeAt(0);
  var hasRoot = code === 47 /*/*/;
  var end = -1;
  var matchedSlash = true;
  for (var i = path.length - 1; i >= 1; --i) {
    code = path.charCodeAt(i);
    if (code === 47 /*/*/) {
        if (!matchedSlash) {
          end = i;
          break;
        }
      } else {
      // We saw the first non-path separator
      matchedSlash = false;
    }
  }

  if (end === -1) return hasRoot ? '/' : '.';
  if (hasRoot && end === 1) {
    // return '//';
    // Backwards-compat fix:
    return '/';
  }
  return path.slice(0, end);
};

function basename(path) {
  if (typeof path !== 'string') path = path + '';

  var start = 0;
  var end = -1;
  var matchedSlash = true;
  var i;

  for (i = path.length - 1; i >= 0; --i) {
    if (path.charCodeAt(i) === 47 /*/*/) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          start = i + 1;
          break;
        }
      } else if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // path component
      matchedSlash = false;
      end = i + 1;
    }
  }

  if (end === -1) return '';
  return path.slice(start, end);
}

// Uses a mixed approach for backwards-compatibility, as ext behavior changed
// in new Node.js versions, so only basename() above is backported here
exports.basename = function (path, ext) {
  var f = basename(path);
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};

exports.extname = function (path) {
  if (typeof path !== 'string') path = path + '';
  var startDot = -1;
  var startPart = 0;
  var end = -1;
  var matchedSlash = true;
  // Track the state of characters (if any) we see before our first dot and
  // after any path separator we find
  var preDotState = 0;
  for (var i = path.length - 1; i >= 0; --i) {
    var code = path.charCodeAt(i);
    if (code === 47 /*/*/) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          startPart = i + 1;
          break;
        }
        continue;
      }
    if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // extension
      matchedSlash = false;
      end = i + 1;
    }
    if (code === 46 /*.*/) {
        // If this is our first dot, mark it as the start of our extension
        if (startDot === -1)
          startDot = i;
        else if (preDotState !== 1)
          preDotState = 1;
    } else if (startDot !== -1) {
      // We saw a non-dot and non-path separator before our dot, so we should
      // have a good chance at having a non-empty extension
      preDotState = -1;
    }
  }

  if (startDot === -1 || end === -1 ||
      // We saw a non-dot character immediately before the dot
      preDotState === 0 ||
      // The (right-most) trimmed path component is exactly '..'
      preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
    return '';
  }
  return path.slice(startDot, end);
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node-libs-browser/mock/process.js */ 352)))

/***/ }),

/***/ 369:
/*!***************************************!*\
  !*** ./src/cool/ui/mixins/emitter.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _broadcast(componentName, eventName, params) {
  this.$children.forEach(function (child) {
    var name = child.$options.componentName;

    if (name === componentName) {
      child.$emit.apply(child, [eventName].concat(params));
    } else {
      _broadcast.apply(child, [componentName, eventName].concat([params]));
    }
  });
}

var _default = {
  methods: {
    dispatch: function dispatch(componentName, eventName, params) {
      var parent = this.$parent || this.$root;
      var name = parent.$options.componentName;

      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent;

        if (parent) {
          name = parent.$options.componentName;
        }
      }

      if (parent) {
        parent.$emit.apply(parent, [eventName].concat(params));
      }
    },
    broadcast: function broadcast(componentName, eventName, params) {
      _broadcast.call(this, componentName, eventName, params);
    }
  }
};
exports.default = _default;

/***/ }),

/***/ 395:
/*!******************************************************!*\
  !*** ./src/cool/ui/components/select-region/data.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var cities = [{
  value: '110000',
  label: '北京市',
  children: [{
    value: '110100',
    label: '北京市',
    children: [{
      value: '110101',
      label: '东城区'
    }, {
      value: '110102',
      label: '西城区'
    }, {
      value: '110105',
      label: '朝阳区'
    }, {
      value: '110106',
      label: '丰台区'
    }, {
      value: '110107',
      label: '石景山区'
    }, {
      value: '110108',
      label: '海淀区'
    }, {
      value: '110109',
      label: '门头沟区'
    }, {
      value: '110111',
      label: '房山区'
    }, {
      value: '110112',
      label: '通州区'
    }, {
      value: '110113',
      label: '顺义区'
    }, {
      value: '110114',
      label: '昌平区'
    }, {
      value: '110115',
      label: '大兴区'
    }, {
      value: '110116',
      label: '怀柔区'
    }, {
      value: '110117',
      label: '平谷区'
    }, {
      value: '110228',
      label: '密云区'
    }, {
      value: '110229',
      label: '延庆区'
    }]
  }]
}, {
  value: '120000',
  label: '天津市',
  children: [{
    value: '120100',
    label: '天津市',
    children: [{
      value: '120101',
      label: '和平区'
    }, {
      value: '120102',
      label: '河东区'
    }, {
      value: '120103',
      label: '河西区'
    }, {
      value: '120104',
      label: '南开区'
    }, {
      value: '120105',
      label: '河北区'
    }, {
      value: '120106',
      label: '红桥区'
    }, {
      value: '120110',
      label: '东丽区'
    }, {
      value: '120111',
      label: '西青区'
    }, {
      value: '120112',
      label: '津南区'
    }, {
      value: '120113',
      label: '北辰区'
    }, {
      value: '120114',
      label: '武清区'
    }, {
      value: '120115',
      label: '宝坻区'
    }, {
      value: '120116',
      label: '滨海新区'
    }, {
      value: '120221',
      label: '宁河区'
    }, {
      value: '120223',
      label: '静海区'
    }, {
      value: '120225',
      label: '蓟州区'
    }]
  }]
}, {
  value: '130000',
  label: '河北省',
  children: [{
    value: '130100',
    label: '石家庄市',
    children: [{
      value: '130102',
      label: '长安区'
    }, {
      value: '130104',
      label: '桥西区'
    }, {
      value: '130105',
      label: '新华区'
    }, {
      value: '130107',
      label: '井陉矿区'
    }, {
      value: '130108',
      label: '裕华区'
    }, {
      value: '130109',
      label: '藁城区'
    }, {
      value: '130110',
      label: '鹿泉区'
    }, {
      value: '130111',
      label: '栾城区'
    }, {
      value: '130121',
      label: '井陉县'
    }, {
      value: '130123',
      label: '正定县'
    }, {
      value: '130125',
      label: '行唐县'
    }, {
      value: '130126',
      label: '灵寿县'
    }, {
      value: '130127',
      label: '高邑县'
    }, {
      value: '130128',
      label: '深泽县'
    }, {
      value: '130129',
      label: '赞皇县'
    }, {
      value: '130130',
      label: '无极县'
    }, {
      value: '130131',
      label: '平山县'
    }, {
      value: '130132',
      label: '元氏县'
    }, {
      value: '130133',
      label: '赵　县'
    }, {
      value: '130181',
      label: '辛集市'
    }, {
      value: '130182',
      label: '藁城市'
    }, {
      value: '130183',
      label: '晋州市'
    }, {
      value: '130184',
      label: '新乐市'
    }]
  }, {
    value: '130200',
    label: '唐山市',
    children: [{
      value: '130202',
      label: '路南区'
    }, {
      value: '130203',
      label: '路北区'
    }, {
      value: '130204',
      label: '古冶区'
    }, {
      value: '130205',
      label: '开平区'
    }, {
      value: '130207',
      label: '丰南区'
    }, {
      value: '130208',
      label: '丰润区'
    }, {
      value: '130209',
      label: '曹妃甸区'
    }, {
      value: '130223',
      label: '滦　县'
    }, {
      value: '130224',
      label: '滦南县'
    }, {
      value: '130225',
      label: '乐亭县'
    }, {
      value: '130227',
      label: '迁西县'
    }, {
      value: '130229',
      label: '玉田县'
    }, {
      value: '130281',
      label: '遵化市'
    }, {
      value: '130283',
      label: '迁安市'
    }]
  }, {
    value: '130300',
    label: '秦皇岛市',
    children: [{
      value: '130302',
      label: '海港区'
    }, {
      value: '130303',
      label: '山海关区'
    }, {
      value: '130304',
      label: '北戴河区'
    }, {
      value: '130306',
      label: '抚宁区'
    }, {
      value: '130321',
      label: '青龙满族自治县'
    }, {
      value: '130322',
      label: '昌黎县'
    }, {
      value: '130324',
      label: '卢龙县'
    }]
  }, {
    value: '130400',
    label: '邯郸市',
    children: [{
      value: '130402',
      label: '邯山区'
    }, {
      value: '130403',
      label: '丛台区'
    }, {
      value: '130404',
      label: '复兴区'
    }, {
      value: '130406',
      label: '峰峰矿区'
    }, {
      value: '130421',
      label: '邯郸县'
    }, {
      value: '130423',
      label: '临漳县'
    }, {
      value: '130424',
      label: '成安县'
    }, {
      value: '130425',
      label: '大名县'
    }, {
      value: '130426',
      label: '涉　县'
    }, {
      value: '130427',
      label: '磁　县'
    }, {
      value: '130428',
      label: '肥乡县'
    }, {
      value: '130429',
      label: '永年县'
    }, {
      value: '130430',
      label: '邱　县'
    }, {
      value: '130431',
      label: '鸡泽县'
    }, {
      value: '130432',
      label: '广平县'
    }, {
      value: '130433',
      label: '馆陶县'
    }, {
      value: '130434',
      label: '魏　县'
    }, {
      value: '130435',
      label: '曲周县'
    }, {
      value: '130481',
      label: '武安市'
    }]
  }, {
    value: '130500',
    label: '邢台市',
    children: [{
      value: '130502',
      label: '桥东区'
    }, {
      value: '130503',
      label: '桥西区'
    }, {
      value: '130521',
      label: '邢台县'
    }, {
      value: '130522',
      label: '临城县'
    }, {
      value: '130523',
      label: '内丘县'
    }, {
      value: '130524',
      label: '柏乡县'
    }, {
      value: '130525',
      label: '隆尧县'
    }, {
      value: '130526',
      label: '任　县'
    }, {
      value: '130527',
      label: '南和县'
    }, {
      value: '130528',
      label: '宁晋县'
    }, {
      value: '130529',
      label: '巨鹿县'
    }, {
      value: '130530',
      label: '新河县'
    }, {
      value: '130531',
      label: '广宗县'
    }, {
      value: '130532',
      label: '平乡县'
    }, {
      value: '130533',
      label: '威　县'
    }, {
      value: '130534',
      label: '清河县'
    }, {
      value: '130535',
      label: '临西县'
    }, {
      value: '130581',
      label: '南宫市'
    }, {
      value: '130582',
      label: '沙河市'
    }]
  }, {
    value: '130600',
    label: '保定市',
    children: [{
      value: '130602',
      label: '竞秀区'
    }, {
      value: '130606',
      label: '莲池区'
    }, {
      value: '130607',
      label: '满城区'
    }, {
      value: '130608',
      label: '清苑区'
    }, {
      value: '130609',
      label: '徐水区'
    }, {
      value: '130623',
      label: '涞水县'
    }, {
      value: '130624',
      label: '阜平县'
    }, {
      value: '130626',
      label: '定兴县'
    }, {
      value: '130627',
      label: '唐　县'
    }, {
      value: '130628',
      label: '高阳县'
    }, {
      value: '130629',
      label: '容城县'
    }, {
      value: '130630',
      label: '涞源县'
    }, {
      value: '130631',
      label: '望都县'
    }, {
      value: '130632',
      label: '安新县'
    }, {
      value: '130633',
      label: '易　县'
    }, {
      value: '130634',
      label: '曲阳县'
    }, {
      value: '130635',
      label: '蠡　县'
    }, {
      value: '130636',
      label: '顺平县'
    }, {
      value: '130637',
      label: '博野县'
    }, {
      value: '130638',
      label: '雄　县'
    }, {
      value: '130681',
      label: '涿州市'
    }, {
      value: '130683',
      label: '安国市'
    }, {
      value: '130684',
      label: '高碑店市'
    }]
  }, {
    value: '130700',
    label: '张家口市',
    children: [{
      value: '130702',
      label: '桥东区'
    }, {
      value: '130703',
      label: '桥西区'
    }, {
      value: '130705',
      label: '宣化区'
    }, {
      value: '130706',
      label: '下花园区'
    }, {
      value: '130721',
      label: '宣化县'
    }, {
      value: '130722',
      label: '张北县'
    }, {
      value: '130723',
      label: '康保县'
    }, {
      value: '130724',
      label: '沽源县'
    }, {
      value: '130725',
      label: '尚义县'
    }, {
      value: '130726',
      label: '蔚　县'
    }, {
      value: '130727',
      label: '阳原县'
    }, {
      value: '130728',
      label: '怀安县'
    }, {
      value: '130729',
      label: '万全县'
    }, {
      value: '130730',
      label: '怀来县'
    }, {
      value: '130731',
      label: '涿鹿县'
    }, {
      value: '130732',
      label: '赤城县'
    }, {
      value: '130733',
      label: '崇礼县'
    }]
  }, {
    value: '130800',
    label: '承德市',
    children: [{
      value: '130802',
      label: '双桥区'
    }, {
      value: '130803',
      label: '双滦区'
    }, {
      value: '130804',
      label: '鹰手营子矿区'
    }, {
      value: '130821',
      label: '承德县'
    }, {
      value: '130822',
      label: '兴隆县'
    }, {
      value: '130823',
      label: '平泉县'
    }, {
      value: '130824',
      label: '滦平县'
    }, {
      value: '130825',
      label: '隆化县'
    }, {
      value: '130826',
      label: '丰宁满族自治县'
    }, {
      value: '130827',
      label: '宽城满族自治县'
    }, {
      value: '130828',
      label: '围场满族蒙古族自治县'
    }]
  }, {
    value: '130900',
    label: '沧州市',
    children: [{
      value: '130902',
      label: '新华区'
    }, {
      value: '130903',
      label: '运河区'
    }, {
      value: '130921',
      label: '沧　县'
    }, {
      value: '130922',
      label: '青　县'
    }, {
      value: '130923',
      label: '东光县'
    }, {
      value: '130924',
      label: '海兴县'
    }, {
      value: '130925',
      label: '盐山县'
    }, {
      value: '130926',
      label: '肃宁县'
    }, {
      value: '130927',
      label: '南皮县'
    }, {
      value: '130928',
      label: '吴桥县'
    }, {
      value: '130929',
      label: '献　县'
    }, {
      value: '130930',
      label: '孟村回族自治县'
    }, {
      value: '130981',
      label: '泊头市'
    }, {
      value: '130982',
      label: '任丘市'
    }, {
      value: '130983',
      label: '黄骅市'
    }, {
      value: '130984',
      label: '河间市'
    }]
  }, {
    value: '131000',
    label: '廊坊市',
    children: [{
      value: '131002',
      label: '安次区'
    }, {
      value: '131003',
      label: '广阳区'
    }, {
      value: '131022',
      label: '固安县'
    }, {
      value: '131023',
      label: '永清县'
    }, {
      value: '131024',
      label: '香河县'
    }, {
      value: '131025',
      label: '大城县'
    }, {
      value: '131026',
      label: '文安县'
    }, {
      value: '131028',
      label: '大厂回族自治县'
    }, {
      value: '131081',
      label: '霸州市'
    }, {
      value: '131082',
      label: '三河市'
    }]
  }, {
    value: '131100',
    label: '衡水市',
    children: [{
      value: '131102',
      label: '桃城区'
    }, {
      value: '131121',
      label: '枣强县'
    }, {
      value: '131122',
      label: '武邑县'
    }, {
      value: '131123',
      label: '武强县'
    }, {
      value: '131124',
      label: '饶阳县'
    }, {
      value: '131125',
      label: '安平县'
    }, {
      value: '131126',
      label: '故城县'
    }, {
      value: '131127',
      label: '景　县'
    }, {
      value: '131128',
      label: '阜城县'
    }, {
      value: '131181',
      label: '冀州市'
    }, {
      value: '131182',
      label: '深州市'
    }]
  }, {
    value: '139000',
    label: '省直辖县级行政区划',
    children: [{
      value: '139001',
      label: '定州市'
    }, {
      value: '139002',
      label: '辛集市'
    }]
  }]
}, {
  value: '140000',
  label: '山西省',
  children: [{
    value: '140100',
    label: '太原市',
    children: [{
      value: '140105',
      label: '小店区'
    }, {
      value: '140106',
      label: '迎泽区'
    }, {
      value: '140107',
      label: '杏花岭区'
    }, {
      value: '140108',
      label: '尖草坪区'
    }, {
      value: '140109',
      label: '万柏林区'
    }, {
      value: '140110',
      label: '晋源区'
    }, {
      value: '140121',
      label: '清徐县'
    }, {
      value: '140122',
      label: '阳曲县'
    }, {
      value: '140123',
      label: '娄烦县'
    }, {
      value: '140181',
      label: '古交市'
    }]
  }, {
    value: '140200',
    label: '大同市',
    children: [{
      value: '140202',
      label: '城　区'
    }, {
      value: '140203',
      label: '矿　区'
    }, {
      value: '140211',
      label: '南郊区'
    }, {
      value: '140212',
      label: '新荣区'
    }, {
      value: '140221',
      label: '阳高县'
    }, {
      value: '140222',
      label: '天镇县'
    }, {
      value: '140223',
      label: '广灵县'
    }, {
      value: '140224',
      label: '灵丘县'
    }, {
      value: '140225',
      label: '浑源县'
    }, {
      value: '140226',
      label: '左云县'
    }, {
      value: '140227',
      label: '大同县'
    }]
  }, {
    value: '140300',
    label: '阳泉市',
    children: [{
      value: '140302',
      label: '城　区'
    }, {
      value: '140303',
      label: '矿　区'
    }, {
      value: '140311',
      label: '郊　区'
    }, {
      value: '140321',
      label: '平定县'
    }, {
      value: '140322',
      label: '盂　县'
    }]
  }, {
    value: '140400',
    label: '长治市',
    children: [{
      value: '140402',
      label: '城　区'
    }, {
      value: '140411',
      label: '郊　区'
    }, {
      value: '140421',
      label: '长治县'
    }, {
      value: '140423',
      label: '襄垣县'
    }, {
      value: '140424',
      label: '屯留县'
    }, {
      value: '140425',
      label: '平顺县'
    }, {
      value: '140426',
      label: '黎城县'
    }, {
      value: '140427',
      label: '壶关县'
    }, {
      value: '140428',
      label: '长子县'
    }, {
      value: '140429',
      label: '武乡县'
    }, {
      value: '140430',
      label: '沁　县'
    }, {
      value: '140431',
      label: '沁源县'
    }, {
      value: '140481',
      label: '潞城市'
    }]
  }, {
    value: '140500',
    label: '晋城市',
    children: [{
      value: '140502',
      label: '城　区'
    }, {
      value: '140521',
      label: '沁水县'
    }, {
      value: '140522',
      label: '阳城县'
    }, {
      value: '140524',
      label: '陵川县'
    }, {
      value: '140525',
      label: '泽州县'
    }, {
      value: '140581',
      label: '高平市'
    }]
  }, {
    value: '140600',
    label: '朔州市',
    children: [{
      value: '140602',
      label: '朔城区'
    }, {
      value: '140603',
      label: '平鲁区'
    }, {
      value: '140621',
      label: '山阴县'
    }, {
      value: '140622',
      label: '应　县'
    }, {
      value: '140623',
      label: '右玉县'
    }, {
      value: '140624',
      label: '怀仁县'
    }]
  }, {
    value: '140700',
    label: '晋中市',
    children: [{
      value: '140702',
      label: '榆次区'
    }, {
      value: '140721',
      label: '榆社县'
    }, {
      value: '140722',
      label: '左权县'
    }, {
      value: '140723',
      label: '和顺县'
    }, {
      value: '140724',
      label: '昔阳县'
    }, {
      value: '140725',
      label: '寿阳县'
    }, {
      value: '140726',
      label: '太谷县'
    }, {
      value: '140727',
      label: '祁　县'
    }, {
      value: '140728',
      label: '平遥县'
    }, {
      value: '140729',
      label: '灵石县'
    }, {
      value: '140781',
      label: '介休市'
    }]
  }, {
    value: '140800',
    label: '运城市',
    children: [{
      value: '140802',
      label: '盐湖区'
    }, {
      value: '140821',
      label: '临猗县'
    }, {
      value: '140822',
      label: '万荣县'
    }, {
      value: '140823',
      label: '闻喜县'
    }, {
      value: '140824',
      label: '稷山县'
    }, {
      value: '140825',
      label: '新绛县'
    }, {
      value: '140826',
      label: '绛　县'
    }, {
      value: '140827',
      label: '垣曲县'
    }, {
      value: '140828',
      label: '夏　县'
    }, {
      value: '140829',
      label: '平陆县'
    }, {
      value: '140830',
      label: '芮城县'
    }, {
      value: '140881',
      label: '永济市'
    }, {
      value: '140882',
      label: '河津市'
    }]
  }, {
    value: '140900',
    label: '忻州市',
    children: [{
      value: '140902',
      label: '忻府区'
    }, {
      value: '140921',
      label: '定襄县'
    }, {
      value: '140922',
      label: '五台县'
    }, {
      value: '140923',
      label: '代　县'
    }, {
      value: '140924',
      label: '繁峙县'
    }, {
      value: '140925',
      label: '宁武县'
    }, {
      value: '140926',
      label: '静乐县'
    }, {
      value: '140927',
      label: '神池县'
    }, {
      value: '140928',
      label: '五寨县'
    }, {
      value: '140929',
      label: '岢岚县'
    }, {
      value: '140930',
      label: '河曲县'
    }, {
      value: '140931',
      label: '保德县'
    }, {
      value: '140932',
      label: '偏关县'
    }, {
      value: '140981',
      label: '原平市'
    }]
  }, {
    value: '141000',
    label: '临汾市',
    children: [{
      value: '141002',
      label: '尧都区'
    }, {
      value: '141021',
      label: '曲沃县'
    }, {
      value: '141022',
      label: '翼城县'
    }, {
      value: '141023',
      label: '襄汾县'
    }, {
      value: '141024',
      label: '洪洞县'
    }, {
      value: '141025',
      label: '古　县'
    }, {
      value: '141026',
      label: '安泽县'
    }, {
      value: '141027',
      label: '浮山县'
    }, {
      value: '141028',
      label: '吉　县'
    }, {
      value: '141029',
      label: '乡宁县'
    }, {
      value: '141030',
      label: '大宁县'
    }, {
      value: '141031',
      label: '隰　县'
    }, {
      value: '141032',
      label: '永和县'
    }, {
      value: '141033',
      label: '蒲　县'
    }, {
      value: '141034',
      label: '汾西县'
    }, {
      value: '141081',
      label: '侯马市'
    }, {
      value: '141082',
      label: '霍州市'
    }]
  }, {
    value: '141100',
    label: '吕梁市',
    children: [{
      value: '141102',
      label: '离石区'
    }, {
      value: '141121',
      label: '文水县'
    }, {
      value: '141122',
      label: '交城县'
    }, {
      value: '141123',
      label: '兴　县'
    }, {
      value: '141124',
      label: '临　县'
    }, {
      value: '141125',
      label: '柳林县'
    }, {
      value: '141126',
      label: '石楼县'
    }, {
      value: '141127',
      label: '岚　县'
    }, {
      value: '141128',
      label: '方山县'
    }, {
      value: '141129',
      label: '中阳县'
    }, {
      value: '141130',
      label: '交口县'
    }, {
      value: '141181',
      label: '孝义市'
    }, {
      value: '141182',
      label: '汾阳市'
    }]
  }]
}, {
  value: '150000',
  label: '内蒙古自治区',
  children: [{
    value: '150100',
    label: '呼和浩特市',
    children: [{
      value: '150102',
      label: '新城区'
    }, {
      value: '150103',
      label: '回民区'
    }, {
      value: '150104',
      label: '玉泉区'
    }, {
      value: '150105',
      label: '赛罕区'
    }, {
      value: '150121',
      label: '土默特左旗'
    }, {
      value: '150122',
      label: '托克托县'
    }, {
      value: '150123',
      label: '和林格尔县'
    }, {
      value: '150124',
      label: '清水河县'
    }, {
      value: '150125',
      label: '武川县'
    }]
  }, {
    value: '150200',
    label: '包头市',
    children: [{
      value: '150202',
      label: '东河区'
    }, {
      value: '150203',
      label: '昆都仑区'
    }, {
      value: '150204',
      label: '青山区'
    }, {
      value: '150205',
      label: '石拐区'
    }, {
      value: '150206',
      label: '白云鄂博矿区'
    }, {
      value: '150207',
      label: '九原区'
    }, {
      value: '150221',
      label: '土默特右旗'
    }, {
      value: '150222',
      label: '固阳县'
    }, {
      value: '150223',
      label: '达尔罕茂明安联合旗'
    }]
  }, {
    value: '150300',
    label: '乌海市',
    children: [{
      value: '150302',
      label: '海勃湾区'
    }, {
      value: '150303',
      label: '海南区'
    }, {
      value: '150304',
      label: '乌达区'
    }]
  }, {
    value: '150400',
    label: '赤峰市',
    children: [{
      value: '150402',
      label: '红山区'
    }, {
      value: '150403',
      label: '元宝山区'
    }, {
      value: '150404',
      label: '松山区'
    }, {
      value: '150421',
      label: '阿鲁科尔沁旗'
    }, {
      value: '150422',
      label: '巴林左旗'
    }, {
      value: '150423',
      label: '巴林右旗'
    }, {
      value: '150424',
      label: '林西县'
    }, {
      value: '150425',
      label: '克什克腾旗'
    }, {
      value: '150426',
      label: '翁牛特旗'
    }, {
      value: '150428',
      label: '喀喇沁旗'
    }, {
      value: '150429',
      label: '宁城县'
    }, {
      value: '150430',
      label: '敖汉旗'
    }]
  }, {
    value: '150500',
    label: '通辽市',
    children: [{
      value: '150502',
      label: '科尔沁区'
    }, {
      value: '150521',
      label: '科尔沁左翼中旗'
    }, {
      value: '150522',
      label: '科尔沁左翼后旗'
    }, {
      value: '150523',
      label: '开鲁县'
    }, {
      value: '150524',
      label: '库伦旗'
    }, {
      value: '150525',
      label: '奈曼旗'
    }, {
      value: '150526',
      label: '扎鲁特旗'
    }, {
      value: '150581',
      label: '霍林郭勒市'
    }]
  }, {
    value: '150600',
    label: '鄂尔多斯市',
    children: [{
      value: '150602',
      label: '东胜区'
    }, {
      value: '150621',
      label: '达拉特旗'
    }, {
      value: '150622',
      label: '准格尔旗'
    }, {
      value: '150623',
      label: '鄂托克前旗'
    }, {
      value: '150624',
      label: '鄂托克旗'
    }, {
      value: '150625',
      label: '杭锦旗'
    }, {
      value: '150626',
      label: '乌审旗'
    }, {
      value: '150627',
      label: '伊金霍洛旗'
    }]
  }, {
    value: '150700',
    label: '呼伦贝尔市',
    children: [{
      value: '150702',
      label: '海拉尔区'
    }, {
      value: '150703',
      label: '扎赉诺尔区'
    }, {
      value: '150721',
      label: '阿荣旗'
    }, {
      value: '150722',
      label: '莫力达瓦达斡尔族自治旗'
    }, {
      value: '150723',
      label: '鄂伦春自治旗'
    }, {
      value: '150724',
      label: '鄂温克族自治旗'
    }, {
      value: '150725',
      label: '陈巴尔虎旗'
    }, {
      value: '150726',
      label: '新巴尔虎左旗'
    }, {
      value: '150727',
      label: '新巴尔虎右旗'
    }, {
      value: '150781',
      label: '满洲里市'
    }, {
      value: '150782',
      label: '牙克石市'
    }, {
      value: '150783',
      label: '扎兰屯市'
    }, {
      value: '150784',
      label: '额尔古纳市'
    }, {
      value: '150785',
      label: '根河市'
    }]
  }, {
    value: '150800',
    label: '巴彦淖尔市',
    children: [{
      value: '150802',
      label: '临河区'
    }, {
      value: '150821',
      label: '五原县'
    }, {
      value: '150822',
      label: '磴口县'
    }, {
      value: '150823',
      label: '乌拉特前旗'
    }, {
      value: '150824',
      label: '乌拉特中旗'
    }, {
      value: '150825',
      label: '乌拉特后旗'
    }, {
      value: '150826',
      label: '杭锦后旗'
    }]
  }, {
    value: '150900',
    label: '乌兰察布市',
    children: [{
      value: '150902',
      label: '集宁区'
    }, {
      value: '150921',
      label: '卓资县'
    }, {
      value: '150922',
      label: '化德县'
    }, {
      value: '150923',
      label: '商都县'
    }, {
      value: '150924',
      label: '兴和县'
    }, {
      value: '150925',
      label: '凉城县'
    }, {
      value: '150926',
      label: '察哈尔右翼前旗'
    }, {
      value: '150927',
      label: '察哈尔右翼中旗'
    }, {
      value: '150928',
      label: '察哈尔右翼后旗'
    }, {
      value: '150929',
      label: '四子王旗'
    }, {
      value: '150981',
      label: '丰镇市'
    }]
  }, {
    value: '152200',
    label: '兴安盟',
    children: [{
      value: '152201',
      label: '乌兰浩特市'
    }, {
      value: '152202',
      label: '阿尔山市'
    }, {
      value: '152221',
      label: '科尔沁右翼前旗'
    }, {
      value: '152222',
      label: '科尔沁右翼中旗'
    }, {
      value: '152223',
      label: '扎赉特旗'
    }, {
      value: '152224',
      label: '突泉县'
    }]
  }, {
    value: '152500',
    label: '锡林郭勒盟',
    children: [{
      value: '152501',
      label: '二连浩特市'
    }, {
      value: '152502',
      label: '锡林浩特市'
    }, {
      value: '152522',
      label: '阿巴嘎旗'
    }, {
      value: '152523',
      label: '苏尼特左旗'
    }, {
      value: '152524',
      label: '苏尼特右旗'
    }, {
      value: '152525',
      label: '东乌珠穆沁旗'
    }, {
      value: '152526',
      label: '西乌珠穆沁旗'
    }, {
      value: '152527',
      label: '太仆寺旗'
    }, {
      value: '152528',
      label: '镶黄旗'
    }, {
      value: '152529',
      label: '正镶白旗'
    }, {
      value: '152530',
      label: '正蓝旗'
    }, {
      value: '152531',
      label: '多伦县'
    }]
  }, {
    value: '152900',
    label: '阿拉善盟',
    children: [{
      value: '152921',
      label: '阿拉善左旗'
    }, {
      value: '152922',
      label: '阿拉善右旗'
    }, {
      value: '152923',
      label: '额济纳旗'
    }]
  }]
}, {
  value: '210000',
  label: '辽宁省',
  children: [{
    value: '210100',
    label: '沈阳市',
    children: [{
      value: '210102',
      label: '和平区'
    }, {
      value: '210103',
      label: '沈河区'
    }, {
      value: '210104',
      label: '大东区'
    }, {
      value: '210105',
      label: '皇姑区'
    }, {
      value: '210106',
      label: '铁西区'
    }, {
      value: '210111',
      label: '苏家屯区'
    }, {
      value: '210112',
      label: '浑南区'
    }, {
      value: '210113',
      label: '沈北新区'
    }, {
      value: '210114',
      label: '于洪区'
    }, {
      value: '210122',
      label: '辽中县'
    }, {
      value: '210123',
      label: '康平县'
    }, {
      value: '210124',
      label: '法库县'
    }, {
      value: '210181',
      label: '新民市'
    }]
  }, {
    value: '210200',
    label: '大连市',
    children: [{
      value: '210202',
      label: '中山区'
    }, {
      value: '210203',
      label: '西岗区'
    }, {
      value: '210204',
      label: '沙河口区'
    }, {
      value: '210211',
      label: '甘井子区'
    }, {
      value: '210212',
      label: '旅顺口区'
    }, {
      value: '210213',
      label: '金州区'
    }, {
      value: '210224',
      label: '长海县'
    }, {
      value: '210281',
      label: '瓦房店市'
    }, {
      value: '210282',
      label: '普兰店市'
    }, {
      value: '210283',
      label: '庄河市'
    }]
  }, {
    value: '210300',
    label: '鞍山市',
    children: [{
      value: '210302',
      label: '铁东区'
    }, {
      value: '210303',
      label: '铁西区'
    }, {
      value: '210304',
      label: '立山区'
    }, {
      value: '210311',
      label: '千山区'
    }, {
      value: '210321',
      label: '台安县'
    }, {
      value: '210323',
      label: '岫岩满族自治县'
    }, {
      value: '210381',
      label: '海城市'
    }]
  }, {
    value: '210400',
    label: '抚顺市',
    children: [{
      value: '210402',
      label: '新抚区'
    }, {
      value: '210403',
      label: '东洲区'
    }, {
      value: '210404',
      label: '望花区'
    }, {
      value: '210411',
      label: '顺城区'
    }, {
      value: '210421',
      label: '抚顺县'
    }, {
      value: '210422',
      label: '新宾满族自治县'
    }, {
      value: '210423',
      label: '清原满族自治县'
    }]
  }, {
    value: '210500',
    label: '本溪市',
    children: [{
      value: '210502',
      label: '平山区'
    }, {
      value: '210503',
      label: '溪湖区'
    }, {
      value: '210504',
      label: '明山区'
    }, {
      value: '210505',
      label: '南芬区'
    }, {
      value: '210521',
      label: '本溪满族自治县'
    }, {
      value: '210522',
      label: '桓仁满族自治县'
    }]
  }, {
    value: '210600',
    label: '丹东市',
    children: [{
      value: '210602',
      label: '元宝区'
    }, {
      value: '210603',
      label: '振兴区'
    }, {
      value: '210604',
      label: '振安区'
    }, {
      value: '210624',
      label: '宽甸满族自治县'
    }, {
      value: '210681',
      label: '东港市'
    }, {
      value: '210682',
      label: '凤城市'
    }]
  }, {
    value: '210700',
    label: '锦州市',
    children: [{
      value: '210702',
      label: '古塔区'
    }, {
      value: '210703',
      label: '凌河区'
    }, {
      value: '210711',
      label: '太和区'
    }, {
      value: '210726',
      label: '黑山县'
    }, {
      value: '210727',
      label: '义　县'
    }, {
      value: '210781',
      label: '凌海市'
    }, {
      value: '210783',
      label: '北镇市'
    }]
  }, {
    value: '210800',
    label: '营口市',
    children: [{
      value: '210802',
      label: '站前区'
    }, {
      value: '210803',
      label: '西市区'
    }, {
      value: '210804',
      label: '鲅鱼圈区'
    }, {
      value: '210811',
      label: '老边区'
    }, {
      value: '210881',
      label: '盖州市'
    }, {
      value: '210882',
      label: '大石桥市'
    }]
  }, {
    value: '210900',
    label: '阜新市',
    children: [{
      value: '210902',
      label: '海州区'
    }, {
      value: '210903',
      label: '新邱区'
    }, {
      value: '210904',
      label: '太平区'
    }, {
      value: '210905',
      label: '清河门区'
    }, {
      value: '210911',
      label: '细河区'
    }, {
      value: '210921',
      label: '阜新蒙古族自治县'
    }, {
      value: '210922',
      label: '彰武县'
    }]
  }, {
    value: '211000',
    label: '辽阳市',
    children: [{
      value: '211002',
      label: '白塔区'
    }, {
      value: '211003',
      label: '文圣区'
    }, {
      value: '211004',
      label: '宏伟区'
    }, {
      value: '211005',
      label: '弓长岭区'
    }, {
      value: '211011',
      label: '太子河区'
    }, {
      value: '211021',
      label: '辽阳县'
    }, {
      value: '211081',
      label: '灯塔市'
    }]
  }, {
    value: '211100',
    label: '盘锦市',
    children: [{
      value: '211102',
      label: '双台子区'
    }, {
      value: '211103',
      label: '兴隆台区'
    }, {
      value: '211121',
      label: '大洼县'
    }, {
      value: '211122',
      label: '盘山县'
    }]
  }, {
    value: '211200',
    label: '铁岭市',
    children: [{
      value: '211202',
      label: '银州区'
    }, {
      value: '211204',
      label: '清河区'
    }, {
      value: '211221',
      label: '铁岭县'
    }, {
      value: '211223',
      label: '西丰县'
    }, {
      value: '211224',
      label: '昌图县'
    }, {
      value: '211281',
      label: '调兵山市'
    }, {
      value: '211282',
      label: '开原市'
    }]
  }, {
    value: '211300',
    label: '朝阳市',
    children: [{
      value: '211302',
      label: '双塔区'
    }, {
      value: '211303',
      label: '龙城区'
    }, {
      value: '211321',
      label: '朝阳县'
    }, {
      value: '211322',
      label: '建平县'
    }, {
      value: '211324',
      label: '喀喇沁左翼蒙古族自治县'
    }, {
      value: '211381',
      label: '北票市'
    }, {
      value: '211382',
      label: '凌源市'
    }]
  }, {
    value: '211400',
    label: '葫芦岛市',
    children: [{
      value: '211402',
      label: '连山区'
    }, {
      value: '211403',
      label: '龙港区'
    }, {
      value: '211404',
      label: '南票区'
    }, {
      value: '211421',
      label: '绥中县'
    }, {
      value: '211422',
      label: '建昌县'
    }, {
      value: '211481',
      label: '兴城市'
    }]
  }]
}, {
  value: '220000',
  label: '吉林省',
  children: [{
    value: '220100',
    label: '长春市',
    children: [{
      value: '220102',
      label: '南关区'
    }, {
      value: '220103',
      label: '宽城区'
    }, {
      value: '220104',
      label: '朝阳区'
    }, {
      value: '220105',
      label: '二道区'
    }, {
      value: '220106',
      label: '绿园区'
    }, {
      value: '220112',
      label: '双阳区'
    }, {
      value: '220122',
      label: '农安县'
    }, {
      value: '220181',
      label: '九台市'
    }, {
      value: '220182',
      label: '榆树市'
    }, {
      value: '220183',
      label: '德惠市'
    }]
  }, {
    value: '220200',
    label: '吉林市',
    children: [{
      value: '220202',
      label: '昌邑区'
    }, {
      value: '220203',
      label: '龙潭区'
    }, {
      value: '220204',
      label: '船营区'
    }, {
      value: '220211',
      label: '丰满区'
    }, {
      value: '220221',
      label: '永吉县'
    }, {
      value: '220281',
      label: '蛟河市'
    }, {
      value: '220282',
      label: '桦甸市'
    }, {
      value: '220283',
      label: '舒兰市'
    }, {
      value: '220284',
      label: '磐石市'
    }]
  }, {
    value: '220300',
    label: '四平市',
    children: [{
      value: '220302',
      label: '铁西区'
    }, {
      value: '220303',
      label: '铁东区'
    }, {
      value: '220322',
      label: '梨树县'
    }, {
      value: '220323',
      label: '伊通满族自治县'
    }, {
      value: '220381',
      label: '公主岭市'
    }, {
      value: '220382',
      label: '双辽市'
    }]
  }, {
    value: '220400',
    label: '辽源市',
    children: [{
      value: '220402',
      label: '龙山区'
    }, {
      value: '220403',
      label: '西安区'
    }, {
      value: '220421',
      label: '东丰县'
    }, {
      value: '220422',
      label: '东辽县'
    }]
  }, {
    value: '220500',
    label: '通化市',
    children: [{
      value: '220502',
      label: '东昌区'
    }, {
      value: '220503',
      label: '二道江区'
    }, {
      value: '220521',
      label: '通化县'
    }, {
      value: '220523',
      label: '辉南县'
    }, {
      value: '220524',
      label: '柳河县'
    }, {
      value: '220581',
      label: '梅河口市'
    }, {
      value: '220582',
      label: '集安市'
    }]
  }, {
    value: '220600',
    label: '白山市',
    children: [{
      value: '220602',
      label: '浑江区'
    }, {
      value: '220605',
      label: '江源区'
    }, {
      value: '220621',
      label: '抚松县'
    }, {
      value: '220622',
      label: '靖宇县'
    }, {
      value: '220623',
      label: '长白朝鲜族自治县'
    }, {
      value: '220681',
      label: '临江市'
    }]
  }, {
    value: '220700',
    label: '松原市',
    children: [{
      value: '220702',
      label: '宁江区'
    }, {
      value: '220721',
      label: '前郭尔罗斯蒙古族自治县'
    }, {
      value: '220722',
      label: '长岭县'
    }, {
      value: '220723',
      label: '乾安县'
    }, {
      value: '220724',
      label: '扶余县'
    }]
  }, {
    value: '220800',
    label: '白城市',
    children: [{
      value: '220802',
      label: '洮北区'
    }, {
      value: '220821',
      label: '镇赉县'
    }, {
      value: '220822',
      label: '通榆县'
    }, {
      value: '220881',
      label: '洮南市'
    }, {
      value: '220882',
      label: '大安市'
    }]
  }, {
    value: '222400',
    label: '延边朝鲜族自治州',
    children: [{
      value: '222401',
      label: '延吉市'
    }, {
      value: '222402',
      label: '图们市'
    }, {
      value: '222403',
      label: '敦化市'
    }, {
      value: '222404',
      label: '珲春市'
    }, {
      value: '222405',
      label: '龙井市'
    }, {
      value: '222406',
      label: '和龙市'
    }, {
      value: '222424',
      label: '汪清县'
    }, {
      value: '222426',
      label: '安图县'
    }]
  }]
}, {
  value: '230000',
  label: '黑龙江省',
  children: [{
    value: '230100',
    label: '哈尔滨市',
    children: [{
      value: '230102',
      label: '道里区'
    }, {
      value: '230103',
      label: '南岗区'
    }, {
      value: '230104',
      label: '道外区'
    }, {
      value: '230106',
      label: '香坊区'
    }, {
      value: '230108',
      label: '平房区'
    }, {
      value: '230109',
      label: '松北区'
    }, {
      value: '230111',
      label: '呼兰区'
    }, {
      value: '230123',
      label: '依兰县'
    }, {
      value: '230124',
      label: '方正县'
    }, {
      value: '230125',
      label: '宾　县'
    }, {
      value: '230126',
      label: '巴彦县'
    }, {
      value: '230127',
      label: '木兰县'
    }, {
      value: '230128',
      label: '通河县'
    }, {
      value: '230129',
      label: '延寿县'
    }, {
      value: '230181',
      label: '阿城市'
    }, {
      value: '230182',
      label: '双城市'
    }, {
      value: '230183',
      label: '尚志市'
    }, {
      value: '230184',
      label: '五常市'
    }]
  }, {
    value: '230200',
    label: '齐齐哈尔市',
    children: [{
      value: '230202',
      label: '龙沙区'
    }, {
      value: '230203',
      label: '建华区'
    }, {
      value: '230204',
      label: '铁锋区'
    }, {
      value: '230205',
      label: '昂昂溪区'
    }, {
      value: '230206',
      label: '富拉尔基区'
    }, {
      value: '230207',
      label: '碾子山区'
    }, {
      value: '230208',
      label: '梅里斯达斡尔族区'
    }, {
      value: '230221',
      label: '龙江县'
    }, {
      value: '230223',
      label: '依安县'
    }, {
      value: '230224',
      label: '泰来县'
    }, {
      value: '230225',
      label: '甘南县'
    }, {
      value: '230227',
      label: '富裕县'
    }, {
      value: '230229',
      label: '克山县'
    }, {
      value: '230230',
      label: '克东县'
    }, {
      value: '230231',
      label: '拜泉县'
    }, {
      value: '230281',
      label: '讷河市'
    }]
  }, {
    value: '230300',
    label: '鸡西市',
    children: [{
      value: '230302',
      label: '鸡冠区'
    }, {
      value: '230303',
      label: '恒山区'
    }, {
      value: '230304',
      label: '滴道区'
    }, {
      value: '230305',
      label: '梨树区'
    }, {
      value: '230306',
      label: '城子河区'
    }, {
      value: '230307',
      label: '麻山区'
    }, {
      value: '230321',
      label: '鸡东县'
    }, {
      value: '230381',
      label: '虎林市'
    }, {
      value: '230382',
      label: '密山市'
    }]
  }, {
    value: '230400',
    label: '鹤岗市',
    children: [{
      value: '230402',
      label: '向阳区'
    }, {
      value: '230403',
      label: '工农区'
    }, {
      value: '230404',
      label: '南山区'
    }, {
      value: '230405',
      label: '兴安区'
    }, {
      value: '230406',
      label: '东山区'
    }, {
      value: '230407',
      label: '兴山区'
    }, {
      value: '230421',
      label: '萝北县'
    }, {
      value: '230422',
      label: '绥滨县'
    }]
  }, {
    value: '230500',
    label: '双鸭山市',
    children: [{
      value: '230502',
      label: '尖山区'
    }, {
      value: '230503',
      label: '岭东区'
    }, {
      value: '230505',
      label: '四方台区'
    }, {
      value: '230506',
      label: '宝山区'
    }, {
      value: '230521',
      label: '集贤县'
    }, {
      value: '230522',
      label: '友谊县'
    }, {
      value: '230523',
      label: '宝清县'
    }, {
      value: '230524',
      label: '饶河县'
    }]
  }, {
    value: '230600',
    label: '大庆市',
    children: [{
      value: '230602',
      label: '萨尔图区'
    }, {
      value: '230603',
      label: '龙凤区'
    }, {
      value: '230604',
      label: '让胡路区'
    }, {
      value: '230605',
      label: '红岗区'
    }, {
      value: '230606',
      label: '大同区'
    }, {
      value: '230621',
      label: '肇州县'
    }, {
      value: '230622',
      label: '肇源县'
    }, {
      value: '230623',
      label: '林甸县'
    }, {
      value: '230624',
      label: '杜尔伯特蒙古族自治县'
    }]
  }, {
    value: '230700',
    label: '伊春市',
    children: [{
      value: '230702',
      label: '伊春区'
    }, {
      value: '230703',
      label: '南岔区'
    }, {
      value: '230704',
      label: '友好区'
    }, {
      value: '230705',
      label: '西林区'
    }, {
      value: '230706',
      label: '翠峦区'
    }, {
      value: '230707',
      label: '新青区'
    }, {
      value: '230708',
      label: '美溪区'
    }, {
      value: '230709',
      label: '金山屯区'
    }, {
      value: '230710',
      label: '五营区'
    }, {
      value: '230711',
      label: '乌马河区'
    }, {
      value: '230712',
      label: '汤旺河区'
    }, {
      value: '230713',
      label: '带岭区'
    }, {
      value: '230714',
      label: '乌伊岭区'
    }, {
      value: '230715',
      label: '红星区'
    }, {
      value: '230716',
      label: '上甘岭区'
    }, {
      value: '230722',
      label: '嘉荫县'
    }, {
      value: '230781',
      label: '铁力市'
    }]
  }, {
    value: '230800',
    label: '佳木斯市',
    children: [{
      value: '230803',
      label: '向阳区'
    }, {
      value: '230804',
      label: '前进区'
    }, {
      value: '230805',
      label: '东风区'
    }, {
      value: '230811',
      label: '郊　区'
    }, {
      value: '230822',
      label: '桦南县'
    }, {
      value: '230826',
      label: '桦川县'
    }, {
      value: '230828',
      label: '汤原县'
    }, {
      value: '230833',
      label: '抚远县'
    }, {
      value: '230881',
      label: '同江市'
    }, {
      value: '230882',
      label: '富锦市'
    }]
  }, {
    value: '230900',
    label: '七台河市',
    children: [{
      value: '230902',
      label: '新兴区'
    }, {
      value: '230903',
      label: '桃山区'
    }, {
      value: '230904',
      label: '茄子河区'
    }, {
      value: '230921',
      label: '勃利县'
    }]
  }, {
    value: '231000',
    label: '牡丹江市',
    children: [{
      value: '231002',
      label: '东安区'
    }, {
      value: '231003',
      label: '阳明区'
    }, {
      value: '231004',
      label: '爱民区'
    }, {
      value: '231005',
      label: '西安区'
    }, {
      value: '231024',
      label: '东宁县'
    }, {
      value: '231025',
      label: '林口县'
    }, {
      value: '231081',
      label: '绥芬河市'
    }, {
      value: '231083',
      label: '海林市'
    }, {
      value: '231084',
      label: '宁安市'
    }, {
      value: '231085',
      label: '穆棱市'
    }]
  }, {
    value: '231100',
    label: '黑河市',
    children: [{
      value: '231102',
      label: '爱辉区'
    }, {
      value: '231121',
      label: '嫩江县'
    }, {
      value: '231123',
      label: '逊克县'
    }, {
      value: '231124',
      label: '孙吴县'
    }, {
      value: '231181',
      label: '北安市'
    }, {
      value: '231182',
      label: '五大连池市'
    }]
  }, {
    value: '231200',
    label: '绥化市',
    children: [{
      value: '231202',
      label: '北林区'
    }, {
      value: '231221',
      label: '望奎县'
    }, {
      value: '231222',
      label: '兰西县'
    }, {
      value: '231223',
      label: '青冈县'
    }, {
      value: '231224',
      label: '庆安县'
    }, {
      value: '231225',
      label: '明水县'
    }, {
      value: '231226',
      label: '绥棱县'
    }, {
      value: '231281',
      label: '安达市'
    }, {
      value: '231282',
      label: '肇东市'
    }, {
      value: '231283',
      label: '海伦市'
    }]
  }, {
    value: '232700',
    label: '大兴安岭地区',
    children: [{
      value: '232721',
      label: '呼玛县'
    }, {
      value: '232722',
      label: '塔河县'
    }, {
      value: '232723',
      label: '漠河县'
    }]
  }]
}, {
  value: '310000',
  label: '上海市',
  children: [{
    value: '310100',
    label: '上海市',
    children: [{
      value: '310101',
      label: '黄浦区'
    }, {
      value: '310104',
      label: '徐汇区'
    }, {
      value: '310105',
      label: '长宁区'
    }, {
      value: '310106',
      label: '静安区'
    }, {
      value: '310107',
      label: '普陀区'
    }, {
      value: '310109',
      label: '虹口区'
    }, {
      value: '310110',
      label: '杨浦区'
    }, {
      value: '310112',
      label: '闵行区'
    }, {
      value: '310113',
      label: '宝山区'
    }, {
      value: '310114',
      label: '嘉定区'
    }, {
      value: '310115',
      label: '浦东新区'
    }, {
      value: '310116',
      label: '金山区'
    }, {
      value: '310117',
      label: '松江区'
    }, {
      value: '310118',
      label: '青浦区'
    }, {
      value: '310120',
      label: '奉贤区'
    }, {
      value: '310230',
      label: '崇明区'
    }]
  }]
}, {
  value: '320000',
  label: '江苏省',
  children: [{
    value: '320100',
    label: '南京市',
    children: [{
      value: '320102',
      label: '玄武区'
    }, {
      value: '320104',
      label: '秦淮区'
    }, {
      value: '320105',
      label: '建邺区'
    }, {
      value: '320106',
      label: '鼓楼区'
    }, {
      value: '320111',
      label: '浦口区'
    }, {
      value: '320113',
      label: '栖霞区'
    }, {
      value: '320114',
      label: '雨花台区'
    }, {
      value: '320115',
      label: '江宁区'
    }, {
      value: '320116',
      label: '六合区'
    }, {
      value: '320124',
      label: '溧水区'
    }, {
      value: '320125',
      label: '高淳区'
    }]
  }, {
    value: '320200',
    label: '无锡市',
    children: [{
      value: '320202',
      label: '崇安区'
    }, {
      value: '320203',
      label: '南长区'
    }, {
      value: '320204',
      label: '北塘区'
    }, {
      value: '320205',
      label: '锡山区'
    }, {
      value: '320206',
      label: '惠山区'
    }, {
      value: '320211',
      label: '滨湖区'
    }, {
      value: '320281',
      label: '江阴市'
    }, {
      value: '320282',
      label: '宜兴市'
    }]
  }, {
    value: '320300',
    label: '徐州市',
    children: [{
      value: '320302',
      label: '鼓楼区'
    }, {
      value: '320303',
      label: '云龙区'
    }, {
      value: '320305',
      label: '贾汪区'
    }, {
      value: '320311',
      label: '泉山区'
    }, {
      value: '320312',
      label: '铜山区'
    }, {
      value: '320321',
      label: '丰　县'
    }, {
      value: '320322',
      label: '沛　县'
    }, {
      value: '320324',
      label: '睢宁县'
    }, {
      value: '320381',
      label: '新沂市'
    }, {
      value: '320382',
      label: '邳州市'
    }]
  }, {
    value: '320400',
    label: '常州市',
    children: [{
      value: '320402',
      label: '天宁区'
    }, {
      value: '320404',
      label: '钟楼区'
    }, {
      value: '320411',
      label: '新北区'
    }, {
      value: '320412',
      label: '武进区'
    }, {
      value: '320413',
      label: '金坛区'
    }, {
      value: '320481',
      label: '溧阳市'
    }]
  }, {
    value: '320500',
    label: '苏州市',
    children: [{
      value: '320505',
      label: '虎丘区'
    }, {
      value: '320506',
      label: '吴中区'
    }, {
      value: '320507',
      label: '相城区'
    }, {
      value: '320508',
      label: '姑苏区'
    }, {
      value: '320509',
      label: '吴江区'
    }, {
      value: '320581',
      label: '常熟市'
    }, {
      value: '320582',
      label: '张家港市'
    }, {
      value: '320583',
      label: '昆山市'
    }, {
      value: '320585',
      label: '太仓市'
    }]
  }, {
    value: '320600',
    label: '南通市',
    children: [{
      value: '320602',
      label: '崇川区'
    }, {
      value: '320611',
      label: '港闸区'
    }, {
      value: '320612',
      label: '通州区'
    }, {
      value: '320621',
      label: '海安县'
    }, {
      value: '320623',
      label: '如东县'
    }, {
      value: '320681',
      label: '启东市'
    }, {
      value: '320682',
      label: '如皋市'
    }, {
      value: '320684',
      label: '海门市'
    }]
  }, {
    value: '320700',
    label: '连云港市',
    children: [{
      value: '320703',
      label: '连云区'
    }, {
      value: '320706',
      label: '海州区'
    }, {
      value: '320707',
      label: '赣榆县'
    }, {
      value: '320722',
      label: '东海县'
    }, {
      value: '320723',
      label: '灌云县'
    }, {
      value: '320724',
      label: '灌南县'
    }]
  }, {
    value: '320800',
    label: '淮安市',
    children: [{
      value: '320802',
      label: '清河区'
    }, {
      value: '320803',
      label: '淮安区'
    }, {
      value: '320804',
      label: '淮阴区'
    }, {
      value: '320811',
      label: '清浦区'
    }, {
      value: '320826',
      label: '涟水县'
    }, {
      value: '320829',
      label: '洪泽县'
    }, {
      value: '320830',
      label: '盱眙县'
    }, {
      value: '320831',
      label: '金湖县'
    }]
  }, {
    value: '320900',
    label: '盐城市',
    children: [{
      value: '320902',
      label: '亭湖区'
    }, {
      value: '320903',
      label: '盐都区'
    }, {
      value: '320904',
      label: '大丰市'
    }, {
      value: '320921',
      label: '响水县'
    }, {
      value: '320922',
      label: '滨海县'
    }, {
      value: '320923',
      label: '阜宁县'
    }, {
      value: '320924',
      label: '射阳县'
    }, {
      value: '320925',
      label: '建湖县'
    }, {
      value: '320981',
      label: '东台市'
    }]
  }, {
    value: '321000',
    label: '扬州市',
    children: [{
      value: '321002',
      label: '广陵区'
    }, {
      value: '321003',
      label: '邗江区'
    }, {
      value: '321012',
      label: '江都区'
    }, {
      value: '321023',
      label: '宝应县'
    }, {
      value: '321081',
      label: '仪征市'
    }, {
      value: '321084',
      label: '高邮市'
    }]
  }, {
    value: '321100',
    label: '镇江市',
    children: [{
      value: '321102',
      label: '京口区'
    }, {
      value: '321111',
      label: '润州区'
    }, {
      value: '321112',
      label: '丹徒区'
    }, {
      value: '321181',
      label: '丹阳市'
    }, {
      value: '321182',
      label: '扬中市'
    }, {
      value: '321183',
      label: '句容市'
    }]
  }, {
    value: '321200',
    label: '泰州市',
    children: [{
      value: '321202',
      label: '海陵区'
    }, {
      value: '321203',
      label: '高港区'
    }, {
      value: '321204',
      label: '姜堰区'
    }, {
      value: '321281',
      label: '兴化市'
    }, {
      value: '321282',
      label: '靖江市'
    }, {
      value: '321283',
      label: '泰兴市'
    }]
  }, {
    value: '321300',
    label: '宿迁市',
    children: [{
      value: '321302',
      label: '宿城区'
    }, {
      value: '321311',
      label: '宿豫区'
    }, {
      value: '321322',
      label: '沭阳县'
    }, {
      value: '321323',
      label: '泗阳县'
    }, {
      value: '321324',
      label: '泗洪县'
    }]
  }]
}, {
  value: '330000',
  label: '浙江省',
  children: [{
    value: '330100',
    label: '杭州市',
    children: [{
      value: '330102',
      label: '上城区'
    }, {
      value: '330103',
      label: '下城区'
    }, {
      value: '330104',
      label: '江干区'
    }, {
      value: '330105',
      label: '拱墅区'
    }, {
      value: '330106',
      label: '西湖区'
    }, {
      value: '330108',
      label: '滨江区'
    }, {
      value: '330109',
      label: '萧山区'
    }, {
      value: '330110',
      label: '余杭区'
    }, {
      value: '330111',
      label: '富阳区'
    }, {
      value: '330122',
      label: '桐庐县'
    }, {
      value: '330127',
      label: '淳安县'
    }, {
      value: '330182',
      label: '建德市'
    }, {
      value: '330185',
      label: '临安市'
    }]
  }, {
    value: '330200',
    label: '宁波市',
    children: [{
      value: '330203',
      label: '海曙区'
    }, {
      value: '330204',
      label: '江东区'
    }, {
      value: '330205',
      label: '江北区'
    }, {
      value: '330206',
      label: '北仑区'
    }, {
      value: '330211',
      label: '镇海区'
    }, {
      value: '330212',
      label: '鄞州区'
    }, {
      value: '330225',
      label: '象山县'
    }, {
      value: '330226',
      label: '宁海县'
    }, {
      value: '330281',
      label: '余姚市'
    }, {
      value: '330282',
      label: '慈溪市'
    }, {
      value: '330283',
      label: '奉化市'
    }]
  }, {
    value: '330300',
    label: '温州市',
    children: [{
      value: '330302',
      label: '鹿城区'
    }, {
      value: '330303',
      label: '龙湾区'
    }, {
      value: '330304',
      label: '瓯海区'
    }, {
      value: '330305',
      label: '洞头区'
    }, {
      value: '330324',
      label: '永嘉县'
    }, {
      value: '330326',
      label: '平阳县'
    }, {
      value: '330327',
      label: '苍南县'
    }, {
      value: '330328',
      label: '文成县'
    }, {
      value: '330329',
      label: '泰顺县'
    }, {
      value: '330381',
      label: '瑞安市'
    }, {
      value: '330382',
      label: '乐清市'
    }]
  }, {
    value: '330400',
    label: '嘉兴市',
    children: [{
      value: '330402',
      label: '南湖区'
    }, {
      value: '330411',
      label: '秀洲区'
    }, {
      value: '330421',
      label: '嘉善县'
    }, {
      value: '330424',
      label: '海盐县'
    }, {
      value: '330481',
      label: '海宁市'
    }, {
      value: '330482',
      label: '平湖市'
    }, {
      value: '330483',
      label: '桐乡市'
    }]
  }, {
    value: '330500',
    label: '湖州市',
    children: [{
      value: '330502',
      label: '吴兴区'
    }, {
      value: '330503',
      label: '南浔区'
    }, {
      value: '330521',
      label: '德清县'
    }, {
      value: '330522',
      label: '长兴县'
    }, {
      value: '330523',
      label: '安吉县'
    }]
  }, {
    value: '330600',
    label: '绍兴市',
    children: [{
      value: '330602',
      label: '越城区'
    }, {
      value: '330603',
      label: '柯桥区'
    }, {
      value: '330604',
      label: '上虞区'
    }, {
      value: '330624',
      label: '新昌县'
    }, {
      value: '330681',
      label: '诸暨市'
    }, {
      value: '330683',
      label: '嵊州市'
    }]
  }, {
    value: '330700',
    label: '金华市',
    children: [{
      value: '330702',
      label: '婺城区'
    }, {
      value: '330703',
      label: '金东区'
    }, {
      value: '330723',
      label: '武义县'
    }, {
      value: '330726',
      label: '浦江县'
    }, {
      value: '330727',
      label: '磐安县'
    }, {
      value: '330781',
      label: '兰溪市'
    }, {
      value: '330782',
      label: '义乌市'
    }, {
      value: '330783',
      label: '东阳市'
    }, {
      value: '330784',
      label: '永康市'
    }]
  }, {
    value: '330800',
    label: '衢州市',
    children: [{
      value: '330802',
      label: '柯城区'
    }, {
      value: '330803',
      label: '衢江区'
    }, {
      value: '330822',
      label: '常山县'
    }, {
      value: '330824',
      label: '开化县'
    }, {
      value: '330825',
      label: '龙游县'
    }, {
      value: '330881',
      label: '江山市'
    }]
  }, {
    value: '330900',
    label: '舟山市',
    children: [{
      value: '330902',
      label: '定海区'
    }, {
      value: '330903',
      label: '普陀区'
    }, {
      value: '330921',
      label: '岱山县'
    }, {
      value: '330922',
      label: '嵊泗县'
    }]
  }, {
    value: '331000',
    label: '台州市',
    children: [{
      value: '331002',
      label: '椒江区'
    }, {
      value: '331003',
      label: '黄岩区'
    }, {
      value: '331004',
      label: '路桥区'
    }, {
      value: '331021',
      label: '玉环县'
    }, {
      value: '331022',
      label: '三门县'
    }, {
      value: '331023',
      label: '天台县'
    }, {
      value: '331024',
      label: '仙居县'
    }, {
      value: '331081',
      label: '温岭市'
    }, {
      value: '331082',
      label: '临海市'
    }]
  }, {
    value: '331100',
    label: '丽水市',
    children: [{
      value: '331102',
      label: '莲都区'
    }, {
      value: '331121',
      label: '青田县'
    }, {
      value: '331122',
      label: '缙云县'
    }, {
      value: '331123',
      label: '遂昌县'
    }, {
      value: '331124',
      label: '松阳县'
    }, {
      value: '331125',
      label: '云和县'
    }, {
      value: '331126',
      label: '庆元县'
    }, {
      value: '331127',
      label: '景宁畲族自治县'
    }, {
      value: '331181',
      label: '龙泉市'
    }]
  }]
}, {
  value: '340000',
  label: '安徽省',
  children: [{
    value: '340100',
    label: '合肥市',
    children: [{
      value: '340102',
      label: '瑶海区'
    }, {
      value: '340103',
      label: '庐阳区'
    }, {
      value: '340104',
      label: '蜀山区'
    }, {
      value: '340111',
      label: '包河区'
    }, {
      value: '340121',
      label: '长丰县'
    }, {
      value: '340122',
      label: '肥东县'
    }, {
      value: '340123',
      label: '肥西县'
    }, {
      value: '340124',
      label: '庐江县'
    }, {
      value: '340181',
      label: '巢湖市'
    }]
  }, {
    value: '340200',
    label: '芜湖市',
    children: [{
      value: '340202',
      label: '镜湖区'
    }, {
      value: '340203',
      label: '弋江区'
    }, {
      value: '340207',
      label: '鸠江区'
    }, {
      value: '340208',
      label: '三山区'
    }, {
      value: '340221',
      label: '芜湖县'
    }, {
      value: '340222',
      label: '繁昌县'
    }, {
      value: '340223',
      label: '南陵县'
    }, {
      value: '340225',
      label: '无为县'
    }]
  }, {
    value: '340300',
    label: '蚌埠市',
    children: [{
      value: '340302',
      label: '龙子湖区'
    }, {
      value: '340303',
      label: '蚌山区'
    }, {
      value: '340304',
      label: '禹会区'
    }, {
      value: '340311',
      label: '淮上区'
    }, {
      value: '340321',
      label: '怀远县'
    }, {
      value: '340322',
      label: '五河县'
    }, {
      value: '340323',
      label: '固镇县'
    }]
  }, {
    value: '340400',
    label: '淮南市',
    children: [{
      value: '340402',
      label: '大通区'
    }, {
      value: '340403',
      label: '田家庵区'
    }, {
      value: '340404',
      label: '谢家集区'
    }, {
      value: '340405',
      label: '八公山区'
    }, {
      value: '340406',
      label: '潘集区'
    }, {
      value: '340421',
      label: '凤台县'
    }]
  }, {
    value: '340500',
    label: '马鞍山市',
    children: [{
      value: '340503',
      label: '花山区'
    }, {
      value: '340504',
      label: '雨山区'
    }, {
      value: '340506',
      label: '博望区'
    }, {
      value: '340521',
      label: '当涂县'
    }, {
      value: '340522',
      label: '含山县'
    }, {
      value: '340523',
      label: '和县'
    }]
  }, {
    value: '340600',
    label: '淮北市',
    children: [{
      value: '340602',
      label: '杜集区'
    }, {
      value: '340603',
      label: '相山区'
    }, {
      value: '340604',
      label: '烈山区'
    }, {
      value: '340621',
      label: '濉溪县'
    }]
  }, {
    value: '340700',
    label: '铜陵市',
    children: [{
      value: '340702',
      label: '铜官山区'
    }, {
      value: '340703',
      label: '狮子山区'
    }, {
      value: '340711',
      label: '郊　区'
    }, {
      value: '340721',
      label: '铜陵县'
    }]
  }, {
    value: '340800',
    label: '安庆市',
    children: [{
      value: '340802',
      label: '迎江区'
    }, {
      value: '340803',
      label: '大观区'
    }, {
      value: '340811',
      label: '宜秀区'
    }, {
      value: '340822',
      label: '怀宁县'
    }, {
      value: '340823',
      label: '枞阳县'
    }, {
      value: '340824',
      label: '潜山县'
    }, {
      value: '340825',
      label: '太湖县'
    }, {
      value: '340826',
      label: '宿松县'
    }, {
      value: '340827',
      label: '望江县'
    }, {
      value: '340828',
      label: '岳西县'
    }, {
      value: '340881',
      label: '桐城市'
    }]
  }, {
    value: '341000',
    label: '黄山市',
    children: [{
      value: '341002',
      label: '屯溪区'
    }, {
      value: '341003',
      label: '黄山区'
    }, {
      value: '341004',
      label: '徽州区'
    }, {
      value: '341021',
      label: '歙　县'
    }, {
      value: '341022',
      label: '休宁县'
    }, {
      value: '341023',
      label: '黟　县'
    }, {
      value: '341024',
      label: '祁门县'
    }]
  }, {
    value: '341100',
    label: '滁州市',
    children: [{
      value: '341102',
      label: '琅琊区'
    }, {
      value: '341103',
      label: '南谯区'
    }, {
      value: '341122',
      label: '来安县'
    }, {
      value: '341124',
      label: '全椒县'
    }, {
      value: '341125',
      label: '定远县'
    }, {
      value: '341126',
      label: '凤阳县'
    }, {
      value: '341181',
      label: '天长市'
    }, {
      value: '341182',
      label: '明光市'
    }]
  }, {
    value: '341200',
    label: '阜阳市',
    children: [{
      value: '341202',
      label: '颍州区'
    }, {
      value: '341203',
      label: '颍东区'
    }, {
      value: '341204',
      label: '颍泉区'
    }, {
      value: '341221',
      label: '临泉县'
    }, {
      value: '341222',
      label: '太和县'
    }, {
      value: '341225',
      label: '阜南县'
    }, {
      value: '341226',
      label: '颍上县'
    }, {
      value: '341282',
      label: '界首市'
    }]
  }, {
    value: '341300',
    label: '宿州市',
    children: [{
      value: '341302',
      label: '墉桥区'
    }, {
      value: '341321',
      label: '砀山县'
    }, {
      value: '341322',
      label: '萧　县'
    }, {
      value: '341323',
      label: '灵璧县'
    }, {
      value: '341324',
      label: '泗　县'
    }]
  }, {
    value: '341500',
    label: '六安市',
    children: [{
      value: '341502',
      label: '金安区'
    }, {
      value: '341503',
      label: '裕安区'
    }, {
      value: '341521',
      label: '寿　县'
    }, {
      value: '341522',
      label: '霍邱县'
    }, {
      value: '341523',
      label: '舒城县'
    }, {
      value: '341524',
      label: '金寨县'
    }, {
      value: '341525',
      label: '霍山县'
    }]
  }, {
    value: '341600',
    label: '亳州市',
    children: [{
      value: '341602',
      label: '谯城区'
    }, {
      value: '341621',
      label: '涡阳县'
    }, {
      value: '341622',
      label: '蒙城县'
    }, {
      value: '341623',
      label: '利辛县'
    }]
  }, {
    value: '341700',
    label: '池州市',
    children: [{
      value: '341702',
      label: '贵池区'
    }, {
      value: '341721',
      label: '东至县'
    }, {
      value: '341722',
      label: '石台县'
    }, {
      value: '341723',
      label: '青阳县'
    }]
  }, {
    value: '341800',
    label: '宣城市',
    children: [{
      value: '341802',
      label: '宣州区'
    }, {
      value: '341821',
      label: '郎溪县'
    }, {
      value: '341822',
      label: '广德县'
    }, {
      value: '341823',
      label: '泾　县'
    }, {
      value: '341824',
      label: '绩溪县'
    }, {
      value: '341825',
      label: '旌德县'
    }, {
      value: '341881',
      label: '宁国市'
    }]
  }]
}, {
  value: '350000',
  label: '福建省',
  children: [{
    value: '350100',
    label: '福州市',
    children: [{
      value: '350102',
      label: '鼓楼区'
    }, {
      value: '350103',
      label: '台江区'
    }, {
      value: '350104',
      label: '仓山区'
    }, {
      value: '350105',
      label: '马尾区'
    }, {
      value: '350111',
      label: '晋安区'
    }, {
      value: '350121',
      label: '闽侯县'
    }, {
      value: '350122',
      label: '连江县'
    }, {
      value: '350123',
      label: '罗源县'
    }, {
      value: '350124',
      label: '闽清县'
    }, {
      value: '350125',
      label: '永泰县'
    }, {
      value: '350128',
      label: '平潭县'
    }, {
      value: '350181',
      label: '福清市'
    }, {
      value: '350182',
      label: '长乐市'
    }]
  }, {
    value: '350200',
    label: '厦门市',
    children: [{
      value: '350203',
      label: '思明区'
    }, {
      value: '350205',
      label: '海沧区'
    }, {
      value: '350206',
      label: '湖里区'
    }, {
      value: '350211',
      label: '集美区'
    }, {
      value: '350212',
      label: '同安区'
    }, {
      value: '350213',
      label: '翔安区'
    }]
  }, {
    value: '350300',
    label: '莆田市',
    children: [{
      value: '350302',
      label: '城厢区'
    }, {
      value: '350303',
      label: '涵江区'
    }, {
      value: '350304',
      label: '荔城区'
    }, {
      value: '350305',
      label: '秀屿区'
    }, {
      value: '350322',
      label: '仙游县'
    }]
  }, {
    value: '350400',
    label: '三明市',
    children: [{
      value: '350402',
      label: '梅列区'
    }, {
      value: '350403',
      label: '三元区'
    }, {
      value: '350421',
      label: '明溪县'
    }, {
      value: '350423',
      label: '清流县'
    }, {
      value: '350424',
      label: '宁化县'
    }, {
      value: '350425',
      label: '大田县'
    }, {
      value: '350426',
      label: '尤溪县'
    }, {
      value: '350427',
      label: '沙　县'
    }, {
      value: '350428',
      label: '将乐县'
    }, {
      value: '350429',
      label: '泰宁县'
    }, {
      value: '350430',
      label: '建宁县'
    }, {
      value: '350481',
      label: '永安市'
    }]
  }, {
    value: '350500',
    label: '泉州市',
    children: [{
      value: '350502',
      label: '鲤城区'
    }, {
      value: '350503',
      label: '丰泽区'
    }, {
      value: '350504',
      label: '洛江区'
    }, {
      value: '350505',
      label: '泉港区'
    }, {
      value: '350521',
      label: '惠安县'
    }, {
      value: '350524',
      label: '安溪县'
    }, {
      value: '350525',
      label: '永春县'
    }, {
      value: '350526',
      label: '德化县'
    }, {
      value: '350527',
      label: '金门县'
    }, {
      value: '350581',
      label: '石狮市'
    }, {
      value: '350582',
      label: '晋江市'
    }, {
      value: '350583',
      label: '南安市'
    }]
  }, {
    value: '350600',
    label: '漳州市',
    children: [{
      value: '350602',
      label: '芗城区'
    }, {
      value: '350603',
      label: '龙文区'
    }, {
      value: '350622',
      label: '云霄县'
    }, {
      value: '350623',
      label: '漳浦县'
    }, {
      value: '350624',
      label: '诏安县'
    }, {
      value: '350625',
      label: '长泰县'
    }, {
      value: '350626',
      label: '东山县'
    }, {
      value: '350627',
      label: '南靖县'
    }, {
      value: '350628',
      label: '平和县'
    }, {
      value: '350629',
      label: '华安县'
    }, {
      value: '350681',
      label: '龙海市'
    }]
  }, {
    value: '350700',
    label: '南平市',
    children: [{
      value: '350702',
      label: '延平区'
    }, {
      value: '350703',
      label: '建阳区'
    }, {
      value: '350721',
      label: '顺昌县'
    }, {
      value: '350722',
      label: '浦城县'
    }, {
      value: '350723',
      label: '光泽县'
    }, {
      value: '350724',
      label: '松溪县'
    }, {
      value: '350725',
      label: '政和县'
    }, {
      value: '350781',
      label: '邵武市'
    }, {
      value: '350782',
      label: '武夷山市'
    }, {
      value: '350783',
      label: '建瓯市'
    }]
  }, {
    value: '350800',
    label: '龙岩市',
    children: [{
      value: '350802',
      label: '新罗区'
    }, {
      value: '350803',
      label: '永定区'
    }, {
      value: '350821',
      label: '长汀县'
    }, {
      value: '350823',
      label: '上杭县'
    }, {
      value: '350824',
      label: '武平县'
    }, {
      value: '350825',
      label: '连城县'
    }, {
      value: '350881',
      label: '漳平市'
    }]
  }, {
    value: '350900',
    label: '宁德市',
    children: [{
      value: '350902',
      label: '蕉城区'
    }, {
      value: '350921',
      label: '霞浦县'
    }, {
      value: '350922',
      label: '古田县'
    }, {
      value: '350923',
      label: '屏南县'
    }, {
      value: '350924',
      label: '寿宁县'
    }, {
      value: '350925',
      label: '周宁县'
    }, {
      value: '350926',
      label: '柘荣县'
    }, {
      value: '350981',
      label: '福安市'
    }, {
      value: '350982',
      label: '福鼎市'
    }]
  }]
}, {
  value: '360000',
  label: '江西省',
  children: [{
    value: '360100',
    label: '南昌市',
    children: [{
      value: '360102',
      label: '东湖区'
    }, {
      value: '360103',
      label: '西湖区'
    }, {
      value: '360104',
      label: '青云谱区'
    }, {
      value: '360105',
      label: '湾里区'
    }, {
      value: '360111',
      label: '青山湖区'
    }, {
      value: '360112',
      label: '新建区'
    }, {
      value: '360121',
      label: '南昌县'
    }, {
      value: '360123',
      label: '安义县'
    }, {
      value: '360124',
      label: '进贤县'
    }]
  }, {
    value: '360200',
    label: '景德镇市',
    children: [{
      value: '360202',
      label: '昌江区'
    }, {
      value: '360203',
      label: '珠山区'
    }, {
      value: '360222',
      label: '浮梁县'
    }, {
      value: '360281',
      label: '乐平市'
    }]
  }, {
    value: '360300',
    label: '萍乡市',
    children: [{
      value: '360302',
      label: '安源区'
    }, {
      value: '360313',
      label: '湘东区'
    }, {
      value: '360321',
      label: '莲花县'
    }, {
      value: '360322',
      label: '上栗县'
    }, {
      value: '360323',
      label: '芦溪县'
    }]
  }, {
    value: '360400',
    label: '九江市',
    children: [{
      value: '360402',
      label: '庐山区'
    }, {
      value: '360403',
      label: '浔阳区'
    }, {
      value: '360421',
      label: '九江县'
    }, {
      value: '360423',
      label: '武宁县'
    }, {
      value: '360424',
      label: '修水县'
    }, {
      value: '360425',
      label: '永修县'
    }, {
      value: '360426',
      label: '德安县'
    }, {
      value: '360427',
      label: '星子县'
    }, {
      value: '360428',
      label: '都昌县'
    }, {
      value: '360429',
      label: '湖口县'
    }, {
      value: '360430',
      label: '彭泽县'
    }, {
      value: '360481',
      label: '瑞昌市'
    }, {
      value: '360482',
      label: '共青城市'
    }]
  }, {
    value: '360500',
    label: '新余市',
    children: [{
      value: '360502',
      label: '渝水区'
    }, {
      value: '360521',
      label: '分宜县'
    }]
  }, {
    value: '360600',
    label: '鹰潭市',
    children: [{
      value: '360602',
      label: '月湖区'
    }, {
      value: '360622',
      label: '余江县'
    }, {
      value: '360681',
      label: '贵溪市'
    }]
  }, {
    value: '360700',
    label: '赣州市',
    children: [{
      value: '360702',
      label: '章贡区'
    }, {
      value: '360703',
      label: '南康区'
    }, {
      value: '360721',
      label: '赣　县'
    }, {
      value: '360722',
      label: '信丰县'
    }, {
      value: '360723',
      label: '大余县'
    }, {
      value: '360724',
      label: '上犹县'
    }, {
      value: '360725',
      label: '崇义县'
    }, {
      value: '360726',
      label: '安远县'
    }, {
      value: '360727',
      label: '龙南县'
    }, {
      value: '360728',
      label: '定南县'
    }, {
      value: '360729',
      label: '全南县'
    }, {
      value: '360730',
      label: '宁都县'
    }, {
      value: '360731',
      label: '于都县'
    }, {
      value: '360732',
      label: '兴国县'
    }, {
      value: '360733',
      label: '会昌县'
    }, {
      value: '360734',
      label: '寻乌县'
    }, {
      value: '360735',
      label: '石城县'
    }, {
      value: '360781',
      label: '瑞金市'
    }]
  }, {
    value: '360800',
    label: '吉安市',
    children: [{
      value: '360802',
      label: '吉州区'
    }, {
      value: '360803',
      label: '青原区'
    }, {
      value: '360821',
      label: '吉安县'
    }, {
      value: '360822',
      label: '吉水县'
    }, {
      value: '360823',
      label: '峡江县'
    }, {
      value: '360824',
      label: '新干县'
    }, {
      value: '360825',
      label: '永丰县'
    }, {
      value: '360826',
      label: '泰和县'
    }, {
      value: '360827',
      label: '遂川县'
    }, {
      value: '360828',
      label: '万安县'
    }, {
      value: '360829',
      label: '安福县'
    }, {
      value: '360830',
      label: '永新县'
    }, {
      value: '360881',
      label: '井冈山市'
    }]
  }, {
    value: '360900',
    label: '宜春市',
    children: [{
      value: '360902',
      label: '袁州区'
    }, {
      value: '360921',
      label: '奉新县'
    }, {
      value: '360922',
      label: '万载县'
    }, {
      value: '360923',
      label: '上高县'
    }, {
      value: '360924',
      label: '宜丰县'
    }, {
      value: '360925',
      label: '靖安县'
    }, {
      value: '360926',
      label: '铜鼓县'
    }, {
      value: '360981',
      label: '丰城市'
    }, {
      value: '360982',
      label: '樟树市'
    }, {
      value: '360983',
      label: '高安市'
    }]
  }, {
    value: '361000',
    label: '抚州市',
    children: [{
      value: '361002',
      label: '临川区'
    }, {
      value: '361021',
      label: '南城县'
    }, {
      value: '361022',
      label: '黎川县'
    }, {
      value: '361023',
      label: '南丰县'
    }, {
      value: '361024',
      label: '崇仁县'
    }, {
      value: '361025',
      label: '乐安县'
    }, {
      value: '361026',
      label: '宜黄县'
    }, {
      value: '361027',
      label: '金溪县'
    }, {
      value: '361028',
      label: '资溪县'
    }, {
      value: '361029',
      label: '东乡县'
    }, {
      value: '361030',
      label: '广昌县'
    }]
  }, {
    value: '361100',
    label: '上饶市',
    children: [{
      value: '361102',
      label: '信州区'
    }, {
      value: '361103',
      label: '广丰区'
    }, {
      value: '361121',
      label: '上饶县'
    }, {
      value: '361123',
      label: '玉山县'
    }, {
      value: '361124',
      label: '铅山县'
    }, {
      value: '361125',
      label: '横峰县'
    }, {
      value: '361126',
      label: '弋阳县'
    }, {
      value: '361127',
      label: '余干县'
    }, {
      value: '361128',
      label: '鄱阳县'
    }, {
      value: '361129',
      label: '万年县'
    }, {
      value: '361130',
      label: '婺源县'
    }, {
      value: '361181',
      label: '德兴市'
    }]
  }]
}, {
  value: '370000',
  label: '山东省',
  children: [{
    value: '370100',
    label: '济南市',
    children: [{
      value: '370102',
      label: '历下区'
    }, {
      value: '370103',
      label: '市中区'
    }, {
      value: '370104',
      label: '槐荫区'
    }, {
      value: '370105',
      label: '天桥区'
    }, {
      value: '370112',
      label: '历城区'
    }, {
      value: '370113',
      label: '长清区'
    }, {
      value: '370124',
      label: '平阴县'
    }, {
      value: '370125',
      label: '济阳县'
    }, {
      value: '370126',
      label: '商河县'
    }, {
      value: '370181',
      label: '章丘市'
    }]
  }, {
    value: '370200',
    label: '青岛市',
    children: [{
      value: '370202',
      label: '市南区'
    }, {
      value: '370203',
      label: '市北区'
    }, {
      value: '370205',
      label: '四方区'
    }, {
      value: '370211',
      label: '黄岛区'
    }, {
      value: '370212',
      label: '崂山区'
    }, {
      value: '370213',
      label: '李沧区'
    }, {
      value: '370214',
      label: '城阳区'
    }, {
      value: '370281',
      label: '胶州市'
    }, {
      value: '370282',
      label: '即墨市'
    }, {
      value: '370283',
      label: '平度市'
    }, {
      value: '370285',
      label: '莱西市'
    }]
  }, {
    value: '370300',
    label: '淄博市',
    children: [{
      value: '370302',
      label: '淄川区'
    }, {
      value: '370303',
      label: '张店区'
    }, {
      value: '370304',
      label: '博山区'
    }, {
      value: '370305',
      label: '临淄区'
    }, {
      value: '370306',
      label: '周村区'
    }, {
      value: '370321',
      label: '桓台县'
    }, {
      value: '370322',
      label: '高青县'
    }, {
      value: '370323',
      label: '沂源县'
    }]
  }, {
    value: '370400',
    label: '枣庄市',
    children: [{
      value: '370402',
      label: '市中区'
    }, {
      value: '370403',
      label: '薛城区'
    }, {
      value: '370404',
      label: '峄城区'
    }, {
      value: '370405',
      label: '台儿庄区'
    }, {
      value: '370406',
      label: '山亭区'
    }, {
      value: '370481',
      label: '滕州市'
    }]
  }, {
    value: '370500',
    label: '东营市',
    children: [{
      value: '370502',
      label: '东营区'
    }, {
      value: '370503',
      label: '河口区'
    }, {
      value: '370521',
      label: '垦利县'
    }, {
      value: '370522',
      label: '利津县'
    }, {
      value: '370523',
      label: '广饶县'
    }]
  }, {
    value: '370600',
    label: '烟台市',
    children: [{
      value: '370602',
      label: '芝罘区'
    }, {
      value: '370611',
      label: '福山区'
    }, {
      value: '370612',
      label: '牟平区'
    }, {
      value: '370613',
      label: '莱山区'
    }, {
      value: '370634',
      label: '长岛县'
    }, {
      value: '370681',
      label: '龙口市'
    }, {
      value: '370682',
      label: '莱阳市'
    }, {
      value: '370683',
      label: '莱州市'
    }, {
      value: '370684',
      label: '蓬莱市'
    }, {
      value: '370685',
      label: '招远市'
    }, {
      value: '370686',
      label: '栖霞市'
    }, {
      value: '370687',
      label: '海阳市'
    }]
  }, {
    value: '370700',
    label: '潍坊市',
    children: [{
      value: '370702',
      label: '潍城区'
    }, {
      value: '370703',
      label: '寒亭区'
    }, {
      value: '370704',
      label: '坊子区'
    }, {
      value: '370705',
      label: '奎文区'
    }, {
      value: '370724',
      label: '临朐县'
    }, {
      value: '370725',
      label: '昌乐县'
    }, {
      value: '370781',
      label: '青州市'
    }, {
      value: '370782',
      label: '诸城市'
    }, {
      value: '370783',
      label: '寿光市'
    }, {
      value: '370784',
      label: '安丘市'
    }, {
      value: '370785',
      label: '高密市'
    }, {
      value: '370786',
      label: '昌邑市'
    }]
  }, {
    value: '370800',
    label: '济宁市',
    children: [{
      value: '370811',
      label: '任城区'
    }, {
      value: '370812',
      label: '兖州区'
    }, {
      value: '370826',
      label: '微山县'
    }, {
      value: '370827',
      label: '鱼台县'
    }, {
      value: '370828',
      label: '金乡县'
    }, {
      value: '370829',
      label: '嘉祥县'
    }, {
      value: '370830',
      label: '汶上县'
    }, {
      value: '370831',
      label: '泗水县'
    }, {
      value: '370832',
      label: '梁山县'
    }, {
      value: '370881',
      label: '曲阜市'
    }, {
      value: '370883',
      label: '邹城市'
    }]
  }, {
    value: '370900',
    label: '泰安市',
    children: [{
      value: '370902',
      label: '泰山区'
    }, {
      value: '370903',
      label: '岱岳区'
    }, {
      value: '370921',
      label: '宁阳县'
    }, {
      value: '370923',
      label: '东平县'
    }, {
      value: '370982',
      label: '新泰市'
    }, {
      value: '370983',
      label: '肥城市'
    }]
  }, {
    value: '371000',
    label: '威海市',
    children: [{
      value: '371002',
      label: '环翠区'
    }, {
      value: '371081',
      label: '文登区'
    }, {
      value: '371082',
      label: '荣成市'
    }, {
      value: '371083',
      label: '乳山市'
    }]
  }, {
    value: '371100',
    label: '日照市',
    children: [{
      value: '371102',
      label: '东港区'
    }, {
      value: '371103',
      label: '岚山区'
    }, {
      value: '371121',
      label: '五莲县'
    }, {
      value: '371122',
      label: '莒　县'
    }]
  }, {
    value: '371200',
    label: '莱芜市',
    children: [{
      value: '371202',
      label: '莱城区'
    }, {
      value: '371203',
      label: '钢城区'
    }]
  }, {
    value: '371300',
    label: '临沂市',
    children: [{
      value: '371302',
      label: '兰山区'
    }, {
      value: '371311',
      label: '罗庄区'
    }, {
      value: '371312',
      label: '河东区'
    }, {
      value: '371321',
      label: '沂南县'
    }, {
      value: '371322',
      label: '郯城县'
    }, {
      value: '371323',
      label: '沂水县'
    }, {
      value: '371324',
      label: '兰陵县'
    }, {
      value: '371325',
      label: '费　县'
    }, {
      value: '371326',
      label: '平邑县'
    }, {
      value: '371327',
      label: '莒南县'
    }, {
      value: '371328',
      label: '蒙阴县'
    }, {
      value: '371329',
      label: '临沭县'
    }]
  }, {
    value: '371400',
    label: '德州市',
    children: [{
      value: '371402',
      label: '德城区'
    }, {
      value: '371421',
      label: '陵城区'
    }, {
      value: '371422',
      label: '宁津县'
    }, {
      value: '371423',
      label: '庆云县'
    }, {
      value: '371424',
      label: '临邑县'
    }, {
      value: '371425',
      label: '齐河县'
    }, {
      value: '371426',
      label: '平原县'
    }, {
      value: '371427',
      label: '夏津县'
    }, {
      value: '371428',
      label: '武城县'
    }, {
      value: '371481',
      label: '乐陵市'
    }, {
      value: '371482',
      label: '禹城市'
    }]
  }, {
    value: '371500',
    label: '聊城市',
    children: [{
      value: '371502',
      label: '东昌府区'
    }, {
      value: '371521',
      label: '阳谷县'
    }, {
      value: '371522',
      label: '莘　县'
    }, {
      value: '371523',
      label: '茌平县'
    }, {
      value: '371524',
      label: '东阿县'
    }, {
      value: '371525',
      label: '冠　县'
    }, {
      value: '371526',
      label: '高唐县'
    }, {
      value: '371581',
      label: '临清市'
    }]
  }, {
    value: '371600',
    label: '滨州市',
    children: [{
      value: '371602',
      label: '滨城区'
    }, {
      value: '371603',
      label: '沾化区'
    }, {
      value: '371621',
      label: '惠民县'
    }, {
      value: '371622',
      label: '阳信县'
    }, {
      value: '371623',
      label: '无棣县'
    }, {
      value: '371625',
      label: '博兴县'
    }, {
      value: '371626',
      label: '邹平县'
    }]
  }, {
    value: '371700',
    label: '荷泽市',
    children: [{
      value: '371702',
      label: '牡丹区'
    }, {
      value: '371721',
      label: '曹 县'
    }, {
      value: '371722',
      label: '单 县'
    }, {
      value: '371723',
      label: '成武县'
    }, {
      value: '371724',
      label: '巨野县'
    }, {
      value: '371725',
      label: '郓城县'
    }, {
      value: '371726',
      label: '鄄城县'
    }, {
      value: '371727',
      label: '定陶县'
    }, {
      value: '371728',
      label: '东明县'
    }]
  }]
}, {
  value: '410000',
  label: '河南省',
  children: [{
    value: '410100',
    label: '郑州市',
    children: [{
      value: '410102',
      label: '中原区'
    }, {
      value: '410103',
      label: '二七区'
    }, {
      value: '410104',
      label: '管城回族区'
    }, {
      value: '410105',
      label: '金水区'
    }, {
      value: '410106',
      label: '上街区'
    }, {
      value: '410108',
      label: '惠济区'
    }, {
      value: '410122',
      label: '中牟县'
    }, {
      value: '410181',
      label: '巩义市'
    }, {
      value: '410182',
      label: '荥阳市'
    }, {
      value: '410183',
      label: '新密市'
    }, {
      value: '410184',
      label: '新郑市'
    }, {
      value: '410185',
      label: '登封市'
    }]
  }, {
    value: '410200',
    label: '开封市',
    children: [{
      value: '410202',
      label: '龙亭区'
    }, {
      value: '410203',
      label: '顺河回族区'
    }, {
      value: '410204',
      label: '鼓楼区'
    }, {
      value: '410205',
      label: '禹王台区'
    }, {
      value: '410211',
      label: '金明区'
    }, {
      value: '410212',
      label: '祥符区'
    }, {
      value: '410221',
      label: '杞　县'
    }, {
      value: '410222',
      label: '通许县'
    }, {
      value: '410223',
      label: '尉氏县'
    }, {
      value: '410224',
      label: '开封县'
    }, {
      value: '410225',
      label: '兰考县'
    }]
  }, {
    value: '410300',
    label: '洛阳市',
    children: [{
      value: '410302',
      label: '老城区'
    }, {
      value: '410303',
      label: '西工区'
    }, {
      value: '410304',
      label: '廛河回族区'
    }, {
      value: '410305',
      label: '涧西区'
    }, {
      value: '410306',
      label: '吉利区'
    }, {
      value: '410307',
      label: '洛龙区'
    }, {
      value: '410322',
      label: '孟津县'
    }, {
      value: '410323',
      label: '新安县'
    }, {
      value: '410324',
      label: '栾川县'
    }, {
      value: '410325',
      label: '嵩　县'
    }, {
      value: '410326',
      label: '汝阳县'
    }, {
      value: '410327',
      label: '宜阳县'
    }, {
      value: '410328',
      label: '洛宁县'
    }, {
      value: '410329',
      label: '伊川县'
    }, {
      value: '410381',
      label: '偃师市'
    }]
  }, {
    value: '410400',
    label: '平顶山市',
    children: [{
      value: '410402',
      label: '新华区'
    }, {
      value: '410403',
      label: '卫东区'
    }, {
      value: '410404',
      label: '石龙区'
    }, {
      value: '410411',
      label: '湛河区'
    }, {
      value: '410421',
      label: '宝丰县'
    }, {
      value: '410422',
      label: '叶　县'
    }, {
      value: '410423',
      label: '鲁山县'
    }, {
      value: '410425',
      label: '郏　县'
    }, {
      value: '410481',
      label: '舞钢市'
    }, {
      value: '410482',
      label: '汝州市'
    }]
  }, {
    value: '410500',
    label: '安阳市',
    children: [{
      value: '410502',
      label: '文峰区'
    }, {
      value: '410503',
      label: '北关区'
    }, {
      value: '410505',
      label: '殷都区'
    }, {
      value: '410506',
      label: '龙安区'
    }, {
      value: '410522',
      label: '安阳县'
    }, {
      value: '410523',
      label: '汤阴县'
    }, {
      value: '410526',
      label: '滑　县'
    }, {
      value: '410527',
      label: '内黄县'
    }, {
      value: '410581',
      label: '林州市'
    }]
  }, {
    value: '410600',
    label: '鹤壁市',
    children: [{
      value: '410602',
      label: '鹤山区'
    }, {
      value: '410603',
      label: '山城区'
    }, {
      value: '410611',
      label: '淇滨区'
    }, {
      value: '410621',
      label: '浚　县'
    }, {
      value: '410622',
      label: '淇　县'
    }]
  }, {
    value: '410700',
    label: '新乡市',
    children: [{
      value: '410702',
      label: '红旗区'
    }, {
      value: '410703',
      label: '卫滨区'
    }, {
      value: '410704',
      label: '凤泉区'
    }, {
      value: '410711',
      label: '牧野区'
    }, {
      value: '410721',
      label: '新乡县'
    }, {
      value: '410724',
      label: '获嘉县'
    }, {
      value: '410725',
      label: '原阳县'
    }, {
      value: '410726',
      label: '延津县'
    }, {
      value: '410727',
      label: '封丘县'
    }, {
      value: '410728',
      label: '长垣县'
    }, {
      value: '410781',
      label: '卫辉市'
    }, {
      value: '410782',
      label: '辉县市'
    }]
  }, {
    value: '410800',
    label: '焦作市',
    children: [{
      value: '410802',
      label: '解放区'
    }, {
      value: '410803',
      label: '中站区'
    }, {
      value: '410804',
      label: '马村区'
    }, {
      value: '410811',
      label: '山阳区'
    }, {
      value: '410821',
      label: '修武县'
    }, {
      value: '410822',
      label: '博爱县'
    }, {
      value: '410823',
      label: '武陟县'
    }, {
      value: '410825',
      label: '温　县'
    }, {
      value: '410882',
      label: '沁阳市'
    }, {
      value: '410883',
      label: '孟州市'
    }]
  }, {
    value: '410900',
    label: '濮阳市',
    children: [{
      value: '410902',
      label: '华龙区'
    }, {
      value: '410922',
      label: '清丰县'
    }, {
      value: '410923',
      label: '南乐县'
    }, {
      value: '410926',
      label: '范　县'
    }, {
      value: '410927',
      label: '台前县'
    }, {
      value: '410928',
      label: '濮阳县'
    }]
  }, {
    value: '411000',
    label: '许昌市',
    children: [{
      value: '411002',
      label: '魏都区'
    }, {
      value: '411023',
      label: '许昌县'
    }, {
      value: '411024',
      label: '鄢陵县'
    }, {
      value: '411025',
      label: '襄城县'
    }, {
      value: '411081',
      label: '禹州市'
    }, {
      value: '411082',
      label: '长葛市'
    }]
  }, {
    value: '411100',
    label: '漯河市',
    children: [{
      value: '411102',
      label: '源汇区'
    }, {
      value: '411103',
      label: '郾城区'
    }, {
      value: '411104',
      label: '召陵区'
    }, {
      value: '411121',
      label: '舞阳县'
    }, {
      value: '411122',
      label: '临颍县'
    }]
  }, {
    value: '411200',
    label: '三门峡市',
    children: [{
      value: '411202',
      label: '湖滨区'
    }, {
      value: '411221',
      label: '渑池县'
    }, {
      value: '411222',
      label: '陕　县'
    }, {
      value: '411224',
      label: '卢氏县'
    }, {
      value: '411281',
      label: '义马市'
    }, {
      value: '411282',
      label: '灵宝市'
    }]
  }, {
    value: '411300',
    label: '南阳市',
    children: [{
      value: '411302',
      label: '宛城区'
    }, {
      value: '411303',
      label: '卧龙区'
    }, {
      value: '411321',
      label: '南召县'
    }, {
      value: '411322',
      label: '方城县'
    }, {
      value: '411323',
      label: '西峡县'
    }, {
      value: '411324',
      label: '镇平县'
    }, {
      value: '411325',
      label: '内乡县'
    }, {
      value: '411326',
      label: '淅川县'
    }, {
      value: '411327',
      label: '社旗县'
    }, {
      value: '411328',
      label: '唐河县'
    }, {
      value: '411329',
      label: '新野县'
    }, {
      value: '411330',
      label: '桐柏县'
    }, {
      value: '411381',
      label: '邓州市'
    }]
  }, {
    value: '411400',
    label: '商丘市',
    children: [{
      value: '411402',
      label: '梁园区'
    }, {
      value: '411403',
      label: '睢阳区'
    }, {
      value: '411421',
      label: '民权县'
    }, {
      value: '411422',
      label: '睢　县'
    }, {
      value: '411423',
      label: '宁陵县'
    }, {
      value: '411424',
      label: '柘城县'
    }, {
      value: '411425',
      label: '虞城县'
    }, {
      value: '411426',
      label: '夏邑县'
    }, {
      value: '411481',
      label: '永城市'
    }]
  }, {
    value: '411500',
    label: '信阳市',
    children: [{
      value: '411502',
      label: '浉河区'
    }, {
      value: '411503',
      label: '平桥区'
    }, {
      value: '411521',
      label: '罗山县'
    }, {
      value: '411522',
      label: '光山县'
    }, {
      value: '411523',
      label: '新　县'
    }, {
      value: '411524',
      label: '商城县'
    }, {
      value: '411525',
      label: '固始县'
    }, {
      value: '411526',
      label: '潢川县'
    }, {
      value: '411527',
      label: '淮滨县'
    }, {
      value: '411528',
      label: '息　县'
    }]
  }, {
    value: '411600',
    label: '周口市',
    children: [{
      value: '411602',
      label: '川汇区'
    }, {
      value: '411621',
      label: '扶沟县'
    }, {
      value: '411622',
      label: '西华县'
    }, {
      value: '411623',
      label: '商水县'
    }, {
      value: '411624',
      label: '沈丘县'
    }, {
      value: '411625',
      label: '郸城县'
    }, {
      value: '411626',
      label: '淮阳县'
    }, {
      value: '411627',
      label: '太康县'
    }, {
      value: '411628',
      label: '鹿邑县'
    }, {
      value: '411681',
      label: '项城市'
    }]
  }, {
    value: '411700',
    label: '驻马店市',
    children: [{
      value: '411702',
      label: '驿城区'
    }, {
      value: '411721',
      label: '西平县'
    }, {
      value: '411722',
      label: '上蔡县'
    }, {
      value: '411723',
      label: '平舆县'
    }, {
      value: '411724',
      label: '正阳县'
    }, {
      value: '411725',
      label: '确山县'
    }, {
      value: '411726',
      label: '泌阳县'
    }, {
      value: '411727',
      label: '汝南县'
    }, {
      value: '411728',
      label: '遂平县'
    }, {
      value: '411729',
      label: '新蔡县'
    }]
  }, {
    value: '419000',
    label: '省直辖县级行政区划',
    children: [{
      value: '419001',
      label: '济源市'
    }]
  }]
}, {
  value: '420000',
  label: '湖北省',
  children: [{
    value: '420100',
    label: '武汉市',
    children: [{
      value: '420102',
      label: '江岸区'
    }, {
      value: '420103',
      label: '江汉区'
    }, {
      value: '420104',
      label: '硚口区'
    }, {
      value: '420105',
      label: '汉阳区'
    }, {
      value: '420106',
      label: '武昌区'
    }, {
      value: '420107',
      label: '青山区'
    }, {
      value: '420111',
      label: '洪山区'
    }, {
      value: '420112',
      label: '东西湖区'
    }, {
      value: '420113',
      label: '汉南区'
    }, {
      value: '420114',
      label: '蔡甸区'
    }, {
      value: '420115',
      label: '江夏区'
    }, {
      value: '420116',
      label: '黄陂区'
    }, {
      value: '420117',
      label: '新洲区'
    }]
  }, {
    value: '420200',
    label: '黄石市',
    children: [{
      value: '420202',
      label: '黄石港区'
    }, {
      value: '420203',
      label: '西塞山区'
    }, {
      value: '420204',
      label: '下陆区'
    }, {
      value: '420205',
      label: '铁山区'
    }, {
      value: '420222',
      label: '阳新县'
    }, {
      value: '420281',
      label: '大冶市'
    }]
  }, {
    value: '420300',
    label: '十堰市',
    children: [{
      value: '420302',
      label: '茅箭区'
    }, {
      value: '420303',
      label: '张湾区'
    }, {
      value: '420304',
      label: '郧阳区'
    }, {
      value: '420322',
      label: '郧西县'
    }, {
      value: '420323',
      label: '竹山县'
    }, {
      value: '420324',
      label: '竹溪县'
    }, {
      value: '420325',
      label: '房　县'
    }, {
      value: '420381',
      label: '丹江口市'
    }]
  }, {
    value: '420500',
    label: '宜昌市',
    children: [{
      value: '420502',
      label: '西陵区'
    }, {
      value: '420503',
      label: '伍家岗区'
    }, {
      value: '420504',
      label: '点军区'
    }, {
      value: '420505',
      label: '猇亭区'
    }, {
      value: '420506',
      label: '夷陵区'
    }, {
      value: '420525',
      label: '远安县'
    }, {
      value: '420526',
      label: '兴山县'
    }, {
      value: '420527',
      label: '秭归县'
    }, {
      value: '420528',
      label: '长阳土家族自治县'
    }, {
      value: '420529',
      label: '五峰土家族自治县'
    }, {
      value: '420581',
      label: '宜都市'
    }, {
      value: '420582',
      label: '当阳市'
    }, {
      value: '420583',
      label: '枝江市'
    }]
  }, {
    value: '420600',
    label: '襄阳市',
    children: [{
      value: '420602',
      label: '襄城区'
    }, {
      value: '420606',
      label: '樊城区'
    }, {
      value: '420607',
      label: '襄州区'
    }, {
      value: '420624',
      label: '南漳县'
    }, {
      value: '420625',
      label: '谷城县'
    }, {
      value: '420626',
      label: '保康县'
    }, {
      value: '420682',
      label: '老河口市'
    }, {
      value: '420683',
      label: '枣阳市'
    }, {
      value: '420684',
      label: '宜城市'
    }]
  }, {
    value: '420700',
    label: '鄂州市',
    children: [{
      value: '420702',
      label: '梁子湖区'
    }, {
      value: '420703',
      label: '华容区'
    }, {
      value: '420704',
      label: '鄂城区'
    }]
  }, {
    value: '420800',
    label: '荆门市',
    children: [{
      value: '420802',
      label: '东宝区'
    }, {
      value: '420804',
      label: '掇刀区'
    }, {
      value: '420821',
      label: '京山县'
    }, {
      value: '420822',
      label: '沙洋县'
    }, {
      value: '420881',
      label: '钟祥市'
    }]
  }, {
    value: '420900',
    label: '孝感市',
    children: [{
      value: '420902',
      label: '孝南区'
    }, {
      value: '420921',
      label: '孝昌县'
    }, {
      value: '420922',
      label: '大悟县'
    }, {
      value: '420923',
      label: '云梦县'
    }, {
      value: '420981',
      label: '应城市'
    }, {
      value: '420982',
      label: '安陆市'
    }, {
      value: '420984',
      label: '汉川市'
    }]
  }, {
    value: '421000',
    label: '荆州市',
    children: [{
      value: '421002',
      label: '沙市区'
    }, {
      value: '421003',
      label: '荆州区'
    }, {
      value: '421022',
      label: '公安县'
    }, {
      value: '421023',
      label: '监利县'
    }, {
      value: '421024',
      label: '江陵县'
    }, {
      value: '421081',
      label: '石首市'
    }, {
      value: '421083',
      label: '洪湖市'
    }, {
      value: '421087',
      label: '松滋市'
    }]
  }, {
    value: '421100',
    label: '黄冈市',
    children: [{
      value: '421102',
      label: '黄州区'
    }, {
      value: '421121',
      label: '团风县'
    }, {
      value: '421122',
      label: '红安县'
    }, {
      value: '421123',
      label: '罗田县'
    }, {
      value: '421124',
      label: '英山县'
    }, {
      value: '421125',
      label: '浠水县'
    }, {
      value: '421126',
      label: '蕲春县'
    }, {
      value: '421127',
      label: '黄梅县'
    }, {
      value: '421181',
      label: '麻城市'
    }, {
      value: '421182',
      label: '武穴市'
    }]
  }, {
    value: '421200',
    label: '咸宁市',
    children: [{
      value: '421202',
      label: '咸安区'
    }, {
      value: '421221',
      label: '嘉鱼县'
    }, {
      value: '421222',
      label: '通城县'
    }, {
      value: '421223',
      label: '崇阳县'
    }, {
      value: '421224',
      label: '通山县'
    }, {
      value: '421281',
      label: '赤壁市'
    }]
  }, {
    value: '421300',
    label: '随州市',
    children: [{
      value: '421302',
      label: '曾都区'
    }, {
      value: '421321',
      label: '随县'
    }, {
      value: '421381',
      label: '广水市'
    }]
  }, {
    value: '422800',
    label: '恩施土家族苗族自治州',
    children: [{
      value: '422801',
      label: '恩施市'
    }, {
      value: '422802',
      label: '利川市'
    }, {
      value: '422822',
      label: '建始县'
    }, {
      value: '422823',
      label: '巴东县'
    }, {
      value: '422825',
      label: '宣恩县'
    }, {
      value: '422826',
      label: '咸丰县'
    }, {
      value: '422827',
      label: '来凤县'
    }, {
      value: '422828',
      label: '鹤峰县'
    }]
  }, {
    value: '429000',
    label: '省直辖县级行政区划',
    children: [{
      value: '429004',
      label: '仙桃市'
    }, {
      value: '429005',
      label: '潜江市'
    }, {
      value: '429006',
      label: '天门市'
    }, {
      value: '429021',
      label: '神农架林区'
    }]
  }]
}, {
  value: '430000',
  label: '湖南省',
  children: [{
    value: '430100',
    label: '长沙市',
    children: [{
      value: '430102',
      label: '芙蓉区'
    }, {
      value: '430103',
      label: '天心区'
    }, {
      value: '430104',
      label: '岳麓区'
    }, {
      value: '430105',
      label: '开福区'
    }, {
      value: '430111',
      label: '雨花区'
    }, {
      value: '430112',
      label: '望城区'
    }, {
      value: '430121',
      label: '长沙县'
    }, {
      value: '430124',
      label: '宁乡县'
    }, {
      value: '430181',
      label: '浏阳市'
    }]
  }, {
    value: '430200',
    label: '株洲市',
    children: [{
      value: '430202',
      label: '荷塘区'
    }, {
      value: '430203',
      label: '芦淞区'
    }, {
      value: '430204',
      label: '石峰区'
    }, {
      value: '430211',
      label: '天元区'
    }, {
      value: '430221',
      label: '株洲县'
    }, {
      value: '430223',
      label: '攸　县'
    }, {
      value: '430224',
      label: '茶陵县'
    }, {
      value: '430225',
      label: '炎陵县'
    }, {
      value: '430281',
      label: '醴陵市'
    }]
  }, {
    value: '430300',
    label: '湘潭市',
    children: [{
      value: '430302',
      label: '雨湖区'
    }, {
      value: '430304',
      label: '岳塘区'
    }, {
      value: '430321',
      label: '湘潭县'
    }, {
      value: '430381',
      label: '湘乡市'
    }, {
      value: '430382',
      label: '韶山市'
    }]
  }, {
    value: '430400',
    label: '衡阳市',
    children: [{
      value: '430405',
      label: '珠晖区'
    }, {
      value: '430406',
      label: '雁峰区'
    }, {
      value: '430407',
      label: '石鼓区'
    }, {
      value: '430408',
      label: '蒸湘区'
    }, {
      value: '430412',
      label: '南岳区'
    }, {
      value: '430421',
      label: '衡阳县'
    }, {
      value: '430422',
      label: '衡南县'
    }, {
      value: '430423',
      label: '衡山县'
    }, {
      value: '430424',
      label: '衡东县'
    }, {
      value: '430426',
      label: '祁东县'
    }, {
      value: '430481',
      label: '耒阳市'
    }, {
      value: '430482',
      label: '常宁市'
    }]
  }, {
    value: '430500',
    label: '邵阳市',
    children: [{
      value: '430502',
      label: '双清区'
    }, {
      value: '430503',
      label: '大祥区'
    }, {
      value: '430511',
      label: '北塔区'
    }, {
      value: '430521',
      label: '邵东县'
    }, {
      value: '430522',
      label: '新邵县'
    }, {
      value: '430523',
      label: '邵阳县'
    }, {
      value: '430524',
      label: '隆回县'
    }, {
      value: '430525',
      label: '洞口县'
    }, {
      value: '430527',
      label: '绥宁县'
    }, {
      value: '430528',
      label: '新宁县'
    }, {
      value: '430529',
      label: '城步苗族自治县'
    }, {
      value: '430581',
      label: '武冈市'
    }]
  }, {
    value: '430600',
    label: '岳阳市',
    children: [{
      value: '430602',
      label: '岳阳楼区'
    }, {
      value: '430603',
      label: '云溪区'
    }, {
      value: '430611',
      label: '君山区'
    }, {
      value: '430621',
      label: '岳阳县'
    }, {
      value: '430623',
      label: '华容县'
    }, {
      value: '430624',
      label: '湘阴县'
    }, {
      value: '430626',
      label: '平江县'
    }, {
      value: '430681',
      label: '汨罗市'
    }, {
      value: '430682',
      label: '临湘市'
    }]
  }, {
    value: '430700',
    label: '常德市',
    children: [{
      value: '430702',
      label: '武陵区'
    }, {
      value: '430703',
      label: '鼎城区'
    }, {
      value: '430721',
      label: '安乡县'
    }, {
      value: '430722',
      label: '汉寿县'
    }, {
      value: '430723',
      label: '澧　县'
    }, {
      value: '430724',
      label: '临澧县'
    }, {
      value: '430725',
      label: '桃源县'
    }, {
      value: '430726',
      label: '石门县'
    }, {
      value: '430781',
      label: '津市市'
    }]
  }, {
    value: '430800',
    label: '张家界市',
    children: [{
      value: '430802',
      label: '永定区'
    }, {
      value: '430811',
      label: '武陵源区'
    }, {
      value: '430821',
      label: '慈利县'
    }, {
      value: '430822',
      label: '桑植县'
    }]
  }, {
    value: '430900',
    label: '益阳市',
    children: [{
      value: '430902',
      label: '资阳区'
    }, {
      value: '430903',
      label: '赫山区'
    }, {
      value: '430921',
      label: '南　县'
    }, {
      value: '430922',
      label: '桃江县'
    }, {
      value: '430923',
      label: '安化县'
    }, {
      value: '430981',
      label: '沅江市'
    }]
  }, {
    value: '431000',
    label: '郴州市',
    children: [{
      value: '431002',
      label: '北湖区'
    }, {
      value: '431003',
      label: '苏仙区'
    }, {
      value: '431021',
      label: '桂阳县'
    }, {
      value: '431022',
      label: '宜章县'
    }, {
      value: '431023',
      label: '永兴县'
    }, {
      value: '431024',
      label: '嘉禾县'
    }, {
      value: '431025',
      label: '临武县'
    }, {
      value: '431026',
      label: '汝城县'
    }, {
      value: '431027',
      label: '桂东县'
    }, {
      value: '431028',
      label: '安仁县'
    }, {
      value: '431081',
      label: '资兴市'
    }]
  }, {
    value: '431100',
    label: '永州市',
    children: [{
      value: '431102',
      label: '零陵区'
    }, {
      value: '431103',
      label: '冷水滩区'
    }, {
      value: '431121',
      label: '祁阳县'
    }, {
      value: '431122',
      label: '东安县'
    }, {
      value: '431123',
      label: '双牌县'
    }, {
      value: '431124',
      label: '道　县'
    }, {
      value: '431125',
      label: '江永县'
    }, {
      value: '431126',
      label: '宁远县'
    }, {
      value: '431127',
      label: '蓝山县'
    }, {
      value: '431128',
      label: '新田县'
    }, {
      value: '431129',
      label: '江华瑶族自治县'
    }]
  }, {
    value: '431200',
    label: '怀化市',
    children: [{
      value: '431202',
      label: '鹤城区'
    }, {
      value: '431221',
      label: '中方县'
    }, {
      value: '431222',
      label: '沅陵县'
    }, {
      value: '431223',
      label: '辰溪县'
    }, {
      value: '431224',
      label: '溆浦县'
    }, {
      value: '431225',
      label: '会同县'
    }, {
      value: '431226',
      label: '麻阳苗族自治县'
    }, {
      value: '431227',
      label: '新晃侗族自治县'
    }, {
      value: '431228',
      label: '芷江侗族自治县'
    }, {
      value: '431229',
      label: '靖州苗族侗族自治县'
    }, {
      value: '431230',
      label: '通道侗族自治县'
    }, {
      value: '431281',
      label: '洪江市'
    }]
  }, {
    value: '431300',
    label: '娄底市',
    children: [{
      value: '431302',
      label: '娄星区'
    }, {
      value: '431321',
      label: '双峰县'
    }, {
      value: '431322',
      label: '新化县'
    }, {
      value: '431381',
      label: '冷水江市'
    }, {
      value: '431382',
      label: '涟源市'
    }]
  }, {
    value: '433100',
    label: '湘西土家族苗族自治州',
    children: [{
      value: '433101',
      label: '吉首市'
    }, {
      value: '433122',
      label: '泸溪县'
    }, {
      value: '433123',
      label: '凤凰县'
    }, {
      value: '433124',
      label: '花垣县'
    }, {
      value: '433125',
      label: '保靖县'
    }, {
      value: '433126',
      label: '古丈县'
    }, {
      value: '433127',
      label: '永顺县'
    }, {
      value: '433130',
      label: '龙山县'
    }]
  }]
}, {
  value: '440000',
  label: '广东省',
  children: [{
    value: '440100',
    label: '广州市',
    children: [{
      value: '440103',
      label: '荔湾区'
    }, {
      value: '440104',
      label: '越秀区'
    }, {
      value: '440105',
      label: '海珠区'
    }, {
      value: '440106',
      label: '天河区'
    }, {
      value: '440111',
      label: '白云区'
    }, {
      value: '440112',
      label: '黄埔区'
    }, {
      value: '440113',
      label: '番禺区'
    }, {
      value: '440114',
      label: '花都区'
    }, {
      value: '440115',
      label: '南沙区'
    }, {
      value: '440117',
      label: '萝岗区'
    }, {
      value: '440183',
      label: '增城市'
    }, {
      value: '440184',
      label: '从化区'
    }]
  }, {
    value: '440200',
    label: '韶关市',
    children: [{
      value: '440203',
      label: '武江区'
    }, {
      value: '440204',
      label: '浈江区'
    }, {
      value: '440205',
      label: '曲江区'
    }, {
      value: '440222',
      label: '始兴县'
    }, {
      value: '440224',
      label: '仁化县'
    }, {
      value: '440229',
      label: '翁源县'
    }, {
      value: '440232',
      label: '乳源瑶族自治县'
    }, {
      value: '440233',
      label: '新丰县'
    }, {
      value: '440281',
      label: '乐昌市'
    }, {
      value: '440282',
      label: '南雄市'
    }]
  }, {
    value: '440300',
    label: '深圳市',
    children: [{
      value: '440303',
      label: '罗湖区'
    }, {
      value: '440304',
      label: '福田区'
    }, {
      value: '440305',
      label: '南山区'
    }, {
      value: '440306',
      label: '宝安区'
    }, {
      value: '440307',
      label: '龙岗区'
    }, {
      value: '440308',
      label: '盐田区'
    }, {
      value: '440309',
      label: '大鹏新区'
    }, {
      value: '440310',
      label: '坪山新区'
    }, {
      value: '440311',
      label: '光明新区'
    }, {
      value: '440312',
      label: '龙华新区'
    }]
  }, {
    value: '440400',
    label: '珠海市',
    children: [{
      value: '440402',
      label: '香洲区'
    }, {
      value: '440403',
      label: '斗门区'
    }, {
      value: '440404',
      label: '金湾区'
    }]
  }, {
    value: '440500',
    label: '汕头市',
    children: [{
      value: '440507',
      label: '龙湖区'
    }, {
      value: '440511',
      label: '金平区'
    }, {
      value: '440512',
      label: '濠江区'
    }, {
      value: '440513',
      label: '潮阳区'
    }, {
      value: '440514',
      label: '潮南区'
    }, {
      value: '440515',
      label: '澄海区'
    }, {
      value: '440523',
      label: '南澳县'
    }]
  }, {
    value: '440600',
    label: '佛山市',
    children: [{
      value: '440604',
      label: '禅城区'
    }, {
      value: '440605',
      label: '南海区'
    }, {
      value: '440606',
      label: '顺德区'
    }, {
      value: '440607',
      label: '三水区'
    }, {
      value: '440608',
      label: '高明区'
    }]
  }, {
    value: '440700',
    label: '江门市',
    children: [{
      value: '440703',
      label: '蓬江区'
    }, {
      value: '440704',
      label: '江海区'
    }, {
      value: '440705',
      label: '新会区'
    }, {
      value: '440781',
      label: '台山市'
    }, {
      value: '440783',
      label: '开平市'
    }, {
      value: '440784',
      label: '鹤山市'
    }, {
      value: '440785',
      label: '恩平市'
    }]
  }, {
    value: '440800',
    label: '湛江市',
    children: [{
      value: '440802',
      label: '赤坎区'
    }, {
      value: '440803',
      label: '霞山区'
    }, {
      value: '440804',
      label: '坡头区'
    }, {
      value: '440811',
      label: '麻章区'
    }, {
      value: '440823',
      label: '遂溪县'
    }, {
      value: '440825',
      label: '徐闻县'
    }, {
      value: '440881',
      label: '廉江市'
    }, {
      value: '440882',
      label: '雷州市'
    }, {
      value: '440883',
      label: '吴川市'
    }, {
      value: '440890',
      label: '经济技术开发区'
    }]
  }, {
    value: '440900',
    label: '茂名市',
    children: [{
      value: '440902',
      label: '茂南区'
    }, {
      value: '440903',
      label: '茂港区'
    }, {
      value: '440923',
      label: '电白县'
    }, {
      value: '440981',
      label: '高州市'
    }, {
      value: '440982',
      label: '化州市'
    }, {
      value: '440983',
      label: '信宜市'
    }]
  }, {
    value: '441200',
    label: '肇庆市',
    children: [{
      value: '441202',
      label: '端州区'
    }, {
      value: '441203',
      label: '鼎湖区'
    }, {
      value: '441204',
      label: '高要区'
    }, {
      value: '441223',
      label: '广宁县'
    }, {
      value: '441224',
      label: '怀集县'
    }, {
      value: '441225',
      label: '封开县'
    }, {
      value: '441226',
      label: '德庆县'
    }, {
      value: '441284',
      label: '四会市'
    }]
  }, {
    value: '441300',
    label: '惠州市',
    children: [{
      value: '441302',
      label: '惠城区'
    }, {
      value: '441303',
      label: '惠阳区'
    }, {
      value: '441322',
      label: '博罗县'
    }, {
      value: '441323',
      label: '惠东县'
    }, {
      value: '441324',
      label: '龙门县'
    }, {
      value: '441326',
      label: '大亚湾区'
    }]
  }, {
    value: '441400',
    label: '梅州市',
    children: [{
      value: '441402',
      label: '梅江区'
    }, {
      value: '441421',
      label: '梅　县'
    }, {
      value: '441422',
      label: '大埔县'
    }, {
      value: '441423',
      label: '丰顺县'
    }, {
      value: '441424',
      label: '五华县'
    }, {
      value: '441426',
      label: '平远县'
    }, {
      value: '441427',
      label: '蕉岭县'
    }, {
      value: '441481',
      label: '兴宁市'
    }]
  }, {
    value: '441500',
    label: '汕尾市',
    children: [{
      value: '441502',
      label: '城　区'
    }, {
      value: '441521',
      label: '海丰县'
    }, {
      value: '441523',
      label: '陆河县'
    }, {
      value: '441581',
      label: '陆丰市'
    }]
  }, {
    value: '441600',
    label: '河源市',
    children: [{
      value: '441602',
      label: '源城区'
    }, {
      value: '441621',
      label: '紫金县'
    }, {
      value: '441622',
      label: '龙川县'
    }, {
      value: '441623',
      label: '连平县'
    }, {
      value: '441624',
      label: '和平县'
    }, {
      value: '441625',
      label: '东源县'
    }]
  }, {
    value: '441700',
    label: '阳江市',
    children: [{
      value: '441702',
      label: '江城区'
    }, {
      value: '441704',
      label: '阳东区'
    }, {
      value: '441721',
      label: '阳西县'
    }, {
      value: '441781',
      label: '阳春市'
    }]
  }, {
    value: '441800',
    label: '清远市',
    children: [{
      value: '441802',
      label: '清城区'
    }, {
      value: '441803',
      label: '清新区'
    }, {
      value: '441821',
      label: '佛冈县'
    }, {
      value: '441823',
      label: '阳山县'
    }, {
      value: '441825',
      label: '连山壮族瑶族自治县'
    }, {
      value: '441826',
      label: '连南瑶族自治县'
    }, {
      value: '441881',
      label: '英德市'
    }, {
      value: '441882',
      label: '连州市'
    }]
  }, {
    value: '441900',
    label: '东莞市',
    children: [{
      value: '659005',
      label: '莞城区'
    }, {
      value: '659006',
      label: '南城区'
    }, {
      value: '659007',
      label: '东城区'
    }, {
      value: '659008',
      label: '万江区'
    }, {
      value: '659009',
      label: '石碣镇'
    }, {
      value: '659010',
      label: '石龙镇'
    }, {
      value: '659011',
      label: '茶山镇'
    }, {
      value: '659012',
      label: '石排镇'
    }, {
      value: '659013',
      label: '企石镇'
    }, {
      value: '659014',
      label: '横沥镇'
    }, {
      value: '659015',
      label: '桥头镇'
    }, {
      value: '659016',
      label: '谢岗镇'
    }, {
      value: '659017',
      label: '东坑镇'
    }, {
      value: '659018',
      label: '常平镇'
    }, {
      value: '659019',
      label: '寮步镇'
    }, {
      value: '659020',
      label: '大朗镇'
    }, {
      value: '659021',
      label: '黄江镇'
    }, {
      value: '659022',
      label: '清溪镇'
    }, {
      value: '659023',
      label: '塘厦镇'
    }, {
      value: '659024',
      label: '凤岗镇'
    }, {
      value: '659025',
      label: '长安镇'
    }, {
      value: '659026',
      label: '虎门镇'
    }, {
      value: '659027',
      label: '厚街镇'
    }, {
      value: '659028',
      label: '沙田镇'
    }, {
      value: '659029',
      label: '道滘镇'
    }, {
      value: '659030',
      label: '洪梅镇'
    }, {
      value: '659031',
      label: '麻涌镇'
    }, {
      value: '659032',
      label: '中堂镇'
    }, {
      value: '659033',
      label: '高埗镇'
    }, {
      value: '659034',
      label: '樟木头镇'
    }, {
      value: '659035',
      label: '大岭山镇'
    }, {
      value: '659036',
      label: '望牛墩镇'
    }]
  }, {
    value: '442000',
    label: '中山市',
    children: [{
      value: '442001',
      label: '石岐区街道'
    }, {
      value: '442002',
      label: '东区街道'
    }, {
      value: '442003',
      label: '火炬开发区'
    }, {
      value: '442004',
      label: '西区街道'
    }, {
      value: '442005',
      label: '南区街道'
    }, {
      value: '442006',
      label: '五桂山街道'
    }, {
      value: '659037',
      label: '板芙镇'
    }, {
      value: '659038',
      label: '大涌镇'
    }, {
      value: '659039',
      label: '东凤镇'
    }, {
      value: '659040',
      label: '东升镇'
    }, {
      value: '659041',
      label: '阜沙镇'
    }, {
      value: '659042',
      label: '港口镇'
    }, {
      value: '659043',
      label: '古镇'
    }, {
      value: '659044',
      label: '横栏镇'
    }, {
      value: '659045',
      label: '黄圃镇'
    }, {
      value: '659046',
      label: '民众镇'
    }, {
      value: '659047',
      label: '南朗镇'
    }, {
      value: '659048',
      label: '南头镇'
    }, {
      value: '659049',
      label: '三角镇'
    }, {
      value: '659050',
      label: '三乡镇'
    }, {
      value: '659051',
      label: '沙溪镇'
    }, {
      value: '659052',
      label: '神湾镇'
    }, {
      value: '659053',
      label: '坦洲镇'
    }, {
      value: '659054',
      label: '小榄镇'
    }]
  }, {
    value: '445100',
    label: '潮州市',
    children: [{
      value: '445102',
      label: '湘桥区'
    }, {
      value: '445103',
      label: '潮安区'
    }, {
      value: '445104',
      label: '枫溪区'
    }, {
      value: '445122',
      label: '饶平县'
    }]
  }, {
    value: '445200',
    label: '揭阳市',
    children: [{
      value: '445202',
      label: '榕城区'
    }, {
      value: '445221',
      label: '揭东区'
    }, {
      value: '445222',
      label: '揭西县'
    }, {
      value: '445224',
      label: '惠来县'
    }, {
      value: '445281',
      label: '普宁市'
    }]
  }, {
    value: '445300',
    label: '云浮市',
    children: [{
      value: '445302',
      label: '云城区'
    }, {
      value: '445303',
      label: '云安区'
    }, {
      value: '445321',
      label: '新兴县'
    }, {
      value: '445322',
      label: '郁南县'
    }, {
      value: '445381',
      label: '罗定市'
    }]
  }]
}, {
  value: '450000',
  label: '广西壮族自治区',
  children: [{
    value: '450100',
    label: '南宁市',
    children: [{
      value: '450102',
      label: '兴宁区'
    }, {
      value: '450103',
      label: '青秀区'
    }, {
      value: '450105',
      label: '江南区'
    }, {
      value: '450107',
      label: '西乡塘区'
    }, {
      value: '450108',
      label: '良庆区'
    }, {
      value: '450109',
      label: '邕宁区'
    }, {
      value: '450122',
      label: '武鸣县'
    }, {
      value: '450123',
      label: '隆安县'
    }, {
      value: '450124',
      label: '马山县'
    }, {
      value: '450125',
      label: '上林县'
    }, {
      value: '450126',
      label: '宾阳县'
    }, {
      value: '450127',
      label: '横　县'
    }]
  }, {
    value: '450200',
    label: '柳州市',
    children: [{
      value: '450202',
      label: '城中区'
    }, {
      value: '450203',
      label: '鱼峰区'
    }, {
      value: '450204',
      label: '柳南区'
    }, {
      value: '450205',
      label: '柳北区'
    }, {
      value: '450221',
      label: '柳江县'
    }, {
      value: '450222',
      label: '柳城县'
    }, {
      value: '450223',
      label: '鹿寨县'
    }, {
      value: '450224',
      label: '融安县'
    }, {
      value: '450225',
      label: '融水苗族自治县'
    }, {
      value: '450226',
      label: '三江侗族自治县'
    }]
  }, {
    value: '450300',
    label: '桂林市',
    children: [{
      value: '450302',
      label: '秀峰区'
    }, {
      value: '450303',
      label: '叠彩区'
    }, {
      value: '450304',
      label: '象山区'
    }, {
      value: '450305',
      label: '七星区'
    }, {
      value: '450311',
      label: '雁山区'
    }, {
      value: '450321',
      label: '阳朔县'
    }, {
      value: '450322',
      label: '临桂区'
    }, {
      value: '450323',
      label: '灵川县'
    }, {
      value: '450324',
      label: '全州县'
    }, {
      value: '450325',
      label: '兴安县'
    }, {
      value: '450326',
      label: '永福县'
    }, {
      value: '450327',
      label: '灌阳县'
    }, {
      value: '450328',
      label: '龙胜各族自治县'
    }, {
      value: '450329',
      label: '资源县'
    }, {
      value: '450330',
      label: '平乐县'
    }, {
      value: '450331',
      label: '荔蒲县'
    }, {
      value: '450332',
      label: '恭城瑶族自治县'
    }]
  }, {
    value: '450400',
    label: '梧州市',
    children: [{
      value: '450403',
      label: '万秀区'
    }, {
      value: '450405',
      label: '长洲区'
    }, {
      value: '450406',
      label: '龙圩区'
    }, {
      value: '450421',
      label: '苍梧县'
    }, {
      value: '450422',
      label: '藤　县'
    }, {
      value: '450423',
      label: '蒙山县'
    }, {
      value: '450481',
      label: '岑溪市'
    }]
  }, {
    value: '450500',
    label: '北海市',
    children: [{
      value: '450502',
      label: '海城区'
    }, {
      value: '450503',
      label: '银海区'
    }, {
      value: '450512',
      label: '铁山港区'
    }, {
      value: '450521',
      label: '合浦县'
    }]
  }, {
    value: '450600',
    label: '防城港市',
    children: [{
      value: '450602',
      label: '港口区'
    }, {
      value: '450603',
      label: '防城区'
    }, {
      value: '450621',
      label: '上思县'
    }, {
      value: '450681',
      label: '东兴市'
    }]
  }, {
    value: '450700',
    label: '钦州市',
    children: [{
      value: '450702',
      label: '钦南区'
    }, {
      value: '450703',
      label: '钦北区'
    }, {
      value: '450721',
      label: '灵山县'
    }, {
      value: '450722',
      label: '浦北县'
    }]
  }, {
    value: '450800',
    label: '贵港市',
    children: [{
      value: '450802',
      label: '港北区'
    }, {
      value: '450803',
      label: '港南区'
    }, {
      value: '450804',
      label: '覃塘区'
    }, {
      value: '450821',
      label: '平南县'
    }, {
      value: '450881',
      label: '桂平市'
    }]
  }, {
    value: '450900',
    label: '玉林市',
    children: [{
      value: '450902',
      label: '玉州区'
    }, {
      value: '450903',
      label: '福绵区'
    }, {
      value: '450921',
      label: '容　县'
    }, {
      value: '450922',
      label: '陆川县'
    }, {
      value: '450923',
      label: '博白县'
    }, {
      value: '450924',
      label: '兴业县'
    }, {
      value: '450981',
      label: '北流市'
    }]
  }, {
    value: '451000',
    label: '百色市',
    children: [{
      value: '451002',
      label: '右江区'
    }, {
      value: '451021',
      label: '田阳县'
    }, {
      value: '451022',
      label: '田东县'
    }, {
      value: '451023',
      label: '平果县'
    }, {
      value: '451024',
      label: '德保县'
    }, {
      value: '451025',
      label: '靖西市'
    }, {
      value: '451026',
      label: '那坡县'
    }, {
      value: '451027',
      label: '凌云县'
    }, {
      value: '451028',
      label: '乐业县'
    }, {
      value: '451029',
      label: '田林县'
    }, {
      value: '451030',
      label: '西林县'
    }, {
      value: '451031',
      label: '隆林各族自治县'
    }]
  }, {
    value: '451100',
    label: '贺州市',
    children: [{
      value: '451102',
      label: '八步区'
    }, {
      value: '451121',
      label: '昭平县'
    }, {
      value: '451122',
      label: '钟山县'
    }, {
      value: '451123',
      label: '富川瑶族自治县'
    }]
  }, {
    value: '451200',
    label: '河池市',
    children: [{
      value: '451202',
      label: '金城江区'
    }, {
      value: '451221',
      label: '南丹县'
    }, {
      value: '451222',
      label: '天峨县'
    }, {
      value: '451223',
      label: '凤山县'
    }, {
      value: '451224',
      label: '东兰县'
    }, {
      value: '451225',
      label: '罗城仫佬族自治县'
    }, {
      value: '451226',
      label: '环江毛南族自治县'
    }, {
      value: '451227',
      label: '巴马瑶族自治县'
    }, {
      value: '451228',
      label: '都安瑶族自治县'
    }, {
      value: '451229',
      label: '大化瑶族自治县'
    }, {
      value: '451281',
      label: '宜州市'
    }]
  }, {
    value: '451300',
    label: '来宾市',
    children: [{
      value: '451302',
      label: '兴宾区'
    }, {
      value: '451321',
      label: '忻城县'
    }, {
      value: '451322',
      label: '象州县'
    }, {
      value: '451323',
      label: '武宣县'
    }, {
      value: '451324',
      label: '金秀瑶族自治县'
    }, {
      value: '451381',
      label: '合山市'
    }]
  }, {
    value: '451400',
    label: '崇左市',
    children: [{
      value: '451402',
      label: '江洲区'
    }, {
      value: '451421',
      label: '扶绥县'
    }, {
      value: '451422',
      label: '宁明县'
    }, {
      value: '451423',
      label: '龙州县'
    }, {
      value: '451424',
      label: '大新县'
    }, {
      value: '451425',
      label: '天等县'
    }, {
      value: '451481',
      label: '凭祥市'
    }]
  }]
}, {
  value: '460000',
  label: '海南省',
  children: [{
    value: '460100',
    label: '海口市',
    children: [{
      value: '460105',
      label: '秀英区'
    }, {
      value: '460106',
      label: '龙华区'
    }, {
      value: '460107',
      label: '琼山区'
    }, {
      value: '460108',
      label: '美兰区'
    }]
  }, {
    value: '460200',
    label: '三亚市',
    children: [{
      value: '659055',
      label: '吉阳区'
    }, {
      value: '659056',
      label: '天涯区'
    }, {
      value: '659057',
      label: '崖州区'
    }, {
      value: '659058',
      label: '海棠区'
    }]
  }, {
    value: '460300',
    label: '三沙市',
    children: [{
      value: '460321',
      label: '西沙群岛'
    }, {
      value: '460322',
      label: '南沙群岛'
    }, {
      value: '460323',
      label: '中沙群岛的岛礁及其海域'
    }]
  }, {
    value: '469000',
    label: '省直辖县级行政区划',
    children: [{
      value: '469001',
      label: '五指山市'
    }, {
      value: '469002',
      label: '琼海市'
    }, {
      value: '469003',
      label: '儋州市'
    }, {
      value: '469005',
      label: '文昌市'
    }, {
      value: '469006',
      label: '万宁市'
    }, {
      value: '469007',
      label: '东方市'
    }, {
      value: '469021',
      label: '定安县'
    }, {
      value: '469022',
      label: '屯昌县'
    }, {
      value: '469023',
      label: '澄迈县'
    }, {
      value: '469024',
      label: '临高县'
    }, {
      value: '469025',
      label: '白沙黎族自治县'
    }, {
      value: '469026',
      label: '昌江黎族自治县'
    }, {
      value: '469027',
      label: '乐东黎族自治县'
    }, {
      value: '469028',
      label: '陵水黎族自治县'
    }, {
      value: '469029',
      label: '保亭黎族苗族自治县'
    }, {
      value: '469030',
      label: '琼中黎族苗族自治县'
    }]
  }]
}, {
  value: '500000',
  label: '重庆市',
  children: [{
    value: '500100',
    label: '重庆市',
    children: [{
      value: '500101',
      label: '万州区'
    }, {
      value: '500102',
      label: '涪陵区'
    }, {
      value: '500103',
      label: '渝中区'
    }, {
      value: '500104',
      label: '大渡口区'
    }, {
      value: '500105',
      label: '江北区'
    }, {
      value: '500106',
      label: '沙坪坝区'
    }, {
      value: '500107',
      label: '九龙坡区'
    }, {
      value: '500108',
      label: '南岸区'
    }, {
      value: '500109',
      label: '北碚区'
    }, {
      value: '500110',
      label: '綦江区'
    }, {
      value: '500111',
      label: '大足区'
    }, {
      value: '500112',
      label: '渝北区'
    }, {
      value: '500113',
      label: '巴南区'
    }, {
      value: '500114',
      label: '黔江区'
    }, {
      value: '500115',
      label: '长寿区'
    }, {
      value: '500116',
      label: '江津区'
    }, {
      value: '500117',
      label: '合川区'
    }, {
      value: '500118',
      label: '永川区'
    }, {
      value: '500119',
      label: '南川区'
    }, {
      value: '500120',
      label: '璧山区'
    }, {
      value: '500223',
      label: '潼南区'
    }, {
      value: '500224',
      label: '铜梁区'
    }, {
      value: '500226',
      label: '荣昌区'
    }, {
      value: '500228',
      label: '梁平县'
    }, {
      value: '500229',
      label: '城口县'
    }, {
      value: '500230',
      label: '丰都县'
    }, {
      value: '500231',
      label: '垫江县'
    }, {
      value: '500232',
      label: '武隆县'
    }, {
      value: '500233',
      label: '忠　县'
    }, {
      value: '500234',
      label: '开　县'
    }, {
      value: '500235',
      label: '云阳县'
    }, {
      value: '500236',
      label: '奉节县'
    }, {
      value: '500237',
      label: '巫山县'
    }, {
      value: '500238',
      label: '巫溪县'
    }, {
      value: '500240',
      label: '石柱土家族自治县'
    }, {
      value: '500241',
      label: '秀山土家族苗族自治县'
    }, {
      value: '500242',
      label: '酉阳土家族苗族自治县'
    }, {
      value: '500243',
      label: '彭水苗族土家族自治县'
    }]
  }]
}, {
  value: '510000',
  label: '四川省',
  children: [{
    value: '510100',
    label: '成都市',
    children: [{
      value: '510104',
      label: '锦江区'
    }, {
      value: '510105',
      label: '青羊区'
    }, {
      value: '510106',
      label: '金牛区'
    }, {
      value: '510107',
      label: '武侯区'
    }, {
      value: '510108',
      label: '成华区'
    }, {
      value: '510112',
      label: '龙泉驿区'
    }, {
      value: '510113',
      label: '青白江区'
    }, {
      value: '510114',
      label: '新都区'
    }, {
      value: '510115',
      label: '温江区'
    }, {
      value: '510121',
      label: '金堂县'
    }, {
      value: '510122',
      label: '双流县'
    }, {
      value: '510124',
      label: '郫　县'
    }, {
      value: '510129',
      label: '大邑县'
    }, {
      value: '510131',
      label: '蒲江县'
    }, {
      value: '510132',
      label: '新津县'
    }, {
      value: '510181',
      label: '都江堰市'
    }, {
      value: '510182',
      label: '彭州市'
    }, {
      value: '510183',
      label: '邛崃市'
    }, {
      value: '510184',
      label: '崇州市'
    }]
  }, {
    value: '510300',
    label: '自贡市',
    children: [{
      value: '510302',
      label: '自流井区'
    }, {
      value: '510303',
      label: '贡井区'
    }, {
      value: '510304',
      label: '大安区'
    }, {
      value: '510311',
      label: '沿滩区'
    }, {
      value: '510321',
      label: '荣　县'
    }, {
      value: '510322',
      label: '富顺县'
    }]
  }, {
    value: '510400',
    label: '攀枝花市',
    children: [{
      value: '510402',
      label: '东　区'
    }, {
      value: '510403',
      label: '西　区'
    }, {
      value: '510411',
      label: '仁和区'
    }, {
      value: '510421',
      label: '米易县'
    }, {
      value: '510422',
      label: '盐边县'
    }]
  }, {
    value: '510500',
    label: '泸州市',
    children: [{
      value: '510502',
      label: '江阳区'
    }, {
      value: '510503',
      label: '纳溪区'
    }, {
      value: '510504',
      label: '龙马潭区'
    }, {
      value: '510521',
      label: '泸　县'
    }, {
      value: '510522',
      label: '合江县'
    }, {
      value: '510524',
      label: '叙永县'
    }, {
      value: '510525',
      label: '古蔺县'
    }]
  }, {
    value: '510600',
    label: '德阳市',
    children: [{
      value: '510603',
      label: '旌阳区'
    }, {
      value: '510623',
      label: '中江县'
    }, {
      value: '510626',
      label: '罗江县'
    }, {
      value: '510681',
      label: '广汉市'
    }, {
      value: '510682',
      label: '什邡市'
    }, {
      value: '510683',
      label: '绵竹市'
    }]
  }, {
    value: '510700',
    label: '绵阳市',
    children: [{
      value: '510703',
      label: '涪城区'
    }, {
      value: '510704',
      label: '游仙区'
    }, {
      value: '510722',
      label: '三台县'
    }, {
      value: '510723',
      label: '盐亭县'
    }, {
      value: '510724',
      label: '安　县'
    }, {
      value: '510725',
      label: '梓潼县'
    }, {
      value: '510726',
      label: '北川羌族自治县'
    }, {
      value: '510727',
      label: '平武县'
    }, {
      value: '510781',
      label: '江油市'
    }]
  }, {
    value: '510800',
    label: '广元市',
    children: [{
      value: '510802',
      label: '利州区'
    }, {
      value: '510811',
      label: '昭化区'
    }, {
      value: '510812',
      label: '朝天区'
    }, {
      value: '510821',
      label: '旺苍县'
    }, {
      value: '510822',
      label: '青川县'
    }, {
      value: '510823',
      label: '剑阁县'
    }, {
      value: '510824',
      label: '苍溪县'
    }]
  }, {
    value: '510900',
    label: '遂宁市',
    children: [{
      value: '510903',
      label: '船山区'
    }, {
      value: '510904',
      label: '安居区'
    }, {
      value: '510921',
      label: '蓬溪县'
    }, {
      value: '510922',
      label: '射洪县'
    }, {
      value: '510923',
      label: '大英县'
    }]
  }, {
    value: '511000',
    label: '内江市',
    children: [{
      value: '511002',
      label: '市中区'
    }, {
      value: '511011',
      label: '东兴区'
    }, {
      value: '511024',
      label: '威远县'
    }, {
      value: '511025',
      label: '资中县'
    }, {
      value: '511028',
      label: '隆昌县'
    }]
  }, {
    value: '511100',
    label: '乐山市',
    children: [{
      value: '511102',
      label: '市中区'
    }, {
      value: '511111',
      label: '沙湾区'
    }, {
      value: '511112',
      label: '五通桥区'
    }, {
      value: '511113',
      label: '金口河区'
    }, {
      value: '511123',
      label: '犍为县'
    }, {
      value: '511124',
      label: '井研县'
    }, {
      value: '511126',
      label: '夹江县'
    }, {
      value: '511129',
      label: '沐川县'
    }, {
      value: '511132',
      label: '峨边彝族自治县'
    }, {
      value: '511133',
      label: '马边彝族自治县'
    }, {
      value: '511181',
      label: '峨眉山市'
    }]
  }, {
    value: '511300',
    label: '南充市',
    children: [{
      value: '511302',
      label: '顺庆区'
    }, {
      value: '511303',
      label: '高坪区'
    }, {
      value: '511304',
      label: '嘉陵区'
    }, {
      value: '511321',
      label: '南部县'
    }, {
      value: '511322',
      label: '营山县'
    }, {
      value: '511323',
      label: '蓬安县'
    }, {
      value: '511324',
      label: '仪陇县'
    }, {
      value: '511325',
      label: '西充县'
    }, {
      value: '511381',
      label: '阆中市'
    }]
  }, {
    value: '511400',
    label: '眉山市',
    children: [{
      value: '511402',
      label: '东坡区'
    }, {
      value: '511403',
      label: '彭山区'
    }, {
      value: '511421',
      label: '仁寿县'
    }, {
      value: '511423',
      label: '洪雅县'
    }, {
      value: '511424',
      label: '丹棱县'
    }, {
      value: '511425',
      label: '青神县'
    }]
  }, {
    value: '511500',
    label: '宜宾市',
    children: [{
      value: '511502',
      label: '翠屏区'
    }, {
      value: '511503',
      label: '南溪区'
    }, {
      value: '511521',
      label: '宜宾县'
    }, {
      value: '511523',
      label: '江安县'
    }, {
      value: '511524',
      label: '长宁县'
    }, {
      value: '511525',
      label: '高　县'
    }, {
      value: '511526',
      label: '珙　县'
    }, {
      value: '511527',
      label: '筠连县'
    }, {
      value: '511528',
      label: '兴文县'
    }, {
      value: '511529',
      label: '屏山县'
    }]
  }, {
    value: '511600',
    label: '广安市',
    children: [{
      value: '511602',
      label: '广安区'
    }, {
      value: '511603',
      label: '前锋区'
    }, {
      value: '511621',
      label: '岳池县'
    }, {
      value: '511622',
      label: '武胜县'
    }, {
      value: '511623',
      label: '邻水县'
    }, {
      value: '511681',
      label: '华蓥市'
    }]
  }, {
    value: '511700',
    label: '达州市',
    children: [{
      value: '511702',
      label: '通川区'
    }, {
      value: '511703',
      label: '达川区'
    }, {
      value: '511722',
      label: '宣汉县'
    }, {
      value: '511723',
      label: '开江县'
    }, {
      value: '511724',
      label: '大竹县'
    }, {
      value: '511725',
      label: '渠　县'
    }, {
      value: '511781',
      label: '万源市'
    }]
  }, {
    value: '511800',
    label: '雅安市',
    children: [{
      value: '511802',
      label: '雨城区'
    }, {
      value: '511803',
      label: '名山区'
    }, {
      value: '511822',
      label: '荥经县'
    }, {
      value: '511823',
      label: '汉源县'
    }, {
      value: '511824',
      label: '石棉县'
    }, {
      value: '511825',
      label: '天全县'
    }, {
      value: '511826',
      label: '芦山县'
    }, {
      value: '511827',
      label: '宝兴县'
    }]
  }, {
    value: '511900',
    label: '巴中市',
    children: [{
      value: '511902',
      label: '巴州区'
    }, {
      value: '511903',
      label: '恩阳区'
    }, {
      value: '511921',
      label: '通江县'
    }, {
      value: '511922',
      label: '南江县'
    }, {
      value: '511923',
      label: '平昌县'
    }]
  }, {
    value: '512000',
    label: '资阳市',
    children: [{
      value: '512002',
      label: '雁江区'
    }, {
      value: '512021',
      label: '安岳县'
    }, {
      value: '512022',
      label: '乐至县'
    }, {
      value: '512081',
      label: '简阳市'
    }]
  }, {
    value: '513200',
    label: '阿坝藏族羌族自治州',
    children: [{
      value: '513221',
      label: '汶川县'
    }, {
      value: '513222',
      label: '理　县'
    }, {
      value: '513223',
      label: '茂　县'
    }, {
      value: '513224',
      label: '松潘县'
    }, {
      value: '513225',
      label: '九寨沟县'
    }, {
      value: '513226',
      label: '金川县'
    }, {
      value: '513227',
      label: '小金县'
    }, {
      value: '513228',
      label: '黑水县'
    }, {
      value: '513229',
      label: '马尔康县'
    }, {
      value: '513230',
      label: '壤塘县'
    }, {
      value: '513231',
      label: '阿坝县'
    }, {
      value: '513232',
      label: '若尔盖县'
    }, {
      value: '513233',
      label: '红原县'
    }]
  }, {
    value: '513300',
    label: '甘孜藏族自治州',
    children: [{
      value: '513321',
      label: '康定县'
    }, {
      value: '513322',
      label: '泸定县'
    }, {
      value: '513323',
      label: '丹巴县'
    }, {
      value: '513324',
      label: '九龙县'
    }, {
      value: '513325',
      label: '雅江县'
    }, {
      value: '513326',
      label: '道孚县'
    }, {
      value: '513327',
      label: '炉霍县'
    }, {
      value: '513328',
      label: '甘孜县'
    }, {
      value: '513329',
      label: '新龙县'
    }, {
      value: '513330',
      label: '德格县'
    }, {
      value: '513331',
      label: '白玉县'
    }, {
      value: '513332',
      label: '石渠县'
    }, {
      value: '513333',
      label: '色达县'
    }, {
      value: '513334',
      label: '理塘县'
    }, {
      value: '513335',
      label: '巴塘县'
    }, {
      value: '513336',
      label: '乡城县'
    }, {
      value: '513337',
      label: '稻城县'
    }, {
      value: '513338',
      label: '得荣县'
    }]
  }, {
    value: '513400',
    label: '凉山彝族自治州',
    children: [{
      value: '513401',
      label: '西昌市'
    }, {
      value: '513422',
      label: '木里藏族自治县'
    }, {
      value: '513423',
      label: '盐源县'
    }, {
      value: '513424',
      label: '德昌县'
    }, {
      value: '513425',
      label: '会理县'
    }, {
      value: '513426',
      label: '会东县'
    }, {
      value: '513427',
      label: '宁南县'
    }, {
      value: '513428',
      label: '普格县'
    }, {
      value: '513429',
      label: '布拖县'
    }, {
      value: '513430',
      label: '金阳县'
    }, {
      value: '513431',
      label: '昭觉县'
    }, {
      value: '513432',
      label: '喜德县'
    }, {
      value: '513433',
      label: '冕宁县'
    }, {
      value: '513434',
      label: '越西县'
    }, {
      value: '513435',
      label: '甘洛县'
    }, {
      value: '513436',
      label: '美姑县'
    }, {
      value: '513437',
      label: '雷波县'
    }]
  }]
}, {
  value: '520000',
  label: '贵州省',
  children: [{
    value: '520100',
    label: '贵阳市',
    children: [{
      value: '520102',
      label: '南明区'
    }, {
      value: '520103',
      label: '云岩区'
    }, {
      value: '520111',
      label: '花溪区'
    }, {
      value: '520112',
      label: '乌当区'
    }, {
      value: '520113',
      label: '白云区'
    }, {
      value: '520115',
      label: '观山湖区'
    }, {
      value: '520121',
      label: '开阳县'
    }, {
      value: '520122',
      label: '息烽县'
    }, {
      value: '520123',
      label: '修文县'
    }, {
      value: '520181',
      label: '清镇市'
    }]
  }, {
    value: '520200',
    label: '六盘水市',
    children: [{
      value: '520201',
      label: '钟山区'
    }, {
      value: '520203',
      label: '六枝特区'
    }, {
      value: '520221',
      label: '水城县'
    }, {
      value: '520222',
      label: '盘　县'
    }]
  }, {
    value: '520300',
    label: '遵义市',
    children: [{
      value: '520302',
      label: '红花岗区'
    }, {
      value: '520303',
      label: '汇川区'
    }, {
      value: '520321',
      label: '遵义县'
    }, {
      value: '520322',
      label: '桐梓县'
    }, {
      value: '520323',
      label: '绥阳县'
    }, {
      value: '520324',
      label: '正安县'
    }, {
      value: '520325',
      label: '道真仡佬族苗族自治县'
    }, {
      value: '520326',
      label: '务川仡佬族苗族自治县'
    }, {
      value: '520327',
      label: '凤冈县'
    }, {
      value: '520328',
      label: '湄潭县'
    }, {
      value: '520329',
      label: '余庆县'
    }, {
      value: '520330',
      label: '习水县'
    }, {
      value: '520381',
      label: '赤水市'
    }, {
      value: '520382',
      label: '仁怀市'
    }]
  }, {
    value: '520400',
    label: '安顺市',
    children: [{
      value: '520402',
      label: '西秀区'
    }, {
      value: '520421',
      label: '平坝县'
    }, {
      value: '520422',
      label: '普定县'
    }, {
      value: '520423',
      label: '镇宁布依族苗族自治县'
    }, {
      value: '520424',
      label: '关岭布依族苗族自治县'
    }, {
      value: '520425',
      label: '紫云苗族布依族自治县'
    }]
  }, {
    value: '522200',
    label: '铜仁市',
    children: [{
      value: '520602',
      label: '碧江区'
    }, {
      value: '520603',
      label: '万山区'
    }, {
      value: '522222',
      label: '江口县'
    }, {
      value: '522223',
      label: '玉屏侗族自治县'
    }, {
      value: '522224',
      label: '石阡县'
    }, {
      value: '522225',
      label: '思南县'
    }, {
      value: '522226',
      label: '印江土家族苗族自治县'
    }, {
      value: '522227',
      label: '德江县'
    }, {
      value: '522228',
      label: '沿河土家族自治县'
    }, {
      value: '522229',
      label: '松桃苗族自治县'
    }]
  }, {
    value: '522400',
    label: '毕节市',
    children: [{
      value: '522401',
      label: '七星关区'
    }, {
      value: '522422',
      label: '大方县'
    }, {
      value: '522423',
      label: '黔西县'
    }, {
      value: '522424',
      label: '金沙县'
    }, {
      value: '522425',
      label: '织金县'
    }, {
      value: '522426',
      label: '纳雍县'
    }, {
      value: '522427',
      label: '威宁彝族回族苗族自治县'
    }, {
      value: '522428',
      label: '赫章县'
    }]
  }, {
    value: '522300',
    label: '黔西南布依族苗族自治州',
    children: [{
      value: '522301',
      label: '兴义市'
    }, {
      value: '522322',
      label: '兴仁县'
    }, {
      value: '522323',
      label: '普安县'
    }, {
      value: '522324',
      label: '晴隆县'
    }, {
      value: '522325',
      label: '贞丰县'
    }, {
      value: '522326',
      label: '望谟县'
    }, {
      value: '522327',
      label: '册亨县'
    }, {
      value: '522328',
      label: '安龙县'
    }]
  }, {
    value: '522600',
    label: '黔东南苗族侗族自治州',
    children: [{
      value: '522601',
      label: '凯里市'
    }, {
      value: '522622',
      label: '黄平县'
    }, {
      value: '522623',
      label: '施秉县'
    }, {
      value: '522624',
      label: '三穗县'
    }, {
      value: '522625',
      label: '镇远县'
    }, {
      value: '522626',
      label: '岑巩县'
    }, {
      value: '522627',
      label: '天柱县'
    }, {
      value: '522628',
      label: '锦屏县'
    }, {
      value: '522629',
      label: '剑河县'
    }, {
      value: '522630',
      label: '台江县'
    }, {
      value: '522631',
      label: '黎平县'
    }, {
      value: '522632',
      label: '榕江县'
    }, {
      value: '522633',
      label: '从江县'
    }, {
      value: '522634',
      label: '雷山县'
    }, {
      value: '522635',
      label: '麻江县'
    }, {
      value: '522636',
      label: '丹寨县'
    }]
  }, {
    value: '522700',
    label: '黔南布依族苗族自治州',
    children: [{
      value: '522701',
      label: '都匀市'
    }, {
      value: '522702',
      label: '福泉市'
    }, {
      value: '522722',
      label: '荔波县'
    }, {
      value: '522723',
      label: '贵定县'
    }, {
      value: '522725',
      label: '瓮安县'
    }, {
      value: '522726',
      label: '独山县'
    }, {
      value: '522727',
      label: '平塘县'
    }, {
      value: '522728',
      label: '罗甸县'
    }, {
      value: '522729',
      label: '长顺县'
    }, {
      value: '522730',
      label: '龙里县'
    }, {
      value: '522731',
      label: '惠水县'
    }, {
      value: '522732',
      label: '三都水族自治县'
    }]
  }]
}, {
  value: '530000',
  label: '云南省',
  children: [{
    value: '530100',
    label: '昆明市',
    children: [{
      value: '530102',
      label: '五华区'
    }, {
      value: '530103',
      label: '盘龙区'
    }, {
      value: '530111',
      label: '官渡区'
    }, {
      value: '530112',
      label: '西山区'
    }, {
      value: '530113',
      label: '东川区'
    }, {
      value: '530121',
      label: '呈贡县'
    }, {
      value: '530122',
      label: '晋宁县'
    }, {
      value: '530124',
      label: '富民县'
    }, {
      value: '530125',
      label: '宜良县'
    }, {
      value: '530126',
      label: '石林彝族自治县'
    }, {
      value: '530127',
      label: '嵩明县'
    }, {
      value: '530128',
      label: '禄劝彝族苗族自治县'
    }, {
      value: '530129',
      label: '寻甸回族彝族自治县'
    }, {
      value: '530181',
      label: '安宁市'
    }]
  }, {
    value: '530300',
    label: '曲靖市',
    children: [{
      value: '530302',
      label: '麒麟区'
    }, {
      value: '530321',
      label: '马龙县'
    }, {
      value: '530322',
      label: '陆良县'
    }, {
      value: '530323',
      label: '师宗县'
    }, {
      value: '530324',
      label: '罗平县'
    }, {
      value: '530325',
      label: '富源县'
    }, {
      value: '530326',
      label: '会泽县'
    }, {
      value: '530328',
      label: '沾益县'
    }, {
      value: '530381',
      label: '宣威市'
    }]
  }, {
    value: '530400',
    label: '玉溪市',
    children: [{
      value: '530402',
      label: '红塔区'
    }, {
      value: '530421',
      label: '江川县'
    }, {
      value: '530422',
      label: '澄江县'
    }, {
      value: '530423',
      label: '通海县'
    }, {
      value: '530424',
      label: '华宁县'
    }, {
      value: '530425',
      label: '易门县'
    }, {
      value: '530426',
      label: '峨山彝族自治县'
    }, {
      value: '530427',
      label: '新平彝族傣族自治县'
    }, {
      value: '530428',
      label: '元江哈尼族彝族傣族自治县'
    }]
  }, {
    value: '530500',
    label: '保山市',
    children: [{
      value: '530502',
      label: '隆阳区'
    }, {
      value: '530521',
      label: '施甸县'
    }, {
      value: '530522',
      label: '腾冲县'
    }, {
      value: '530523',
      label: '龙陵县'
    }, {
      value: '530524',
      label: '昌宁县'
    }]
  }, {
    value: '530600',
    label: '昭通市',
    children: [{
      value: '530602',
      label: '昭阳区'
    }, {
      value: '530621',
      label: '鲁甸县'
    }, {
      value: '530622',
      label: '巧家县'
    }, {
      value: '530623',
      label: '盐津县'
    }, {
      value: '530624',
      label: '大关县'
    }, {
      value: '530625',
      label: '永善县'
    }, {
      value: '530626',
      label: '绥江县'
    }, {
      value: '530627',
      label: '镇雄县'
    }, {
      value: '530628',
      label: '彝良县'
    }, {
      value: '530629',
      label: '威信县'
    }, {
      value: '530630',
      label: '水富县'
    }]
  }, {
    value: '530700',
    label: '丽江市',
    children: [{
      value: '530702',
      label: '古城区'
    }, {
      value: '530721',
      label: '玉龙纳西族自治县'
    }, {
      value: '530722',
      label: '永胜县'
    }, {
      value: '530723',
      label: '华坪县'
    }, {
      value: '530724',
      label: '宁蒗彝族自治县'
    }]
  }, {
    value: '530800',
    label: '普洱市',
    children: [{
      value: '530802',
      label: '思茅区'
    }, {
      value: '530821',
      label: '宁洱哈尼族彝族自治县'
    }, {
      value: '530822',
      label: '墨江哈尼族自治县'
    }, {
      value: '530823',
      label: '景东彝族自治县'
    }, {
      value: '530824',
      label: '景谷傣族彝族自治县'
    }, {
      value: '530825',
      label: '镇沅彝族哈尼族拉祜族自治县'
    }, {
      value: '530826',
      label: '江城哈尼族彝族自治县'
    }, {
      value: '530827',
      label: '孟连傣族拉祜族佤族自治县'
    }, {
      value: '530828',
      label: '澜沧拉祜族自治县'
    }, {
      value: '530829',
      label: '西盟佤族自治县'
    }]
  }, {
    value: '530900',
    label: '临沧市',
    children: [{
      value: '530902',
      label: '临翔区'
    }, {
      value: '530921',
      label: '凤庆县'
    }, {
      value: '530922',
      label: '云　县'
    }, {
      value: '530923',
      label: '永德县'
    }, {
      value: '530924',
      label: '镇康县'
    }, {
      value: '530925',
      label: '双江拉祜族佤族布朗族傣族自治县'
    }, {
      value: '530926',
      label: '耿马傣族佤族自治县'
    }, {
      value: '530927',
      label: '沧源佤族自治县'
    }]
  }, {
    value: '532300',
    label: '楚雄彝族自治州',
    children: [{
      value: '532301',
      label: '楚雄市'
    }, {
      value: '532322',
      label: '双柏县'
    }, {
      value: '532323',
      label: '牟定县'
    }, {
      value: '532324',
      label: '南华县'
    }, {
      value: '532325',
      label: '姚安县'
    }, {
      value: '532326',
      label: '大姚县'
    }, {
      value: '532327',
      label: '永仁县'
    }, {
      value: '532328',
      label: '元谋县'
    }, {
      value: '532329',
      label: '武定县'
    }, {
      value: '532331',
      label: '禄丰县'
    }]
  }, {
    value: '532500',
    label: '红河哈尼族彝族自治州',
    children: [{
      value: '532501',
      label: '个旧市'
    }, {
      value: '532502',
      label: '开远市'
    }, {
      value: '532503',
      label: '蒙自市'
    }, {
      value: '532504',
      label: '弥勒市'
    }, {
      value: '532523',
      label: '屏边苗族自治县'
    }, {
      value: '532524',
      label: '建水县'
    }, {
      value: '532525',
      label: '石屏县'
    }, {
      value: '532527',
      label: '泸西县'
    }, {
      value: '532528',
      label: '元阳县'
    }, {
      value: '532529',
      label: '红河县'
    }, {
      value: '532530',
      label: '金平苗族瑶族傣族自治县'
    }, {
      value: '532531',
      label: '绿春县'
    }, {
      value: '532532',
      label: '河口瑶族自治县'
    }]
  }, {
    value: '532600',
    label: '文山壮族苗族自治州',
    children: [{
      value: '532621',
      label: '文山市'
    }, {
      value: '532622',
      label: '砚山县'
    }, {
      value: '532623',
      label: '西畴县'
    }, {
      value: '532624',
      label: '麻栗坡县'
    }, {
      value: '532625',
      label: '马关县'
    }, {
      value: '532626',
      label: '丘北县'
    }, {
      value: '532627',
      label: '广南县'
    }, {
      value: '532628',
      label: '富宁县'
    }]
  }, {
    value: '532800',
    label: '西双版纳傣族自治州',
    children: [{
      value: '532801',
      label: '景洪市'
    }, {
      value: '532822',
      label: '勐海县'
    }, {
      value: '532823',
      label: '勐腊县'
    }]
  }, {
    value: '532900',
    label: '大理白族自治州',
    children: [{
      value: '532901',
      label: '大理市'
    }, {
      value: '532922',
      label: '漾濞彝族自治县'
    }, {
      value: '532923',
      label: '祥云县'
    }, {
      value: '532924',
      label: '宾川县'
    }, {
      value: '532925',
      label: '弥渡县'
    }, {
      value: '532926',
      label: '南涧彝族自治县'
    }, {
      value: '532927',
      label: '巍山彝族回族自治县'
    }, {
      value: '532928',
      label: '永平县'
    }, {
      value: '532929',
      label: '云龙县'
    }, {
      value: '532930',
      label: '洱源县'
    }, {
      value: '532931',
      label: '剑川县'
    }, {
      value: '532932',
      label: '鹤庆县'
    }]
  }, {
    value: '533100',
    label: '德宏傣族景颇族自治州',
    children: [{
      value: '533102',
      label: '瑞丽市'
    }, {
      value: '533103',
      label: '芒市'
    }, {
      value: '533122',
      label: '梁河县'
    }, {
      value: '533123',
      label: '盈江县'
    }, {
      value: '533124',
      label: '陇川县'
    }]
  }, {
    value: '533300',
    label: '怒江傈僳族自治州',
    children: [{
      value: '533321',
      label: '泸水县'
    }, {
      value: '533323',
      label: '福贡县'
    }, {
      value: '533324',
      label: '贡山独龙族怒族自治县'
    }, {
      value: '533325',
      label: '兰坪白族普米族自治县'
    }]
  }, {
    value: '533400',
    label: '迪庆藏族自治州',
    children: [{
      value: '533421',
      label: '香格里拉县'
    }, {
      value: '533422',
      label: '德钦县'
    }, {
      value: '533423',
      label: '维西傈僳族自治县'
    }]
  }]
}, {
  value: '540000',
  label: '西藏自治区',
  children: [{
    value: '540100',
    label: '拉萨市',
    children: [{
      value: '540102',
      label: '城关区'
    }, {
      value: '540121',
      label: '林周县'
    }, {
      value: '540122',
      label: '当雄县'
    }, {
      value: '540123',
      label: '尼木县'
    }, {
      value: '540124',
      label: '曲水县'
    }, {
      value: '540125',
      label: '堆龙德庆县'
    }, {
      value: '540126',
      label: '达孜县'
    }, {
      value: '540127',
      label: '墨竹工卡县'
    }]
  }, {
    value: '542100',
    label: '昌都市',
    children: [{
      value: '542102',
      label: '卡若区'
    }, {
      value: '542122',
      label: '江达县'
    }, {
      value: '542123',
      label: '贡觉县'
    }, {
      value: '542124',
      label: '类乌齐县'
    }, {
      value: '542125',
      label: '丁青县'
    }, {
      value: '542126',
      label: '察雅县'
    }, {
      value: '542127',
      label: '八宿县'
    }, {
      value: '542128',
      label: '左贡县'
    }, {
      value: '542129',
      label: '芒康县'
    }, {
      value: '542132',
      label: '洛隆县'
    }, {
      value: '542133',
      label: '边坝县'
    }]
  }, {
    value: '542200',
    label: '山南地区',
    children: [{
      value: '542221',
      label: '乃东县'
    }, {
      value: '542222',
      label: '扎囊县'
    }, {
      value: '542223',
      label: '贡嘎县'
    }, {
      value: '542224',
      label: '桑日县'
    }, {
      value: '542225',
      label: '琼结县'
    }, {
      value: '542226',
      label: '曲松县'
    }, {
      value: '542227',
      label: '措美县'
    }, {
      value: '542228',
      label: '洛扎县'
    }, {
      value: '542229',
      label: '加查县'
    }, {
      value: '542231',
      label: '隆子县'
    }, {
      value: '542232',
      label: '错那县'
    }, {
      value: '542233',
      label: '浪卡子县'
    }]
  }, {
    value: '542300',
    label: '日喀则市',
    children: [{
      value: '542302',
      label: '桑珠孜区'
    }, {
      value: '542322',
      label: '南木林县'
    }, {
      value: '542323',
      label: '江孜县'
    }, {
      value: '542324',
      label: '定日县'
    }, {
      value: '542325',
      label: '萨迦县'
    }, {
      value: '542326',
      label: '拉孜县'
    }, {
      value: '542327',
      label: '昂仁县'
    }, {
      value: '542328',
      label: '谢通门县'
    }, {
      value: '542329',
      label: '白朗县'
    }, {
      value: '542330',
      label: '仁布县'
    }, {
      value: '542331',
      label: '康马县'
    }, {
      value: '542332',
      label: '定结县'
    }, {
      value: '542333',
      label: '仲巴县'
    }, {
      value: '542334',
      label: '亚东县'
    }, {
      value: '542335',
      label: '吉隆县'
    }, {
      value: '542336',
      label: '聂拉木县'
    }, {
      value: '542337',
      label: '萨嘎县'
    }, {
      value: '542338',
      label: '岗巴县'
    }]
  }, {
    value: '542400',
    label: '那曲地区',
    children: [{
      value: '542421',
      label: '那曲县'
    }, {
      value: '542422',
      label: '嘉黎县'
    }, {
      value: '542423',
      label: '比如县'
    }, {
      value: '542424',
      label: '聂荣县'
    }, {
      value: '542425',
      label: '安多县'
    }, {
      value: '542426',
      label: '申扎县'
    }, {
      value: '542427',
      label: '索　县'
    }, {
      value: '542428',
      label: '班戈县'
    }, {
      value: '542429',
      label: '巴青县'
    }, {
      value: '542430',
      label: '尼玛县'
    }, {
      value: '542431',
      label: '双湖县'
    }]
  }, {
    value: '542500',
    label: '阿里地区',
    children: [{
      value: '542521',
      label: '普兰县'
    }, {
      value: '542522',
      label: '札达县'
    }, {
      value: '542523',
      label: '噶尔县'
    }, {
      value: '542524',
      label: '日土县'
    }, {
      value: '542525',
      label: '革吉县'
    }, {
      value: '542526',
      label: '改则县'
    }, {
      value: '542527',
      label: '措勤县'
    }]
  }, {
    value: '542600',
    label: '林芝市',
    children: [{
      value: '542602',
      label: '巴宜区'
    }, {
      value: '542622',
      label: '工布江达县'
    }, {
      value: '542623',
      label: '米林县'
    }, {
      value: '542624',
      label: '墨脱县'
    }, {
      value: '542625',
      label: '波密县'
    }, {
      value: '542626',
      label: '察隅县'
    }, {
      value: '542627',
      label: '朗　县'
    }]
  }]
}, {
  value: '610000',
  label: '陕西省',
  children: [{
    value: '610100',
    label: '西安市',
    children: [{
      value: '610102',
      label: '新城区'
    }, {
      value: '610103',
      label: '碑林区'
    }, {
      value: '610104',
      label: '莲湖区'
    }, {
      value: '610111',
      label: '灞桥区'
    }, {
      value: '610112',
      label: '未央区'
    }, {
      value: '610113',
      label: '雁塔区'
    }, {
      value: '610114',
      label: '阎良区'
    }, {
      value: '610115',
      label: '临潼区'
    }, {
      value: '610116',
      label: '长安区'
    }, {
      value: '610117',
      label: '高陵区'
    }, {
      value: '610122',
      label: '蓝田县'
    }, {
      value: '610124',
      label: '周至县'
    }, {
      value: '610125',
      label: '户　县'
    }, {
      value: '610126',
      label: '杨凌农业示范区'
    }]
  }, {
    value: '610200',
    label: '铜川市',
    children: [{
      value: '610202',
      label: '王益区'
    }, {
      value: '610203',
      label: '印台区'
    }, {
      value: '610204',
      label: '耀州区'
    }, {
      value: '610222',
      label: '宜君县'
    }]
  }, {
    value: '610300',
    label: '宝鸡市',
    children: [{
      value: '610302',
      label: '渭滨区'
    }, {
      value: '610303',
      label: '金台区'
    }, {
      value: '610304',
      label: '陈仓区'
    }, {
      value: '610322',
      label: '凤翔县'
    }, {
      value: '610323',
      label: '岐山县'
    }, {
      value: '610324',
      label: '扶风县'
    }, {
      value: '610326',
      label: '眉　县'
    }, {
      value: '610327',
      label: '陇　县'
    }, {
      value: '610328',
      label: '千阳县'
    }, {
      value: '610329',
      label: '麟游县'
    }, {
      value: '610330',
      label: '凤　县'
    }, {
      value: '610331',
      label: '太白县'
    }]
  }, {
    value: '610400',
    label: '咸阳市',
    children: [{
      value: '610402',
      label: '秦都区'
    }, {
      value: '610403',
      label: '杨陵区'
    }, {
      value: '610404',
      label: '渭城区'
    }, {
      value: '610422',
      label: '三原县'
    }, {
      value: '610423',
      label: '泾阳县'
    }, {
      value: '610424',
      label: '乾　县'
    }, {
      value: '610425',
      label: '礼泉县'
    }, {
      value: '610426',
      label: '永寿县'
    }, {
      value: '610427',
      label: '彬　县'
    }, {
      value: '610428',
      label: '长武县'
    }, {
      value: '610429',
      label: '旬邑县'
    }, {
      value: '610430',
      label: '淳化县'
    }, {
      value: '610431',
      label: '武功县'
    }, {
      value: '610481',
      label: '兴平市'
    }]
  }, {
    value: '610500',
    label: '渭南市',
    children: [{
      value: '610502',
      label: '临渭区'
    }, {
      value: '610521',
      label: '华　县'
    }, {
      value: '610522',
      label: '潼关县'
    }, {
      value: '610523',
      label: '大荔县'
    }, {
      value: '610524',
      label: '合阳县'
    }, {
      value: '610525',
      label: '澄城县'
    }, {
      value: '610526',
      label: '蒲城县'
    }, {
      value: '610527',
      label: '白水县'
    }, {
      value: '610528',
      label: '富平县'
    }, {
      value: '610581',
      label: '韩城市'
    }, {
      value: '610582',
      label: '华阴市'
    }]
  }, {
    value: '610600',
    label: '延安市',
    children: [{
      value: '610602',
      label: '宝塔区'
    }, {
      value: '610621',
      label: '延长县'
    }, {
      value: '610622',
      label: '延川县'
    }, {
      value: '610623',
      label: '子长县'
    }, {
      value: '610624',
      label: '安塞县'
    }, {
      value: '610625',
      label: '志丹县'
    }, {
      value: '610626',
      label: '吴旗县'
    }, {
      value: '610627',
      label: '甘泉县'
    }, {
      value: '610628',
      label: '富　县'
    }, {
      value: '610629',
      label: '洛川县'
    }, {
      value: '610630',
      label: '宜川县'
    }, {
      value: '610631',
      label: '黄龙县'
    }, {
      value: '610632',
      label: '黄陵县'
    }]
  }, {
    value: '610700',
    label: '汉中市',
    children: [{
      value: '610702',
      label: '汉台区'
    }, {
      value: '610721',
      label: '南郑县'
    }, {
      value: '610722',
      label: '城固县'
    }, {
      value: '610723',
      label: '洋　县'
    }, {
      value: '610724',
      label: '西乡县'
    }, {
      value: '610725',
      label: '勉　县'
    }, {
      value: '610726',
      label: '宁强县'
    }, {
      value: '610727',
      label: '略阳县'
    }, {
      value: '610728',
      label: '镇巴县'
    }, {
      value: '610729',
      label: '留坝县'
    }, {
      value: '610730',
      label: '佛坪县'
    }]
  }, {
    value: '610800',
    label: '榆林市',
    children: [{
      value: '610802',
      label: '榆阳区'
    }, {
      value: '610821',
      label: '神木县'
    }, {
      value: '610822',
      label: '府谷县'
    }, {
      value: '610823',
      label: '横山县'
    }, {
      value: '610824',
      label: '靖边县'
    }, {
      value: '610825',
      label: '定边县'
    }, {
      value: '610826',
      label: '绥德县'
    }, {
      value: '610827',
      label: '米脂县'
    }, {
      value: '610828',
      label: '佳　县'
    }, {
      value: '610829',
      label: '吴堡县'
    }, {
      value: '610830',
      label: '清涧县'
    }, {
      value: '610831',
      label: '子洲县'
    }]
  }, {
    value: '610900',
    label: '安康市',
    children: [{
      value: '610902',
      label: '汉滨区'
    }, {
      value: '610921',
      label: '汉阴县'
    }, {
      value: '610922',
      label: '石泉县'
    }, {
      value: '610923',
      label: '宁陕县'
    }, {
      value: '610924',
      label: '紫阳县'
    }, {
      value: '610925',
      label: '岚皋县'
    }, {
      value: '610926',
      label: '平利县'
    }, {
      value: '610927',
      label: '镇坪县'
    }, {
      value: '610928',
      label: '旬阳县'
    }, {
      value: '610929',
      label: '白河县'
    }]
  }, {
    value: '611000',
    label: '商洛市',
    children: [{
      value: '611002',
      label: '商州区'
    }, {
      value: '611021',
      label: '洛南县'
    }, {
      value: '611022',
      label: '丹凤县'
    }, {
      value: '611023',
      label: '商南县'
    }, {
      value: '611024',
      label: '山阳县'
    }, {
      value: '611025',
      label: '镇安县'
    }, {
      value: '611026',
      label: '柞水县'
    }]
  }]
}, {
  value: '620000',
  label: '甘肃省',
  children: [{
    value: '620100',
    label: '兰州市',
    children: [{
      value: '620102',
      label: '城关区'
    }, {
      value: '620103',
      label: '七里河区'
    }, {
      value: '620104',
      label: '西固区'
    }, {
      value: '620105',
      label: '安宁区'
    }, {
      value: '620111',
      label: '红古区'
    }, {
      value: '620121',
      label: '永登县'
    }, {
      value: '620122',
      label: '皋兰县'
    }, {
      value: '620123',
      label: '榆中县'
    }]
  }, {
    value: '620200',
    label: '嘉峪关市',
    children: [{
      value: '659059',
      label: '雄关区'
    }, {
      value: '659060',
      label: '长城区'
    }, {
      value: '659061',
      label: '镜铁区'
    }]
  }, {
    value: '620300',
    label: '金昌市',
    children: [{
      value: '620302',
      label: '金川区'
    }, {
      value: '620321',
      label: '永昌县'
    }]
  }, {
    value: '620400',
    label: '白银市',
    children: [{
      value: '620402',
      label: '白银区'
    }, {
      value: '620403',
      label: '平川区'
    }, {
      value: '620421',
      label: '靖远县'
    }, {
      value: '620422',
      label: '会宁县'
    }, {
      value: '620423',
      label: '景泰县'
    }]
  }, {
    value: '620500',
    label: '天水市',
    children: [{
      value: '620502',
      label: '秦州区'
    }, {
      value: '620503',
      label: '麦积区'
    }, {
      value: '620521',
      label: '清水县'
    }, {
      value: '620522',
      label: '秦安县'
    }, {
      value: '620523',
      label: '甘谷县'
    }, {
      value: '620524',
      label: '武山县'
    }, {
      value: '620525',
      label: '张家川回族自治县'
    }]
  }, {
    value: '620600',
    label: '武威市',
    children: [{
      value: '620602',
      label: '凉州区'
    }, {
      value: '620621',
      label: '民勤县'
    }, {
      value: '620622',
      label: '古浪县'
    }, {
      value: '620623',
      label: '天祝藏族自治县'
    }]
  }, {
    value: '620700',
    label: '张掖市',
    children: [{
      value: '620702',
      label: '甘州区'
    }, {
      value: '620721',
      label: '肃南裕固族自治县'
    }, {
      value: '620722',
      label: '民乐县'
    }, {
      value: '620723',
      label: '临泽县'
    }, {
      value: '620724',
      label: '高台县'
    }, {
      value: '620725',
      label: '山丹县'
    }]
  }, {
    value: '620800',
    label: '平凉市',
    children: [{
      value: '620802',
      label: '崆峒区'
    }, {
      value: '620821',
      label: '泾川县'
    }, {
      value: '620822',
      label: '灵台县'
    }, {
      value: '620823',
      label: '崇信县'
    }, {
      value: '620824',
      label: '华亭县'
    }, {
      value: '620825',
      label: '庄浪县'
    }, {
      value: '620826',
      label: '静宁县'
    }]
  }, {
    value: '620900',
    label: '酒泉市',
    children: [{
      value: '620902',
      label: '肃州区'
    }, {
      value: '620921',
      label: '金塔县'
    }, {
      value: '620922',
      label: '瓜州县'
    }, {
      value: '620923',
      label: '肃北蒙古族自治县'
    }, {
      value: '620924',
      label: '阿克塞哈萨克族自治县'
    }, {
      value: '620981',
      label: '玉门市'
    }, {
      value: '620982',
      label: '敦煌市'
    }]
  }, {
    value: '621000',
    label: '庆阳市',
    children: [{
      value: '621002',
      label: '西峰区'
    }, {
      value: '621021',
      label: '庆城县'
    }, {
      value: '621022',
      label: '环　县'
    }, {
      value: '621023',
      label: '华池县'
    }, {
      value: '621024',
      label: '合水县'
    }, {
      value: '621025',
      label: '正宁县'
    }, {
      value: '621026',
      label: '宁　县'
    }, {
      value: '621027',
      label: '镇原县'
    }]
  }, {
    value: '621100',
    label: '定西市',
    children: [{
      value: '621102',
      label: '安定区'
    }, {
      value: '621121',
      label: '通渭县'
    }, {
      value: '621122',
      label: '陇西县'
    }, {
      value: '621123',
      label: '渭源县'
    }, {
      value: '621124',
      label: '临洮县'
    }, {
      value: '621125',
      label: '漳　县'
    }, {
      value: '621126',
      label: '岷　县'
    }]
  }, {
    value: '621200',
    label: '陇南市',
    children: [{
      value: '621202',
      label: '武都区'
    }, {
      value: '621221',
      label: '成　县'
    }, {
      value: '621222',
      label: '文　县'
    }, {
      value: '621223',
      label: '宕昌县'
    }, {
      value: '621224',
      label: '康　县'
    }, {
      value: '621225',
      label: '西和县'
    }, {
      value: '621226',
      label: '礼　县'
    }, {
      value: '621227',
      label: '徽　县'
    }, {
      value: '621228',
      label: '两当县'
    }]
  }, {
    value: '622900',
    label: '临夏回族自治州',
    children: [{
      value: '622901',
      label: '临夏市'
    }, {
      value: '622921',
      label: '临夏县'
    }, {
      value: '622922',
      label: '康乐县'
    }, {
      value: '622923',
      label: '永靖县'
    }, {
      value: '622924',
      label: '广河县'
    }, {
      value: '622925',
      label: '和政县'
    }, {
      value: '622926',
      label: '东乡族自治县'
    }, {
      value: '622927',
      label: '积石山保安族东乡族撒拉族自治县'
    }]
  }, {
    value: '623000',
    label: '甘南藏族自治州',
    children: [{
      value: '623001',
      label: '合作市'
    }, {
      value: '623021',
      label: '临潭县'
    }, {
      value: '623022',
      label: '卓尼县'
    }, {
      value: '623023',
      label: '舟曲县'
    }, {
      value: '623024',
      label: '迭部县'
    }, {
      value: '623025',
      label: '玛曲县'
    }, {
      value: '623026',
      label: '碌曲县'
    }, {
      value: '623027',
      label: '夏河县'
    }]
  }]
}, {
  value: '630000',
  label: '青海省',
  children: [{
    value: '630100',
    label: '西宁市',
    children: [{
      value: '630102',
      label: '城东区'
    }, {
      value: '630103',
      label: '城中区'
    }, {
      value: '630104',
      label: '城西区'
    }, {
      value: '630105',
      label: '城北区'
    }, {
      value: '630121',
      label: '大通回族土族自治县'
    }, {
      value: '630122',
      label: '湟中县'
    }, {
      value: '630123',
      label: '湟源县'
    }]
  }, {
    value: '632100',
    label: '海东市',
    children: [{
      value: '632002',
      label: '乐都区'
    }, {
      value: '632121',
      label: '平安县'
    }, {
      value: '632122',
      label: '民和回族土族自治县'
    }, {
      value: '632126',
      label: '互助土族自治县'
    }, {
      value: '632127',
      label: '化隆回族自治县'
    }, {
      value: '632128',
      label: '循化撒拉族自治县'
    }]
  }, {
    value: '632200',
    label: '海北藏族自治州',
    children: [{
      value: '632221',
      label: '门源回族自治县'
    }, {
      value: '632222',
      label: '祁连县'
    }, {
      value: '632223',
      label: '海晏县'
    }, {
      value: '632224',
      label: '刚察县'
    }]
  }, {
    value: '632300',
    label: '黄南藏族自治州',
    children: [{
      value: '632321',
      label: '同仁县'
    }, {
      value: '632322',
      label: '尖扎县'
    }, {
      value: '632323',
      label: '泽库县'
    }, {
      value: '632324',
      label: '河南蒙古族自治县'
    }]
  }, {
    value: '632500',
    label: '海南藏族自治州',
    children: [{
      value: '632521',
      label: '共和县'
    }, {
      value: '632522',
      label: '同德县'
    }, {
      value: '632523',
      label: '贵德县'
    }, {
      value: '632524',
      label: '兴海县'
    }, {
      value: '632525',
      label: '贵南县'
    }]
  }, {
    value: '632600',
    label: '果洛藏族自治州',
    children: [{
      value: '632621',
      label: '玛沁县'
    }, {
      value: '632622',
      label: '班玛县'
    }, {
      value: '632623',
      label: '甘德县'
    }, {
      value: '632624',
      label: '达日县'
    }, {
      value: '632625',
      label: '久治县'
    }, {
      value: '632626',
      label: '玛多县'
    }]
  }, {
    value: '632700',
    label: '玉树藏族自治州',
    children: [{
      value: '632721',
      label: '玉树市'
    }, {
      value: '632722',
      label: '杂多县'
    }, {
      value: '632723',
      label: '称多县'
    }, {
      value: '632724',
      label: '治多县'
    }, {
      value: '632725',
      label: '囊谦县'
    }, {
      value: '632726',
      label: '曲麻莱县'
    }]
  }, {
    value: '632800',
    label: '海西蒙古族藏族自治州',
    children: [{
      value: '632801',
      label: '格尔木市'
    }, {
      value: '632802',
      label: '德令哈市'
    }, {
      value: '632821',
      label: '乌兰县'
    }, {
      value: '632822',
      label: '都兰县'
    }, {
      value: '632823',
      label: '天峻县'
    }]
  }]
}, {
  value: '640000',
  label: '宁夏回族自治区',
  children: [{
    value: '640100',
    label: '银川市',
    children: [{
      value: '640104',
      label: '兴庆区'
    }, {
      value: '640105',
      label: '西夏区'
    }, {
      value: '640106',
      label: '金凤区'
    }, {
      value: '640121',
      label: '永宁县'
    }, {
      value: '640122',
      label: '贺兰县'
    }, {
      value: '640181',
      label: '灵武市'
    }]
  }, {
    value: '640200',
    label: '石嘴山市',
    children: [{
      value: '640202',
      label: '大武口区'
    }, {
      value: '640205',
      label: '惠农区'
    }, {
      value: '640221',
      label: '平罗县'
    }]
  }, {
    value: '640300',
    label: '吴忠市',
    children: [{
      value: '640302',
      label: '利通区'
    }, {
      value: '640303',
      label: '红寺堡区'
    }, {
      value: '640323',
      label: '盐池县'
    }, {
      value: '640324',
      label: '同心县'
    }, {
      value: '640381',
      label: '青铜峡市'
    }]
  }, {
    value: '640400',
    label: '固原市',
    children: [{
      value: '640402',
      label: '原州区'
    }, {
      value: '640422',
      label: '西吉县'
    }, {
      value: '640423',
      label: '隆德县'
    }, {
      value: '640424',
      label: '泾源县'
    }, {
      value: '640425',
      label: '彭阳县'
    }]
  }, {
    value: '640500',
    label: '中卫市',
    children: [{
      value: '640502',
      label: '沙坡头区'
    }, {
      value: '640521',
      label: '中宁县'
    }, {
      value: '640522',
      label: '海原县'
    }]
  }]
}, {
  value: '650000',
  label: '新疆维吾尔自治区',
  children: [{
    value: '650100',
    label: '乌鲁木齐市',
    children: [{
      value: '650102',
      label: '天山区'
    }, {
      value: '650103',
      label: '沙依巴克区'
    }, {
      value: '650104',
      label: '新市区'
    }, {
      value: '650105',
      label: '水磨沟区'
    }, {
      value: '650106',
      label: '头屯河区'
    }, {
      value: '650107',
      label: '达坂城区'
    }, {
      value: '650108',
      label: '米东区'
    }, {
      value: '650121',
      label: '乌鲁木齐县'
    }]
  }, {
    value: '650200',
    label: '克拉玛依市',
    children: [{
      value: '650202',
      label: '独山子区'
    }, {
      value: '650203',
      label: '克拉玛依区'
    }, {
      value: '650204',
      label: '白碱滩区'
    }, {
      value: '650205',
      label: '乌尔禾区'
    }]
  }, {
    value: '652100',
    label: '吐鲁番市',
    children: [{
      value: '652102',
      label: '高昌区'
    }, {
      value: '652122',
      label: '鄯善县'
    }, {
      value: '652123',
      label: '托克逊县'
    }]
  }, {
    value: '652200',
    label: '哈密地区',
    children: [{
      value: '652201',
      label: '哈密市'
    }, {
      value: '652222',
      label: '巴里坤哈萨克自治县'
    }, {
      value: '652223',
      label: '伊吾县'
    }]
  }, {
    value: '652300',
    label: '昌吉回族自治州',
    children: [{
      value: '652301',
      label: '昌吉市'
    }, {
      value: '652302',
      label: '阜康市'
    }, {
      value: '652303',
      label: '米泉市'
    }, {
      value: '652323',
      label: '呼图壁县'
    }, {
      value: '652324',
      label: '玛纳斯县'
    }, {
      value: '652325',
      label: '奇台县'
    }, {
      value: '652327',
      label: '吉木萨尔县'
    }, {
      value: '652328',
      label: '木垒哈萨克自治县'
    }]
  }, {
    value: '652700',
    label: '博尔塔拉蒙古自治州',
    children: [{
      value: '652701',
      label: '博乐市'
    }, {
      value: '652702',
      label: '阿拉山口市'
    }, {
      value: '652722',
      label: '精河县'
    }, {
      value: '652723',
      label: '温泉县'
    }]
  }, {
    value: '652800',
    label: '巴音郭楞蒙古自治州',
    children: [{
      value: '652801',
      label: '库尔勒市'
    }, {
      value: '652822',
      label: '轮台县'
    }, {
      value: '652823',
      label: '尉犁县'
    }, {
      value: '652824',
      label: '若羌县'
    }, {
      value: '652825',
      label: '且末县'
    }, {
      value: '652826',
      label: '焉耆回族自治县'
    }, {
      value: '652827',
      label: '和静县'
    }, {
      value: '652828',
      label: '和硕县'
    }, {
      value: '652829',
      label: '博湖县'
    }]
  }, {
    value: '652900',
    label: '阿克苏地区',
    children: [{
      value: '652901',
      label: '阿克苏市'
    }, {
      value: '652922',
      label: '温宿县'
    }, {
      value: '652923',
      label: '库车县'
    }, {
      value: '652924',
      label: '沙雅县'
    }, {
      value: '652925',
      label: '新和县'
    }, {
      value: '652926',
      label: '拜城县'
    }, {
      value: '652927',
      label: '乌什县'
    }, {
      value: '652928',
      label: '阿瓦提县'
    }, {
      value: '652929',
      label: '柯坪县'
    }]
  }, {
    value: '653000',
    label: '克孜勒苏柯尔克孜自治州',
    children: [{
      value: '653001',
      label: '阿图什市'
    }, {
      value: '653022',
      label: '阿克陶县'
    }, {
      value: '653023',
      label: '阿合奇县'
    }, {
      value: '653024',
      label: '乌恰县'
    }]
  }, {
    value: '653100',
    label: '喀什地区',
    children: [{
      value: '653101',
      label: '喀什市'
    }, {
      value: '653121',
      label: '疏附县'
    }, {
      value: '653122',
      label: '疏勒县'
    }, {
      value: '653123',
      label: '英吉沙县'
    }, {
      value: '653124',
      label: '泽普县'
    }, {
      value: '653125',
      label: '莎车县'
    }, {
      value: '653126',
      label: '叶城县'
    }, {
      value: '653127',
      label: '麦盖提县'
    }, {
      value: '653128',
      label: '岳普湖县'
    }, {
      value: '653129',
      label: '伽师县'
    }, {
      value: '653130',
      label: '巴楚县'
    }, {
      value: '653131',
      label: '塔什库尔干塔吉克自治县'
    }]
  }, {
    value: '653200',
    label: '和田地区',
    children: [{
      value: '653201',
      label: '和田市'
    }, {
      value: '653221',
      label: '和田县'
    }, {
      value: '653222',
      label: '墨玉县'
    }, {
      value: '653223',
      label: '皮山县'
    }, {
      value: '653224',
      label: '洛浦县'
    }, {
      value: '653225',
      label: '策勒县'
    }, {
      value: '653226',
      label: '于田县'
    }, {
      value: '653227',
      label: '民丰县'
    }]
  }, {
    value: '654000',
    label: '伊犁哈萨克自治州',
    children: [{
      value: '654002',
      label: '伊宁市'
    }, {
      value: '654003',
      label: '奎屯市'
    }, {
      value: '654021',
      label: '伊宁县'
    }, {
      value: '654022',
      label: '察布查尔锡伯自治县'
    }, {
      value: '654023',
      label: '霍城县'
    }, {
      value: '654024',
      label: '巩留县'
    }, {
      value: '654025',
      label: '新源县'
    }, {
      value: '654026',
      label: '昭苏县'
    }, {
      value: '654027',
      label: '特克斯县'
    }, {
      value: '654028',
      label: '尼勒克县'
    }]
  }, {
    value: '654200',
    label: '塔城地区',
    children: [{
      value: '654201',
      label: '塔城市'
    }, {
      value: '654202',
      label: '乌苏市'
    }, {
      value: '654221',
      label: '额敏县'
    }, {
      value: '654223',
      label: '沙湾县'
    }, {
      value: '654224',
      label: '托里县'
    }, {
      value: '654225',
      label: '裕民县'
    }, {
      value: '654226',
      label: '和布克赛尔蒙古自治县'
    }]
  }, {
    value: '654300',
    label: '阿勒泰地区',
    children: [{
      value: '654301',
      label: '阿勒泰市'
    }, {
      value: '654321',
      label: '布尔津县'
    }, {
      value: '654322',
      label: '富蕴县'
    }, {
      value: '654323',
      label: '福海县'
    }, {
      value: '654324',
      label: '哈巴河县'
    }, {
      value: '654325',
      label: '青河县'
    }, {
      value: '654326',
      label: '吉木乃县'
    }]
  }, {
    value: '659000',
    label: '自治区直辖县级行政区划',
    children: [{
      value: '659001',
      label: '石河子市'
    }, {
      value: '659002',
      label: '阿拉尔市'
    }, {
      value: '659003',
      label: '图木舒克市'
    }, {
      value: '659004',
      label: '五家渠市'
    }]
  }]
}, {
  value: '710000',
  label: '台湾省',
  children: [{
    value: '710100',
    label: '台北市',
    children: [{
      value: '710101',
      label: '中正区'
    }, {
      value: '710102',
      label: '大同区'
    }, {
      value: '710103',
      label: '中山区'
    }, {
      value: '710104',
      label: '松山区'
    }, {
      value: '710105',
      label: '大安区'
    }, {
      value: '710106',
      label: '万华区'
    }, {
      value: '710107',
      label: '信义区'
    }, {
      value: '710108',
      label: '士林区'
    }, {
      value: '710109',
      label: '北投区'
    }, {
      value: '710110',
      label: '内湖区'
    }, {
      value: '710111',
      label: '南港区'
    }, {
      value: '710112',
      label: '文山区'
    }, {
      value: '710113',
      label: '其它区'
    }]
  }, {
    value: '710200',
    label: '高雄市',
    children: [{
      value: '710201',
      label: '新兴区'
    }, {
      value: '710202',
      label: '前金区'
    }, {
      value: '710203',
      label: '芩雅区'
    }, {
      value: '710204',
      label: '盐埕区'
    }, {
      value: '710205',
      label: '鼓山区'
    }, {
      value: '710206',
      label: '旗津区'
    }, {
      value: '710207',
      label: '前镇区'
    }, {
      value: '710208',
      label: '三民区'
    }, {
      value: '710209',
      label: '左营区'
    }, {
      value: '710210',
      label: '楠梓区'
    }, {
      value: '710211',
      label: '小港区'
    }, {
      value: '710212',
      label: '其它区'
    }, {
      value: '710241',
      label: '苓雅区'
    }, {
      value: '710242',
      label: '仁武区'
    }, {
      value: '710243',
      label: '大社区'
    }, {
      value: '710244',
      label: '冈山区'
    }, {
      value: '710245',
      label: '路竹区'
    }, {
      value: '710246',
      label: '阿莲区'
    }, {
      value: '710247',
      label: '田寮区'
    }, {
      value: '710248',
      label: '燕巢区'
    }, {
      value: '710249',
      label: '桥头区'
    }, {
      value: '710250',
      label: '梓官区'
    }, {
      value: '710251',
      label: '弥陀区'
    }, {
      value: '710252',
      label: '永安区'
    }, {
      value: '710253',
      label: '湖内区'
    }, {
      value: '710254',
      label: '凤山区'
    }, {
      value: '710255',
      label: '大寮区'
    }, {
      value: '710256',
      label: '林园区'
    }, {
      value: '710257',
      label: '鸟松区'
    }, {
      value: '710258',
      label: '大树区'
    }, {
      value: '710259',
      label: '旗山区'
    }, {
      value: '710260',
      label: '美浓区'
    }, {
      value: '710261',
      label: '六龟区'
    }, {
      value: '710262',
      label: '内门区'
    }, {
      value: '710263',
      label: '杉林区'
    }, {
      value: '710264',
      label: '甲仙区'
    }, {
      value: '710265',
      label: '桃源区'
    }, {
      value: '710266',
      label: '那玛夏区'
    }, {
      value: '710267',
      label: '茂林区'
    }, {
      value: '710268',
      label: '茄萣区'
    }]
  }, {
    value: '710300',
    label: '台南市',
    children: [{
      value: '710301',
      label: '中西区'
    }, {
      value: '710302',
      label: '东区'
    }, {
      value: '710303',
      label: '南区'
    }, {
      value: '710304',
      label: '北区'
    }, {
      value: '710305',
      label: '安平区'
    }, {
      value: '710306',
      label: '安南区'
    }, {
      value: '710307',
      label: '其它区'
    }, {
      value: '710339',
      label: '永康区'
    }, {
      value: '710340',
      label: '归仁区'
    }, {
      value: '710341',
      label: '新化区'
    }, {
      value: '710342',
      label: '左镇区'
    }, {
      value: '710343',
      label: '玉井区'
    }, {
      value: '710344',
      label: '楠西区'
    }, {
      value: '710345',
      label: '南化区'
    }, {
      value: '710346',
      label: '仁德区'
    }, {
      value: '710347',
      label: '关庙区'
    }, {
      value: '710348',
      label: '龙崎区'
    }, {
      value: '710349',
      label: '官田区'
    }, {
      value: '710350',
      label: '麻豆区'
    }, {
      value: '710351',
      label: '佳里区'
    }, {
      value: '710352',
      label: '西港区'
    }, {
      value: '710353',
      label: '七股区'
    }, {
      value: '710354',
      label: '将军区'
    }, {
      value: '710355',
      label: '学甲区'
    }, {
      value: '710356',
      label: '北门区'
    }, {
      value: '710357',
      label: '新营区'
    }, {
      value: '710358',
      label: '后壁区'
    }, {
      value: '710359',
      label: '白河区'
    }, {
      value: '710360',
      label: '东山区'
    }, {
      value: '710361',
      label: '六甲区'
    }, {
      value: '710362',
      label: '下营区'
    }, {
      value: '710363',
      label: '柳营区'
    }, {
      value: '710364',
      label: '盐水区'
    }, {
      value: '710365',
      label: '善化区'
    }, {
      value: '710366',
      label: '大内区'
    }, {
      value: '710367',
      label: '山上区'
    }, {
      value: '710368',
      label: '新市区'
    }, {
      value: '710369',
      label: '安定区'
    }]
  }, {
    value: '710400',
    label: '台中市',
    children: [{
      value: '710401',
      label: '中区'
    }, {
      value: '710402',
      label: '东区'
    }, {
      value: '710403',
      label: '南区'
    }, {
      value: '710404',
      label: '西区'
    }, {
      value: '710405',
      label: '北区'
    }, {
      value: '710406',
      label: '北屯区'
    }, {
      value: '710407',
      label: '西屯区'
    }, {
      value: '710408',
      label: '南屯区'
    }, {
      value: '710409',
      label: '其它区'
    }, {
      value: '710431',
      label: '太平区'
    }, {
      value: '710432',
      label: '大里区'
    }, {
      value: '710433',
      label: '雾峰区'
    }, {
      value: '710434',
      label: '乌日区'
    }, {
      value: '710435',
      label: '丰原区'
    }, {
      value: '710436',
      label: '后里区'
    }, {
      value: '710437',
      label: '石冈区'
    }, {
      value: '710438',
      label: '东势区'
    }, {
      value: '710439',
      label: '和平区'
    }, {
      value: '710440',
      label: '新社区'
    }, {
      value: '710441',
      label: '潭子区'
    }, {
      value: '710442',
      label: '大雅区'
    }, {
      value: '710443',
      label: '神冈区'
    }, {
      value: '710444',
      label: '大肚区'
    }, {
      value: '710445',
      label: '沙鹿区'
    }, {
      value: '710446',
      label: '龙井区'
    }, {
      value: '710447',
      label: '梧栖区'
    }, {
      value: '710448',
      label: '清水区'
    }, {
      value: '710449',
      label: '大甲区'
    }, {
      value: '710450',
      label: '外埔区'
    }, {
      value: '710451',
      label: '大安区'
    }]
  }, {
    value: '710500',
    label: '金门县',
    children: [{
      value: '710507',
      label: '金沙镇'
    }, {
      value: '710508',
      label: '金湖镇'
    }, {
      value: '710509',
      label: '金宁乡'
    }, {
      value: '710510',
      label: '金城镇'
    }, {
      value: '710511',
      label: '烈屿乡'
    }, {
      value: '710512',
      label: '乌坵乡'
    }]
  }, {
    value: '710600',
    label: '南投县',
    children: [{
      value: '710614',
      label: '南投市'
    }, {
      value: '710615',
      label: '中寮乡'
    }, {
      value: '710616',
      label: '草屯镇'
    }, {
      value: '710617',
      label: '国姓乡'
    }, {
      value: '710618',
      label: '埔里镇'
    }, {
      value: '710619',
      label: '仁爱乡'
    }, {
      value: '710620',
      label: '名间乡'
    }, {
      value: '710621',
      label: '集集镇'
    }, {
      value: '710622',
      label: '水里乡'
    }, {
      value: '710623',
      label: '鱼池乡'
    }, {
      value: '710624',
      label: '信义乡'
    }, {
      value: '710625',
      label: '竹山镇'
    }, {
      value: '710626',
      label: '鹿谷乡'
    }]
  }, {
    value: '710700',
    label: '基隆市',
    children: [{
      value: '710701',
      label: '仁爱区'
    }, {
      value: '710702',
      label: '信义区'
    }, {
      value: '710703',
      label: '中正区'
    }, {
      value: '710704',
      label: '中山区'
    }, {
      value: '710705',
      label: '安乐区'
    }, {
      value: '710706',
      label: '暖暖区'
    }, {
      value: '710707',
      label: '七堵区'
    }, {
      value: '710708',
      label: '其它区'
    }]
  }, {
    value: '710800',
    label: '新竹市',
    children: [{
      value: '710801',
      label: '东区'
    }, {
      value: '710802',
      label: '北区'
    }, {
      value: '710803',
      label: '香山区'
    }, {
      value: '710804',
      label: '其它区'
    }]
  }, {
    value: '710900',
    label: '嘉义市',
    children: [{
      value: '710901',
      label: '东区'
    }, {
      value: '710902',
      label: '西区'
    }, {
      value: '710903',
      label: '其它区'
    }]
  }, {
    value: '711100',
    label: '新北市',
    children: [{
      value: '711130',
      label: '万里区'
    }, {
      value: '711131',
      label: '金山区'
    }, {
      value: '711132',
      label: '板桥区'
    }, {
      value: '711133',
      label: '汐止区'
    }, {
      value: '711134',
      label: '深坑区'
    }, {
      value: '711135',
      label: '石碇区'
    }, {
      value: '711136',
      label: '瑞芳区'
    }, {
      value: '711137',
      label: '平溪区'
    }, {
      value: '711138',
      label: '双溪区'
    }, {
      value: '711139',
      label: '贡寮区'
    }, {
      value: '711140',
      label: '新店区'
    }, {
      value: '711141',
      label: '坪林区'
    }, {
      value: '711142',
      label: '乌来区'
    }, {
      value: '711143',
      label: '永和区'
    }, {
      value: '711144',
      label: '中和区'
    }, {
      value: '711145',
      label: '土城区'
    }, {
      value: '711146',
      label: '三峡区'
    }, {
      value: '711147',
      label: '树林区'
    }, {
      value: '711148',
      label: '莺歌区'
    }, {
      value: '711149',
      label: '三重区'
    }, {
      value: '711150',
      label: '新庄区'
    }, {
      value: '711151',
      label: '泰山区'
    }, {
      value: '711152',
      label: '林口区'
    }, {
      value: '711153',
      label: '芦洲区'
    }, {
      value: '711154',
      label: '五股区'
    }, {
      value: '711155',
      label: '八里区'
    }, {
      value: '711156',
      label: '淡水区'
    }, {
      value: '711157',
      label: '三芝区'
    }, {
      value: '711158',
      label: '石门区'
    }]
  }, {
    value: '711200',
    label: '宜兰县',
    children: [{
      value: '711214',
      label: '宜兰市'
    }, {
      value: '711215',
      label: '头城镇'
    }, {
      value: '711216',
      label: '礁溪乡'
    }, {
      value: '711217',
      label: '壮围乡'
    }, {
      value: '711218',
      label: '员山乡'
    }, {
      value: '711219',
      label: '罗东镇'
    }, {
      value: '711220',
      label: '三星乡'
    }, {
      value: '711221',
      label: '大同乡'
    }, {
      value: '711222',
      label: '五结乡'
    }, {
      value: '711223',
      label: '冬山乡'
    }, {
      value: '711224',
      label: '苏澳镇'
    }, {
      value: '711225',
      label: '南澳乡'
    }, {
      value: '711226',
      label: '钓鱼台'
    }]
  }, {
    value: '711300',
    label: '新竹县',
    children: [{
      value: '711314',
      label: '竹北市'
    }, {
      value: '711315',
      label: '湖口乡'
    }, {
      value: '711316',
      label: '新丰乡'
    }, {
      value: '711317',
      label: '新埔镇'
    }, {
      value: '711318',
      label: '关西镇'
    }, {
      value: '711319',
      label: '芎林乡'
    }, {
      value: '711320',
      label: '宝山乡'
    }, {
      value: '711321',
      label: '竹东镇'
    }, {
      value: '711322',
      label: '五峰乡'
    }, {
      value: '711323',
      label: '横山乡'
    }, {
      value: '711324',
      label: '尖石乡'
    }, {
      value: '711325',
      label: '北埔乡'
    }, {
      value: '711326',
      label: '峨眉乡'
    }]
  }, {
    value: '711400',
    label: '桃园县',
    children: [{
      value: '711414',
      label: '中坜市'
    }, {
      value: '711415',
      label: '平镇市'
    }, {
      value: '711416',
      label: '龙潭乡'
    }, {
      value: '711417',
      label: '杨梅市'
    }, {
      value: '711418',
      label: '新屋乡'
    }, {
      value: '711419',
      label: '观音乡'
    }, {
      value: '711420',
      label: '桃园市'
    }, {
      value: '711421',
      label: '龟山乡'
    }, {
      value: '711422',
      label: '八德市'
    }, {
      value: '711423',
      label: '大溪镇'
    }, {
      value: '711424',
      label: '复兴乡'
    }, {
      value: '711425',
      label: '大园乡'
    }, {
      value: '711426',
      label: '芦竹乡'
    }]
  }, {
    value: '711500',
    label: '苗栗县',
    children: [{
      value: '711519',
      label: '竹南镇'
    }, {
      value: '711520',
      label: '头份镇'
    }, {
      value: '711521',
      label: '三湾乡'
    }, {
      value: '711522',
      label: '南庄乡'
    }, {
      value: '711523',
      label: '狮潭乡'
    }, {
      value: '711524',
      label: '后龙镇'
    }, {
      value: '711525',
      label: '通霄镇'
    }, {
      value: '711526',
      label: '苑里镇'
    }, {
      value: '711527',
      label: '苗栗市'
    }, {
      value: '711528',
      label: '造桥乡'
    }, {
      value: '711529',
      label: '头屋乡'
    }, {
      value: '711530',
      label: '公馆乡'
    }, {
      value: '711531',
      label: '大湖乡'
    }, {
      value: '711532',
      label: '泰安乡'
    }, {
      value: '711533',
      label: '铜锣乡'
    }, {
      value: '711534',
      label: '三义乡'
    }, {
      value: '711535',
      label: '西湖乡'
    }, {
      value: '711536',
      label: '卓兰镇'
    }]
  }, {
    value: '711700',
    label: '彰化县',
    children: [{
      value: '711727',
      label: '彰化市'
    }, {
      value: '711728',
      label: '芬园乡'
    }, {
      value: '711729',
      label: '花坛乡'
    }, {
      value: '711730',
      label: '秀水乡'
    }, {
      value: '711731',
      label: '鹿港镇'
    }, {
      value: '711732',
      label: '福兴乡'
    }, {
      value: '711733',
      label: '线西乡'
    }, {
      value: '711734',
      label: '和美镇'
    }, {
      value: '711735',
      label: '伸港乡'
    }, {
      value: '711736',
      label: '员林镇'
    }, {
      value: '711737',
      label: '社头乡'
    }, {
      value: '711738',
      label: '永靖乡'
    }, {
      value: '711739',
      label: '埔心乡'
    }, {
      value: '711740',
      label: '溪湖镇'
    }, {
      value: '711741',
      label: '大村乡'
    }, {
      value: '711742',
      label: '埔盐乡'
    }, {
      value: '711743',
      label: '田中镇'
    }, {
      value: '711744',
      label: '北斗镇'
    }, {
      value: '711745',
      label: '田尾乡'
    }, {
      value: '711746',
      label: '埤头乡'
    }, {
      value: '711747',
      label: '溪州乡'
    }, {
      value: '711748',
      label: '竹塘乡'
    }, {
      value: '711749',
      label: '二林镇'
    }, {
      value: '711750',
      label: '大城乡'
    }, {
      value: '711751',
      label: '芳苑乡'
    }, {
      value: '711752',
      label: '二水乡'
    }]
  }, {
    value: '711900',
    label: '嘉义县',
    children: [{
      value: '711919',
      label: '番路乡'
    }, {
      value: '711920',
      label: '梅山乡'
    }, {
      value: '711921',
      label: '竹崎乡'
    }, {
      value: '711922',
      label: '阿里山乡'
    }, {
      value: '711923',
      label: '中埔乡'
    }, {
      value: '711924',
      label: '大埔乡'
    }, {
      value: '711925',
      label: '水上乡'
    }, {
      value: '711926',
      label: '鹿草乡'
    }, {
      value: '711927',
      label: '太保市'
    }, {
      value: '711928',
      label: '朴子市'
    }, {
      value: '711929',
      label: '东石乡'
    }, {
      value: '711930',
      label: '六脚乡'
    }, {
      value: '711931',
      label: '新港乡'
    }, {
      value: '711932',
      label: '民雄乡'
    }, {
      value: '711933',
      label: '大林镇'
    }, {
      value: '711934',
      label: '溪口乡'
    }, {
      value: '711935',
      label: '义竹乡'
    }, {
      value: '711936',
      label: '布袋镇'
    }]
  }, {
    value: '712100',
    label: '云林县',
    children: [{
      value: '712121',
      label: '斗南镇'
    }, {
      value: '712122',
      label: '大埤乡'
    }, {
      value: '712123',
      label: '虎尾镇'
    }, {
      value: '712124',
      label: '土库镇'
    }, {
      value: '712125',
      label: '褒忠乡'
    }, {
      value: '712126',
      label: '东势乡'
    }, {
      value: '712127',
      label: '台西乡'
    }, {
      value: '712128',
      label: '仑背乡'
    }, {
      value: '712129',
      label: '麦寮乡'
    }, {
      value: '712130',
      label: '斗六市'
    }, {
      value: '712131',
      label: '林内乡'
    }, {
      value: '712132',
      label: '古坑乡'
    }, {
      value: '712133',
      label: '莿桐乡'
    }, {
      value: '712134',
      label: '西螺镇'
    }, {
      value: '712135',
      label: '二仑乡'
    }, {
      value: '712136',
      label: '北港镇'
    }, {
      value: '712137',
      label: '水林乡'
    }, {
      value: '712138',
      label: '口湖乡'
    }, {
      value: '712139',
      label: '四湖乡'
    }, {
      value: '712140',
      label: '元长乡'
    }]
  }, {
    value: '712400',
    label: '屏东县',
    children: [{
      value: '712434',
      label: '屏东市'
    }, {
      value: '712435',
      label: '三地门乡'
    }, {
      value: '712436',
      label: '雾台乡'
    }, {
      value: '712437',
      label: '玛家乡'
    }, {
      value: '712438',
      label: '九如乡'
    }, {
      value: '712439',
      label: '里港乡'
    }, {
      value: '712440',
      label: '高树乡'
    }, {
      value: '712441',
      label: '盐埔乡'
    }, {
      value: '712442',
      label: '长治乡'
    }, {
      value: '712443',
      label: '麟洛乡'
    }, {
      value: '712444',
      label: '竹田乡'
    }, {
      value: '712445',
      label: '内埔乡'
    }, {
      value: '712446',
      label: '万丹乡'
    }, {
      value: '712447',
      label: '潮州镇'
    }, {
      value: '712448',
      label: '泰武乡'
    }, {
      value: '712449',
      label: '来义乡'
    }, {
      value: '712450',
      label: '万峦乡'
    }, {
      value: '712451',
      label: '崁顶乡'
    }, {
      value: '712452',
      label: '新埤乡'
    }, {
      value: '712453',
      label: '南州乡'
    }, {
      value: '712454',
      label: '林边乡'
    }, {
      value: '712455',
      label: '东港镇'
    }, {
      value: '712456',
      label: '琉球乡'
    }, {
      value: '712457',
      label: '佳冬乡'
    }, {
      value: '712458',
      label: '新园乡'
    }, {
      value: '712459',
      label: '枋寮乡'
    }, {
      value: '712460',
      label: '枋山乡'
    }, {
      value: '712461',
      label: '春日乡'
    }, {
      value: '712462',
      label: '狮子乡'
    }, {
      value: '712463',
      label: '车城乡'
    }, {
      value: '712464',
      label: '牡丹乡'
    }, {
      value: '712465',
      label: '恒春镇'
    }, {
      value: '712466',
      label: '满州乡'
    }]
  }, {
    value: '712500',
    label: '台东县',
    children: [{
      value: '712517',
      label: '台东市'
    }, {
      value: '712518',
      label: '绿岛乡'
    }, {
      value: '712519',
      label: '兰屿乡'
    }, {
      value: '712520',
      label: '延平乡'
    }, {
      value: '712521',
      label: '卑南乡'
    }, {
      value: '712522',
      label: '鹿野乡'
    }, {
      value: '712523',
      label: '关山镇'
    }, {
      value: '712524',
      label: '海端乡'
    }, {
      value: '712525',
      label: '池上乡'
    }, {
      value: '712526',
      label: '东河乡'
    }, {
      value: '712527',
      label: '成功镇'
    }, {
      value: '712528',
      label: '长滨乡'
    }, {
      value: '712529',
      label: '金峰乡'
    }, {
      value: '712530',
      label: '大武乡'
    }, {
      value: '712531',
      label: '达仁乡'
    }, {
      value: '712532',
      label: '太麻里乡'
    }]
  }, {
    value: '712600',
    label: '花莲县',
    children: [{
      value: '712615',
      label: '花莲市'
    }, {
      value: '712616',
      label: '新城乡'
    }, {
      value: '712617',
      label: '太鲁阁'
    }, {
      value: '712618',
      label: '秀林乡'
    }, {
      value: '712619',
      label: '吉安乡'
    }, {
      value: '712620',
      label: '寿丰乡'
    }, {
      value: '712621',
      label: '凤林镇'
    }, {
      value: '712622',
      label: '光复乡'
    }, {
      value: '712623',
      label: '丰滨乡'
    }, {
      value: '712624',
      label: '瑞穗乡'
    }, {
      value: '712625',
      label: '万荣乡'
    }, {
      value: '712626',
      label: '玉里镇'
    }, {
      value: '712627',
      label: '卓溪乡'
    }, {
      value: '712628',
      label: '富里乡'
    }]
  }, {
    value: '712700',
    label: '澎湖县',
    children: [{
      value: '712707',
      label: '马公市'
    }, {
      value: '712708',
      label: '西屿乡'
    }, {
      value: '712709',
      label: '望安乡'
    }, {
      value: '712710',
      label: '七美乡'
    }, {
      value: '712711',
      label: '白沙乡'
    }, {
      value: '712712',
      label: '湖西乡'
    }]
  }, {
    value: '712800',
    label: '连江县',
    children: [{
      value: '712805',
      label: '南竿乡'
    }, {
      value: '712806',
      label: '北竿乡'
    }, {
      value: '712807',
      label: '莒光乡'
    }, {
      value: '712808',
      label: '东引乡'
    }]
  }]
}, {
  value: '810000',
  label: '香港特别行政区',
  children: [{
    value: '810100',
    label: '香港',
    children: [{
      value: '810101',
      label: '中西区'
    }, {
      value: '810102',
      label: '湾仔区'
    }, {
      value: '810103',
      label: '东区'
    }, {
      value: '810104',
      label: '南区'
    }, {
      value: '810105',
      label: '油尖旺区'
    }, {
      value: '810106',
      label: '深水埗区'
    }, {
      value: '810107',
      label: '九龙城区'
    }, {
      value: '810108',
      label: '黄大仙区'
    }, {
      value: '810109',
      label: '观塘区'
    }, {
      value: '810110',
      label: '荃湾区'
    }, {
      value: '810111',
      label: '屯门区'
    }, {
      value: '810112',
      label: '元朗区'
    }, {
      value: '810113',
      label: '北区'
    }, {
      value: '810114',
      label: '大埔区'
    }, {
      value: '810115',
      label: '西贡区'
    }, {
      value: '810116',
      label: '沙田区'
    }, {
      value: '810117',
      label: '葵青区'
    }, {
      value: '810118',
      label: '离岛区'
    }]
  }]
}, {
  value: '820000',
  label: '澳门特别行政区',
  children: [{
    value: '820100',
    label: '澳门',
    children: [{
      value: '820101',
      label: '花地玛堂区'
    }, {
      value: '820102',
      label: '花王堂区'
    }, {
      value: '820103',
      label: '望德堂区'
    }, {
      value: '820104',
      label: '大堂区'
    }, {
      value: '820105',
      label: '风顺堂区'
    }, {
      value: '820106',
      label: '嘉模堂区'
    }, {
      value: '820107',
      label: '路凼填海区'
    }, {
      value: '820108',
      label: '圣方济各堂区'
    }]
  }]
}];
var _default = cities;
exports.default = _default;

/***/ }),

/***/ 4:
/*!************************!*\
  !*** ./src/pages.json ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/***/ }),

/***/ 403:
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ 404);


/***/ }),

/***/ 404:
/*!************************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime-module.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() {
  return this || (typeof self === "object" && self);
})() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(/*! ./runtime */ 405);

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ }),

/***/ 405:
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() {
    return this || (typeof self === "object" && self);
  })() || Function("return this")()
);


/***/ }),

/***/ 5:
/*!*******************************************************!*\
  !*** ./node_modules/@dcloudio/uni-stat/dist/index.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

var _package = __webpack_require__(/*! ../package.json */ 6);

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var STAT_VERSION = _package.version;
var STAT_URL = 'https://tongji.dcloud.io/uni/stat';
var STAT_H5_URL = 'https://tongji.dcloud.io/uni/stat.gif';
var PAGE_PVER_TIME = 1800;
var APP_PVER_TIME = 300;
var OPERATING_TIME = 10;
var UUID_KEY = '__DC_STAT_UUID';
var UUID_VALUE = '__DC_UUID_VALUE';

function getUuid() {
  var uuid = '';

  if (getPlatformName() === 'n') {
    try {
      uuid = plus.runtime.getDCloudId();
    } catch (e) {
      uuid = '';
    }

    return uuid;
  }

  try {
    uuid = uni.getStorageSync(UUID_KEY);
  } catch (e) {
    uuid = UUID_VALUE;
  }

  if (!uuid) {
    uuid = Date.now() + '' + Math.floor(Math.random() * 1e7);

    try {
      uni.setStorageSync(UUID_KEY, uuid);
    } catch (e) {
      uni.setStorageSync(UUID_KEY, UUID_VALUE);
    }
  }

  return uuid;
}

var getSgin = function getSgin(statData) {
  var arr = Object.keys(statData);
  var sortArr = arr.sort();
  var sgin = {};
  var sginStr = '';

  for (var i in sortArr) {
    sgin[sortArr[i]] = statData[sortArr[i]];
    sginStr += sortArr[i] + '=' + statData[sortArr[i]] + '&';
  } // const options = sginStr.substr(0, sginStr.length - 1)
  // sginStr = sginStr.substr(0, sginStr.length - 1) + '&key=' + STAT_KEY;
  // const si = crypto.createHash('md5').update(sginStr).digest('hex');


  return {
    sign: '',
    options: sginStr.substr(0, sginStr.length - 1)
  };
};

var getSplicing = function getSplicing(data) {
  var str = '';

  for (var i in data) {
    str += i + '=' + data[i] + '&';
  }

  return str.substr(0, str.length - 1);
};

var getTime = function getTime() {
  return parseInt(new Date().getTime() / 1000);
};

var getPlatformName = function getPlatformName() {
  var platformList = {
    'app-plus': 'n',
    'h5': 'h5',
    'mp-weixin': 'wx',
    'mp-alipay': 'ali',
    'mp-baidu': 'bd',
    'mp-toutiao': 'tt',
    'mp-qq': 'qq'
  };
  return platformList["mp-weixin"];
};

var getPackName = function getPackName() {
  var packName = '';

  if (getPlatformName() === 'wx' || getPlatformName() === 'qq') {
    // 兼容微信小程序低版本基础库
    if (uni.canIUse('getAccountInfoSync')) {
      packName = uni.getAccountInfoSync().miniProgram.appId || '';
    }
  }

  return packName;
};

var getVersion = function getVersion() {
  return getPlatformName() === 'n' ? plus.runtime.version : '';
};

var getChannel = function getChannel() {
  var platformName = getPlatformName();
  var channel = '';

  if (platformName === 'n') {
    channel = plus.runtime.channel;
  }

  return channel;
};

var getScene = function getScene(options) {
  var platformName = getPlatformName();
  var scene = '';

  if (options) {
    return options;
  }

  if (platformName === 'wx') {
    scene = uni.getLaunchOptionsSync().scene;
  }

  return scene;
};

var First__Visit__Time__KEY = 'First__Visit__Time';
var Last__Visit__Time__KEY = 'Last__Visit__Time';

var getFirstVisitTime = function getFirstVisitTime() {
  var timeStorge = uni.getStorageSync(First__Visit__Time__KEY);
  var time = 0;

  if (timeStorge) {
    time = timeStorge;
  } else {
    time = getTime();
    uni.setStorageSync(First__Visit__Time__KEY, time);
    uni.removeStorageSync(Last__Visit__Time__KEY);
  }

  return time;
};

var getLastVisitTime = function getLastVisitTime() {
  var timeStorge = uni.getStorageSync(Last__Visit__Time__KEY);
  var time = 0;

  if (timeStorge) {
    time = timeStorge;
  } else {
    time = '';
  }

  uni.setStorageSync(Last__Visit__Time__KEY, getTime());
  return time;
};

var PAGE_RESIDENCE_TIME = '__page__residence__time';
var First_Page_residence_time = 0;
var Last_Page_residence_time = 0;

var setPageResidenceTime = function setPageResidenceTime() {
  First_Page_residence_time = getTime();

  if (getPlatformName() === 'n') {
    uni.setStorageSync(PAGE_RESIDENCE_TIME, getTime());
  }

  return First_Page_residence_time;
};

var getPageResidenceTime = function getPageResidenceTime() {
  Last_Page_residence_time = getTime();

  if (getPlatformName() === 'n') {
    First_Page_residence_time = uni.getStorageSync(PAGE_RESIDENCE_TIME);
  }

  return Last_Page_residence_time - First_Page_residence_time;
};

var TOTAL__VISIT__COUNT = 'Total__Visit__Count';

var getTotalVisitCount = function getTotalVisitCount() {
  var timeStorge = uni.getStorageSync(TOTAL__VISIT__COUNT);
  var count = 1;

  if (timeStorge) {
    count = timeStorge;
    count++;
  }

  uni.setStorageSync(TOTAL__VISIT__COUNT, count);
  return count;
};

var GetEncodeURIComponentOptions = function GetEncodeURIComponentOptions(statData) {
  var data = {};

  for (var prop in statData) {
    data[prop] = encodeURIComponent(statData[prop]);
  }

  return data;
};

var Set__First__Time = 0;
var Set__Last__Time = 0;

var getFirstTime = function getFirstTime() {
  var time = new Date().getTime();
  Set__First__Time = time;
  Set__Last__Time = 0;
  return time;
};

var getLastTime = function getLastTime() {
  var time = new Date().getTime();
  Set__Last__Time = time;
  return time;
};

var getResidenceTime = function getResidenceTime(type) {
  var residenceTime = 0;

  if (Set__First__Time !== 0) {
    residenceTime = Set__Last__Time - Set__First__Time;
  }

  residenceTime = parseInt(residenceTime / 1000);
  residenceTime = residenceTime < 1 ? 1 : residenceTime;

  if (type === 'app') {
    var overtime = residenceTime > APP_PVER_TIME ? true : false;
    return {
      residenceTime: residenceTime,
      overtime: overtime
    };
  }

  if (type === 'page') {
    var _overtime = residenceTime > PAGE_PVER_TIME ? true : false;

    return {
      residenceTime: residenceTime,
      overtime: _overtime
    };
  }

  return {
    residenceTime: residenceTime
  };
};

var getRoute = function getRoute() {
  var pages = getCurrentPages();
  var page = pages[pages.length - 1];
  var _self = page.$vm;

  if (getPlatformName() === 'bd') {
    return _self.$mp && _self.$mp.page.is;
  } else {
    return _self.$scope && _self.$scope.route || _self.$mp && _self.$mp.page.route;
  }
};

var getPageRoute = function getPageRoute(self) {
  var pages = getCurrentPages();
  var page = pages[pages.length - 1];
  var _self = page.$vm;
  var query = self._query;
  var str = query && JSON.stringify(query) !== '{}' ? '?' + JSON.stringify(query) : ''; // clear

  self._query = '';

  if (getPlatformName() === 'bd') {
    return _self.$mp && _self.$mp.page.is + str;
  } else {
    return _self.$scope && _self.$scope.route + str || _self.$mp && _self.$mp.page.route + str;
  }
};

var getPageTypes = function getPageTypes(self) {
  if (self.mpType === 'page' || self.$mp && self.$mp.mpType === 'page' || self.$options.mpType === 'page') {
    return true;
  }

  return false;
};

var calibration = function calibration(eventName, options) {
  //  login 、 share 、pay_success 、pay_fail 、register 、title
  if (!eventName) {
    console.error("uni.report \u7F3A\u5C11 [eventName] \u53C2\u6570");
    return true;
  }

  if (typeof eventName !== 'string') {
    console.error("uni.report [eventName] \u53C2\u6570\u7C7B\u578B\u9519\u8BEF,\u53EA\u80FD\u4E3A String \u7C7B\u578B");
    return true;
  }

  if (eventName.length > 255) {
    console.error("uni.report [eventName] \u53C2\u6570\u957F\u5EA6\u4E0D\u80FD\u5927\u4E8E 255");
    return true;
  }

  if (typeof options !== 'string' && _typeof(options) !== 'object') {
    console.error("uni.report [options] \u53C2\u6570\u7C7B\u578B\u9519\u8BEF,\u53EA\u80FD\u4E3A String \u6216 Object \u7C7B\u578B");
    return true;
  }

  if (typeof options === 'string' && options.length > 255) {
    console.error("uni.report [options] \u53C2\u6570\u957F\u5EA6\u4E0D\u80FD\u5927\u4E8E 255");
    return true;
  }

  if (eventName === 'title' && typeof options !== 'string') {
    console.error('uni.report [eventName] 参数为 title 时，[options] 参数只能为 String 类型');
    return true;
  }
};

var PagesJson = __webpack_require__(/*! uni-pages?{"type":"style"} */ 7).default;

var statConfig = __webpack_require__(/*! uni-stat-config */ 8).default || __webpack_require__(/*! uni-stat-config */ 8);

var resultOptions = uni.getSystemInfoSync();

var Util = /*#__PURE__*/function () {
  function Util() {
    _classCallCheck(this, Util);

    this.self = '';
    this._retry = 0;
    this._platform = '';
    this._query = {};
    this._navigationBarTitle = {
      config: '',
      page: '',
      report: '',
      lt: ''
    };
    this._operatingTime = 0;
    this._reportingRequestData = {
      '1': [],
      '11': []
    };
    this.__prevent_triggering = false;
    this.__licationHide = false;
    this.__licationShow = false;
    this._lastPageRoute = '';
    this.statData = {
      uuid: getUuid(),
      ut: getPlatformName(),
      mpn: getPackName(),
      ak: statConfig.appid,
      usv: STAT_VERSION,
      v: getVersion(),
      ch: getChannel(),
      cn: '',
      pn: '',
      ct: '',
      t: getTime(),
      tt: '',
      p: resultOptions.platform === 'android' ? 'a' : 'i',
      brand: resultOptions.brand || '',
      md: resultOptions.model,
      sv: resultOptions.system.replace(/(Android|iOS)\s/, ''),
      mpsdk: resultOptions.SDKVersion || '',
      mpv: resultOptions.version || '',
      lang: resultOptions.language,
      pr: resultOptions.pixelRatio,
      ww: resultOptions.windowWidth,
      wh: resultOptions.windowHeight,
      sw: resultOptions.screenWidth,
      sh: resultOptions.screenHeight
    };
  }

  _createClass(Util, [{
    key: "_applicationShow",
    value: function _applicationShow() {
      if (this.__licationHide) {
        getLastTime();
        var time = getResidenceTime('app');

        if (time.overtime) {
          var options = {
            path: this._lastPageRoute,
            scene: this.statData.sc
          };

          this._sendReportRequest(options);
        }

        this.__licationHide = false;
      }
    }
  }, {
    key: "_applicationHide",
    value: function _applicationHide(self, type) {
      this.__licationHide = true;
      getLastTime();
      var time = getResidenceTime();
      getFirstTime();
      var route = getPageRoute(this);

      this._sendHideRequest({
        urlref: route,
        urlref_ts: time.residenceTime
      }, type);
    }
  }, {
    key: "_pageShow",
    value: function _pageShow() {
      var route = getPageRoute(this);
      var routepath = getRoute();
      this._navigationBarTitle.config = PagesJson && PagesJson.pages[routepath] && PagesJson.pages[routepath].titleNView && PagesJson.pages[routepath].titleNView.titleText || PagesJson && PagesJson.pages[routepath] && PagesJson.pages[routepath].navigationBarTitleText || '';

      if (this.__licationShow) {
        getFirstTime();
        this.__licationShow = false; // console.log('这是 onLauch 之后执行的第一次 pageShow ，为下次记录时间做准备');

        this._lastPageRoute = route;
        return;
      }

      getLastTime();
      this._lastPageRoute = route;
      var time = getResidenceTime('page');

      if (time.overtime) {
        var options = {
          path: this._lastPageRoute,
          scene: this.statData.sc
        };

        this._sendReportRequest(options);
      }

      getFirstTime();
    }
  }, {
    key: "_pageHide",
    value: function _pageHide() {
      if (!this.__licationHide) {
        getLastTime();
        var time = getResidenceTime('page');

        this._sendPageRequest({
          url: this._lastPageRoute,
          urlref: this._lastPageRoute,
          urlref_ts: time.residenceTime
        });

        this._navigationBarTitle = {
          config: '',
          page: '',
          report: '',
          lt: ''
        };
        return;
      }
    }
  }, {
    key: "_login",
    value: function _login() {
      this._sendEventRequest({
        key: 'login'
      }, 0);
    }
  }, {
    key: "_share",
    value: function _share() {
      this._sendEventRequest({
        key: 'share'
      }, 0);
    }
  }, {
    key: "_payment",
    value: function _payment(key) {
      this._sendEventRequest({
        key: key
      }, 0);
    }
  }, {
    key: "_sendReportRequest",
    value: function _sendReportRequest(options) {
      this._navigationBarTitle.lt = '1';
      var query = options.query && JSON.stringify(options.query) !== '{}' ? '?' + JSON.stringify(options.query) : '';
      this.statData.lt = '1';
      this.statData.url = options.path + query || '';
      this.statData.t = getTime();
      this.statData.sc = getScene(options.scene);
      this.statData.fvts = getFirstVisitTime();
      this.statData.lvts = getLastVisitTime();
      this.statData.tvc = getTotalVisitCount();

      if (getPlatformName() === 'n') {
        this.getProperty();
      } else {
        this.getNetworkInfo();
      }
    }
  }, {
    key: "_sendPageRequest",
    value: function _sendPageRequest(opt) {
      var url = opt.url,
          urlref = opt.urlref,
          urlref_ts = opt.urlref_ts;
      this._navigationBarTitle.lt = '11';
      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        lt: '11',
        ut: this.statData.ut,
        url: url,
        tt: this.statData.tt,
        urlref: urlref,
        urlref_ts: urlref_ts,
        ch: this.statData.ch,
        usv: this.statData.usv,
        t: getTime(),
        p: this.statData.p
      };
      this.request(options);
    }
  }, {
    key: "_sendHideRequest",
    value: function _sendHideRequest(opt, type) {
      var urlref = opt.urlref,
          urlref_ts = opt.urlref_ts;
      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        lt: '3',
        ut: this.statData.ut,
        urlref: urlref,
        urlref_ts: urlref_ts,
        ch: this.statData.ch,
        usv: this.statData.usv,
        t: getTime(),
        p: this.statData.p
      };
      this.request(options, type);
    }
  }, {
    key: "_sendEventRequest",
    value: function _sendEventRequest() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref$key = _ref.key,
          key = _ref$key === void 0 ? '' : _ref$key,
          _ref$value = _ref.value,
          value = _ref$value === void 0 ? "" : _ref$value;

      var route = this._lastPageRoute;
      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        lt: '21',
        ut: this.statData.ut,
        url: route,
        ch: this.statData.ch,
        e_n: key,
        e_v: _typeof(value) === 'object' ? JSON.stringify(value) : value.toString(),
        usv: this.statData.usv,
        t: getTime(),
        p: this.statData.p
      };
      this.request(options);
    }
  }, {
    key: "getNetworkInfo",
    value: function getNetworkInfo() {
      var _this = this;

      uni.getNetworkType({
        success: function success(result) {
          _this.statData.net = result.networkType;

          _this.getLocation();
        }
      });
    }
  }, {
    key: "getProperty",
    value: function getProperty() {
      var _this2 = this;

      plus.runtime.getProperty(plus.runtime.appid, function (wgtinfo) {
        _this2.statData.v = wgtinfo.version || '';

        _this2.getNetworkInfo();
      });
    }
  }, {
    key: "getLocation",
    value: function getLocation() {
      var _this3 = this;

      if (statConfig.getLocation) {
        uni.getLocation({
          type: 'wgs84',
          geocode: true,
          success: function success(result) {
            if (result.address) {
              _this3.statData.cn = result.address.country;
              _this3.statData.pn = result.address.province;
              _this3.statData.ct = result.address.city;
            }

            _this3.statData.lat = result.latitude;
            _this3.statData.lng = result.longitude;

            _this3.request(_this3.statData);
          }
        });
      } else {
        this.statData.lat = 0;
        this.statData.lng = 0;
        this.request(this.statData);
      }
    }
  }, {
    key: "request",
    value: function request(data, type) {
      var _this4 = this;

      var time = getTime();
      var title = this._navigationBarTitle;
      data.ttn = title.page;
      data.ttpj = title.config;
      data.ttc = title.report;
      var requestData = this._reportingRequestData;

      if (getPlatformName() === 'n') {
        requestData = uni.getStorageSync('__UNI__STAT__DATA') || {};
      }

      if (!requestData[data.lt]) {
        requestData[data.lt] = [];
      }

      requestData[data.lt].push(data);

      if (getPlatformName() === 'n') {
        uni.setStorageSync('__UNI__STAT__DATA', requestData);
      }

      if (getPageResidenceTime() < OPERATING_TIME && !type) {
        return;
      }

      var uniStatData = this._reportingRequestData;

      if (getPlatformName() === 'n') {
        uniStatData = uni.getStorageSync('__UNI__STAT__DATA');
      } // 时间超过，重新获取时间戳


      setPageResidenceTime();
      var firstArr = [];
      var contentArr = [];
      var lastArr = [];

      var _loop = function _loop(i) {
        var rd = uniStatData[i];
        rd.forEach(function (elm) {
          var newData = getSplicing(elm);

          if (i === 0) {
            firstArr.push(newData);
          } else if (i === 3) {
            lastArr.push(newData);
          } else {
            contentArr.push(newData);
          }
        });
      };

      for (var i in uniStatData) {
        _loop(i);
      }

      firstArr.push.apply(firstArr, contentArr.concat(lastArr));
      var optionsData = {
        usv: STAT_VERSION,
        //统计 SDK 版本号
        t: time,
        //发送请求时的时间戮
        requests: JSON.stringify(firstArr)
      };
      this._reportingRequestData = {};

      if (getPlatformName() === 'n') {
        uni.removeStorageSync('__UNI__STAT__DATA');
      }

      if (data.ut === 'h5') {
        this.imageRequest(optionsData);
        return;
      }

      if (getPlatformName() === 'n' && this.statData.p === 'a') {
        setTimeout(function () {
          _this4._sendRequest(optionsData);
        }, 200);
        return;
      }

      this._sendRequest(optionsData);
    }
  }, {
    key: "_sendRequest",
    value: function _sendRequest(optionsData) {
      var _this5 = this;

      uni.request({
        url: STAT_URL,
        method: 'POST',
        // header: {
        //   'content-type': 'application/json' // 默认值
        // },
        data: optionsData,
        success: function success() {// if (process.env.NODE_ENV === 'development') {
          //   console.log('stat request success');
          // }
        },
        fail: function fail(e) {
          if (++_this5._retry < 3) {
            setTimeout(function () {
              _this5._sendRequest(optionsData);
            }, 1000);
          }
        }
      });
    }
    /**
     * h5 请求
     */

  }, {
    key: "imageRequest",
    value: function imageRequest(data) {
      var image = new Image();
      var options = getSgin(GetEncodeURIComponentOptions(data)).options;
      image.src = STAT_H5_URL + '?' + options;
    }
  }, {
    key: "sendEvent",
    value: function sendEvent(key, value) {
      // 校验 type 参数
      if (calibration(key, value)) return;

      if (key === 'title') {
        this._navigationBarTitle.report = value;
        return;
      }

      this._sendEventRequest({
        key: key,
        value: _typeof(value) === 'object' ? JSON.stringify(value) : value
      }, 1);
    }
  }]);

  return Util;
}();

var Stat = /*#__PURE__*/function (_Util) {
  _inherits(Stat, _Util);

  var _super = _createSuper(Stat);

  _createClass(Stat, null, [{
    key: "getInstance",
    value: function getInstance() {
      if (!this.instance) {
        this.instance = new Stat();
      }

      return this.instance;
    }
  }]);

  function Stat() {
    var _this6;

    _classCallCheck(this, Stat);

    _this6 = _super.call(this);
    _this6.instance = null; // 注册拦截器

    if (typeof uni.addInterceptor === 'function' && "development" !== 'development') {
      _this6.addInterceptorInit();

      _this6.interceptLogin();

      _this6.interceptShare(true);

      _this6.interceptRequestPayment();
    }

    return _this6;
  }

  _createClass(Stat, [{
    key: "addInterceptorInit",
    value: function addInterceptorInit() {
      var self = this;
      uni.addInterceptor('setNavigationBarTitle', {
        invoke: function invoke(args) {
          self._navigationBarTitle.page = args.title;
        }
      });
    }
  }, {
    key: "interceptLogin",
    value: function interceptLogin() {
      var self = this;
      uni.addInterceptor('login', {
        complete: function complete() {
          self._login();
        }
      });
    }
  }, {
    key: "interceptShare",
    value: function interceptShare(type) {
      var self = this;

      if (!type) {
        self._share();

        return;
      }

      uni.addInterceptor('share', {
        success: function success() {
          self._share();
        },
        fail: function fail() {
          self._share();
        }
      });
    }
  }, {
    key: "interceptRequestPayment",
    value: function interceptRequestPayment() {
      var self = this;
      uni.addInterceptor('requestPayment', {
        success: function success() {
          self._payment('pay_success');
        },
        fail: function fail() {
          self._payment('pay_fail');
        }
      });
    }
  }, {
    key: "report",
    value: function report(options, self) {
      this.self = self; // if (process.env.NODE_ENV === 'development') {
      //   console.log('report init');
      // }

      setPageResidenceTime();
      this.__licationShow = true;

      this._sendReportRequest(options, true);
    }
  }, {
    key: "load",
    value: function load(options, self) {
      if (!self.$scope && !self.$mp) {
        var page = getCurrentPages();
        self.$scope = page[page.length - 1];
      }

      this.self = self;
      this._query = options;
    }
  }, {
    key: "show",
    value: function show(self) {
      this.self = self;

      if (getPageTypes(self)) {
        this._pageShow(self);
      } else {
        this._applicationShow(self);
      }
    }
  }, {
    key: "ready",
    value: function ready(self) {// this.self = self;
      // if (getPageTypes(self)) {
      //   this._pageShow(self);
      // }
    }
  }, {
    key: "hide",
    value: function hide(self) {
      this.self = self;

      if (getPageTypes(self)) {
        this._pageHide(self);
      } else {
        this._applicationHide(self, true);
      }
    }
  }, {
    key: "error",
    value: function error(em) {
      if (this._platform === 'devtools') {
        if (true) {
          console.info('当前运行环境为开发者工具，不上报数据。');
        } // return;

      }

      var emVal = '';

      if (!em.message) {
        emVal = JSON.stringify(em);
      } else {
        emVal = em.stack;
      }

      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        lt: '31',
        ut: this.statData.ut,
        ch: this.statData.ch,
        mpsdk: this.statData.mpsdk,
        mpv: this.statData.mpv,
        v: this.statData.v,
        em: emVal,
        usv: this.statData.usv,
        t: getTime(),
        p: this.statData.p
      };
      this.request(options);
    }
  }]);

  return Stat;
}(Util);

var stat = Stat.getInstance();
var isHide = false;
var lifecycle = {
  onLaunch: function onLaunch(options) {
    stat.report(options, this);
  },
  onReady: function onReady() {
    stat.ready(this);
  },
  onLoad: function onLoad(options) {
    stat.load(options, this); // 重写分享，获取分享上报事件

    if (this.$scope && this.$scope.onShareAppMessage) {
      var oldShareAppMessage = this.$scope.onShareAppMessage;

      this.$scope.onShareAppMessage = function (options) {
        stat.interceptShare(false);
        return oldShareAppMessage.call(this, options);
      };
    }
  },
  onShow: function onShow() {
    isHide = false;
    stat.show(this);
  },
  onHide: function onHide() {
    isHide = true;
    stat.hide(this);
  },
  onUnload: function onUnload() {
    if (isHide) {
      isHide = false;
      return;
    }

    stat.hide(this);
  },
  onError: function onError(e) {
    stat.error(e);
  }
};

function main() {
  if (true) {
    uni.report = function (type, options) {};
  } else { var Vue; }
}

main();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 522:
/*!**************************!*\
  !*** ./src/data/city.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = [{
  label: 'A',
  children: [{
    label: '阿拉斯加',
    mobile: '13588889999',
    keyword: '阿拉斯加ABA13588889999'
  }, {
    label: '阿克苏',
    mobile: '0551-4386721',
    keyword: '阿克苏AKESU0551-4386721'
  }, {
    label: '阿拉善',
    mobile: '4008009100',
    keyword: '阿拉善ALASHAN4008009100'
  }, {
    label: '阿勒泰',
    mobile: '13588889999',
    keyword: '阿勒泰ALETAI13588889999'
  }, {
    label: '阿里',
    mobile: '13588889999',
    keyword: '阿里ALI13588889999'
  }, {
    label: '安阳',
    mobile: '13588889999',
    keyword: '13588889999安阳ANYANG'
  }]
}, {
  label: 'B',
  children: [{
    label: '白城',
    mobile: '该主子没有留电话~',
    keyword: '白城BAICHENG'
  }, {
    label: '白山',
    mobile: '13588889999',
    keyword: '白山BAISHAN13588889999'
  }, {
    label: '白银',
    mobile: '13588889999',
    keyword: '白银BAIYIN13588889999'
  }, {
    label: '保定',
    mobile: '13588889999',
    keyword: '保定BAODING13588889999'
  }]
}, {
  label: 'C',
  children: [{
    label: '沧州',
    mobile: '13588889999',
    keyword: '沧州CANGZHOU13588889999'
  }, {
    label: '长春',
    mobile: '13588889999',
    keyword: '长春CHANGCHUN13588889999'
  }]
}, {
  label: 'D',
  children: [{
    label: '大理',
    mobile: '13588889999',
    keyword: '大理DALI13588889999'
  }, {
    label: '大连',
    mobile: '13588889999',
    keyword: '大连DALIAN13588889999'
  }]
}, {
  label: 'E',
  children: [{
    label: '鄂尔多斯',
    mobile: '13588889999',
    keyword: '鄂尔多斯EERDUOSI13588889999'
  }, {
    label: '恩施',
    mobile: '13588889999',
    keyword: '恩施ENSHI13588889999'
  }, {
    label: '鄂州',
    mobile: '13588889999',
    keyword: '鄂州EZHOU13588889999'
  }]
}, {
  label: 'F',
  children: [{
    label: '防城港',
    mobile: '该主子没有留电话~',
    keyword: '防城港FANGCHENGGANG'
  }, {
    label: '抚顺',
    mobile: '13588889999',
    keyword: '抚顺FUSHUN13588889999'
  }, {
    label: '阜新',
    mobile: '13588889999',
    keyword: '阜新FUXIN13588889999'
  }, {
    label: '阜阳',
    mobile: '13588889999',
    keyword: '阜阳FUYANG13588889999'
  }, {
    label: '抚州',
    mobile: '13588889999',
    keyword: '抚州FUZHOU13588889999'
  }, {
    label: '福州',
    mobile: '13588889999',
    keyword: '福州FUZHOU13588889999'
  }]
}, {
  label: 'G',
  children: [{
    label: '甘南',
    mobile: '13588889999',
    keyword: '甘南GANNAN13588889999'
  }, {
    label: '赣州',
    mobile: '13588889999',
    keyword: '赣州GANZHOU13588889999'
  }, {
    label: '甘孜',
    mobile: '13588889999',
    keyword: '甘孜GANZI13588889999'
  }]
}, {
  label: 'H',
  children: [{
    label: '哈尔滨',
    mobile: '13588889999',
    keyword: '哈尔滨HAERBIN13588889999'
  }, {
    label: '海北',
    mobile: '13588889999',
    keyword: '海北HAIBEI13588889999'
  }, {
    label: '海东',
    mobile: '13588889999',
    keyword: '海东HAIDONG13588889999'
  }, {
    label: '海口',
    mobile: '13588889999',
    keyword: '海口HAIKOU13588889999'
  }]
}, {
  label: 'I',
  children: [{
    label: 'ice',
    mobile: '13588889999',
    keyword: '佳木斯JIAMUSI13588889999'
  }]
}, {
  label: 'J',
  children: [{
    label: '佳木斯',
    mobile: '13588889999',
    keyword: '佳木斯JIAMUSI13588889999'
  }, {
    label: '吉安',
    mobile: '13588889999',
    keyword: '吉安JIAN13588889999'
  }, {
    label: '江门',
    mobile: '13588889999',
    keyword: '江门JIANGMEN13588889999'
  }]
}, {
  label: 'K',
  children: [{
    label: '开封',
    mobile: '13588889999',
    keyword: '开封KAIFENG13588889999'
  }, {
    label: '喀什',
    mobile: '13588889999',
    keyword: '喀什KASHI13588889999'
  }, {
    label: '克拉玛依',
    mobile: '13588889999',
    keyword: '克拉玛依KELAMAYI13588889999'
  }]
}, {
  label: 'L',
  children: [{
    label: '来宾',
    mobile: '13588889999',
    keyword: '来宾LAIBIN13588889999'
  }, {
    label: '兰州',
    mobile: '13588889999',
    keyword: '兰州LANZHOU13588889999'
  }, {
    label: '拉萨',
    mobile: '13588889999',
    keyword: '拉萨LASA13588889999'
  }, {
    label: '乐山',
    mobile: '13588889999',
    keyword: '乐山LESHAN13588889999'
  }, {
    label: '凉山',
    mobile: '13588889999',
    keyword: '凉山LIANGSHAN13588889999'
  }, {
    label: '连云港',
    mobile: '13588889999',
    keyword: '连云港LIANYUNGANG13588889999'
  }, {
    label: '聊城',
    mobile: '18322223333',
    keyword: '聊城LIAOCHENG18322223333'
  }, {
    label: '辽阳',
    mobile: '18322223333',
    keyword: '辽阳LIAOYANG18322223333'
  }, {
    label: '辽源',
    mobile: '18322223333',
    keyword: '辽源LIAOYUAN18322223333'
  }, {
    label: '丽江',
    mobile: '18322223333',
    keyword: '丽江LIJIANG18322223333'
  }, {
    label: '临沧',
    mobile: '18322223333',
    keyword: '临沧LINCANG18322223333'
  }, {
    label: '临汾',
    mobile: '18322223333',
    keyword: '临汾LINFEN18322223333'
  }, {
    label: '临夏',
    mobile: '18322223333',
    keyword: '临夏LINXIA18322223333'
  }, {
    label: '临沂',
    mobile: '18322223333',
    keyword: '临沂LINYI18322223333'
  }, {
    label: '林芝',
    mobile: '18322223333',
    keyword: '林芝LINZHI18322223333'
  }, {
    label: '丽水',
    mobile: '18322223333',
    keyword: '丽水LISHUI18322223333'
  }]
}, {
  label: 'M',
  children: [{
    label: '眉山',
    mobile: '15544448888',
    keyword: '眉山MEISHAN15544448888'
  }, {
    label: '梅州',
    mobile: '15544448888',
    keyword: '梅州MEIZHOU15544448888'
  }, {
    label: '绵阳',
    mobile: '15544448888',
    keyword: '绵阳MIANYANG15544448888'
  }, {
    label: '牡丹江',
    mobile: '15544448888',
    keyword: '牡丹江MUDANJIANG15544448888'
  }]
}, {
  label: 'N',
  children: [{
    label: '南昌',
    mobile: '15544448888',
    keyword: '南昌NANCHANG15544448888'
  }, {
    label: '南充',
    mobile: '15544448888',
    keyword: '南充NANCHONG15544448888'
  }, {
    label: '南京',
    mobile: '15544448888',
    keyword: '南京NANJING15544448888'
  }, {
    label: '南宁',
    mobile: '15544448888',
    keyword: '南宁NANNING15544448888'
  }, {
    label: '南平',
    mobile: '15544448888',
    keyword: '南平NANPING15544448888'
  }]
}, {
  label: 'O',
  children: [{
    label: '欧阳',
    mobile: '15544448888',
    keyword: '欧阳ouyang15544448888'
  }]
}, {
  label: 'P',
  children: [{
    label: '盘锦',
    mobile: '15544448888',
    keyword: '盘锦PANJIN15544448888'
  }, {
    label: '攀枝花',
    mobile: '15544448888',
    keyword: '攀枝花PANZHIHUA15544448888'
  }, {
    label: '平顶山',
    mobile: '15544448888',
    keyword: '平顶山PINGDINGSHAN15544448888'
  }, {
    label: '平凉',
    mobile: '15544448888',
    keyword: '平凉PINGLIANG15544448888'
  }, {
    label: '萍乡',
    mobile: '15544448888',
    keyword: '萍乡PINGXIANG15544448888'
  }, {
    label: '普洱',
    mobile: '15544448888',
    keyword: '普洱PUER15544448888'
  }, {
    label: '莆田',
    mobile: '15544448888',
    keyword: '莆田PUTIAN15544448888'
  }, {
    label: '濮阳',
    mobile: '15544448888',
    keyword: '濮阳PUYANG15544448888'
  }]
}, {
  label: 'Q',
  children: [{
    label: '黔东南',
    mobile: '15544448888',
    keyword: '黔东南QIANDONGNAN15544448888'
  }, {
    label: '黔南',
    mobile: '15544448888',
    keyword: '黔南QIANNAN15544448888'
  }, {
    label: '黔西南',
    mobile: '15544448888',
    keyword: '黔西南QIANXINAN15544448888'
  }]
}, {
  label: 'R',
  children: [{
    label: '日喀则',
    mobile: '15544448888',
    keyword: '日喀则RIKAZE15544448888'
  }, {
    label: '日照',
    mobile: '15544448888',
    keyword: '日照RIZHAO15544448888'
  }]
}, {
  label: 'S',
  children: [{
    label: '三门峡',
    mobile: '15544448888',
    keyword: '三门峡SANMENXIA15544448888'
  }, {
    label: '三明',
    mobile: '15544448888',
    keyword: '三明SANMING15544448888'
  }, {
    label: '三沙',
    mobile: '15544448888',
    keyword: '三沙SANSHA15544448888'
  }]
}, {
  label: 'T',
  children: [{
    label: '塔城',
    mobile: '15544448888',
    keyword: '塔城TACHENG15544448888'
  }, {
    label: '漯河',
    mobile: '15544448888',
    keyword: '漯河TAHE15544448888'
  }, {
    label: '泰安',
    mobile: '15544448888',
    keyword: '泰安TAIAN15544448888'
  }]
}, {
  label: 'W',
  children: [{
    label: '潍坊',
    mobile: '15544448888',
    keyword: '潍坊WEIFANG15544448888'
  }, {
    label: '威海',
    mobile: '15544448888',
    keyword: '威海WEIHAI15544448888'
  }, {
    label: '渭南',
    mobile: '15544448888',
    keyword: '渭南WEINAN15544448888'
  }, {
    label: '文山',
    mobile: '15544448888',
    keyword: '文山WENSHAN15544448888'
  }]
}, {
  label: 'X',
  children: [{
    label: '厦门',
    mobile: '15544448888',
    keyword: '厦门XIAMEN15544448888'
  }, {
    label: '西安',
    mobile: '15544448888',
    keyword: '西安XIAN15544448888'
  }, {
    label: '湘潭',
    mobile: '15544448888',
    keyword: '湘潭XIANGTAN15544448888'
  }]
}, {
  label: 'Y',
  children: [{
    label: '雅安',
    mobile: '15544448888',
    keyword: '雅安YAAN15544448888'
  }, {
    label: '延安',
    mobile: '15544448888',
    keyword: '延安YANAN15544448888'
  }, {
    label: '延边',
    mobile: '15544448888',
    keyword: '延边YANBIAN15544448888'
  }, {
    label: '盐城',
    mobile: '15544448888',
    keyword: '盐城YANCHENG15544448888'
  }]
}, {
  label: 'Z',
  children: [{
    label: '枣庄',
    mobile: '15544448888',
    keyword: '枣庄ZAOZHUANG15544448888'
  }, {
    label: '张家界',
    mobile: '15544448888',
    keyword: '张家界ZHANGJIAJIE15544448888'
  }, {
    label: '张家口',
    mobile: '15544448888',
    keyword: '张家口ZHANGJIAKOU15544448888'
  }]
}];

/***/ }),

/***/ 6:
/*!******************************************************!*\
  !*** ./node_modules/@dcloudio/uni-stat/package.json ***!
  \******************************************************/
/*! exports provided: name, version, description, main, repository, scripts, files, author, license, devDependencies, gitHead, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"name\":\"@dcloudio/uni-stat\",\"version\":\"2.0.0-26820200330001\",\"description\":\"\",\"main\":\"dist/index.js\",\"repository\":{\"type\":\"git\",\"url\":\"git+https://github.com/dcloudio/uni-app.git\",\"directory\":\"packages/uni-stat\"},\"scripts\":{\"dev\":\"NODE_ENV=development rollup -w -c rollup.config.js\",\"build\":\"NODE_ENV=production rollup -c rollup.config.js\"},\"files\":[\"dist\",\"package.json\",\"LICENSE\"],\"author\":\"\",\"license\":\"Apache-2.0\",\"devDependencies\":{\"@babel/core\":\"^7.5.5\",\"@babel/preset-env\":\"^7.5.5\",\"eslint\":\"^6.1.0\",\"rollup\":\"^1.19.3\",\"rollup-plugin-babel\":\"^4.3.3\",\"rollup-plugin-clear\":\"^2.0.7\",\"rollup-plugin-commonjs\":\"^10.0.2\",\"rollup-plugin-copy\":\"^3.1.0\",\"rollup-plugin-eslint\":\"^7.0.0\",\"rollup-plugin-json\":\"^4.0.0\",\"rollup-plugin-node-resolve\":\"^5.2.0\",\"rollup-plugin-replace\":\"^2.2.0\",\"rollup-plugin-uglify\":\"^6.0.2\"},\"gitHead\":\"57ef7f7b5b6164a74ec425ff12f9fe0a1147841a\"}");

/***/ }),

/***/ 7:
/*!*****************************************!*\
  !*** ./src/pages.json?{"type":"style"} ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  "pages": {
    "pages/index/index": {
      "navigationBarBackgroundColor": "#6295FF",
      "navigationBarTextStyle": "white"
    },
    "pages/demo/basic/button": {
      "navigationBarTitleText": "Button 按钮"
    },
    "pages/demo/basic/input": {
      "navigationBarTitleText": "Input 输入框"
    },
    "pages/demo/basic/image": {
      "navigationBarTitleText": "Image 图片"
    },
    "pages/demo/basic/icon": {
      "navigationBarTitleText": "Icon 图标"
    },
    "pages/demo/basic/tag": {
      "navigationBarTitleText": "Tag 标签"
    },
    "pages/demo/basic/divider": {
      "navigationBarTitleText": "Divider 分割线"
    },
    "pages/demo/feedback/toast": {
      "navigationBarTitleText": "Toast 提示"
    },
    "pages/demo/feedback/message": {
      "navigationBarTitleText": "Message 消息提醒"
    },
    "pages/demo/feedback/loading": {
      "navigationBarTitleText": "Loading 加载"
    },
    "pages/demo/form/radio": {
      "navigationBarTitleText": "Radio 单选框"
    },
    "pages/demo/form/switch": {
      "navigationBarTitleText": "Switch 开关"
    },
    "pages/demo/form/checkbox": {
      "navigationBarTitleText": "Checkbox 多选框"
    },
    "pages/demo/form/select": {
      "navigationBarTitleText": "Select 下拉框"
    },
    "pages/demo/form/upload": {
      "navigationBarTitleText": "Upload 上传"
    },
    "pages/demo/form/rate": {
      "navigationBarTitleText": "Rate 评分"
    },
    "pages/demo/form/rules": {
      "navigationBarTitleText": "Rules 校验"
    },
    "pages/demo/operate/loadmore": {
      "navigationBarTitleText": "LoadMore 页底提示"
    },
    "pages/demo/operate/modal": {
      "navigationBarTitleText": "Modal 模态框"
    },
    "pages/demo/operate/action-sheet": {
      "navigationBarTitleText": "ActionSheet 底部菜单"
    },
    "pages/demo/operate/search": {
      "navigationBarTitleText": "Search 搜索"
    },
    "pages/demo/nav/tabs": {
      "navigationBarTitleText": "Tabs 选项卡"
    },
    "pages/demo/layout/flex": {
      "navigationBarTitleText": "Flex 布局"
    },
    "pages/demo/layout/grid": {
      "navigationBarTitleText": "Grid 宫格"
    },
    "pages/demo/layout/waterfall": {
      "navigationBarTitleText": "Waterfall 瀑布流"
    },
    "pages/demo/layout/list": {
      "navigationBarTitleText": "List 列表"
    },
    "pages/demo/view/popup": {
      "navigationBarTitleText": "Popup 弹出层"
    },
    "pages/demo/view/swiper": {
      "navigationBarTitleText": "Swiper 滑块视图"
    },
    "pages/demo/view/badge": {
      "navigationBarTitleText": "Badge 标记"
    },
    "pages/demo/view/avatar": {
      "navigationBarTitleText": "Avatar 头像"
    },
    "pages/demo/view/slider": {
      "navigationBarTitleText": "Slider 滑块"
    },
    "pages/demo/view/progress": {
      "navigationBarTitleText": "Progress 进度条"
    },
    "pages/demo/view/noticebar": {
      "navigationBarTitleText": "Noticebar 通知栏"
    },
    "pages/demo/advanced/list-index": {
      "navigationBarTitleText": "List-Index 索引列表"
    }
  },
  "globalStyle": {
    "navigationBarTextStyle": "black",
    "navigationBarTitleText": "cool-uni",
    "navigationBarBackgroundColor": "#fff"
  }
};
exports.default = _default;

/***/ }),

/***/ 8:
/*!****************************************!*\
  !*** ./src/pages.json?{"type":"stat"} ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  "appid": "__UNI__2F64B60"
};
exports.default = _default;

/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map