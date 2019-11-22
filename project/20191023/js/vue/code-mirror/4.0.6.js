(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("codemirror"));
	else if(typeof define === 'function' && define.amd)
		define(["codemirror"], factory);
	else if(typeof exports === 'object')
		exports["VueCodeMirror"] = factory(require("codemirror"));
	else
		root["VueCodeMirror"] = factory(root["codemirror"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__) {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _codemirror = __webpack_require__(0);

var _codemirror2 = _interopRequireDefault(_codemirror);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CodeMirror = window.CodeMirror || _codemirror2.default;

if (typeof Object.assign != 'function') {
  Object.defineProperty(Object, 'assign', {
    value: function value(target, varArgs) {
      if (target == null) {
        throw new TypeError('Cannot convert undefined or null to object');
      }
      var to = Object(target);
      for (var index = 1; index < arguments.length; index++) {
        var nextSource = arguments[index];
        if (nextSource != null) {
          for (var nextKey in nextSource) {
            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
              to[nextKey] = nextSource[nextKey];
            }
          }
        }
      }
      return to;
    },

    writable: true,
    configurable: true
  });
}

exports.default = {
  name: 'codemirror',
  data: function data() {
    return {
      content: '',
      codemirror: null,
      cminstance: null
    };
  },

  props: {
    code: String,
    value: String,
    marker: Function,
    unseenLines: Array,
    name: {
      type: String,
      default: 'codemirror'
    },
    placeholder: {
      type: String,
      default: ''
    },
    merge: {
      type: Boolean,
      default: false
    },
    options: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    events: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    globalOptions: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    globalEvents: {
      type: Array,
      default: function _default() {
        return [];
      }
    }
  },
  watch: {
    options: {
      deep: true,
      handler: function handler(options) {
        for (var key in options) {
          this.cminstance.setOption(key, options[key]);
        }
      }
    },
    merge: function merge() {
      this.$nextTick(this.switchMerge);
    },
    code: function code(newVal) {
      this.handerCodeChange(newVal);
    },
    value: function value(newVal) {
      this.handerCodeChange(newVal);
    }
  },
  methods: {
    initialize: function initialize() {
      var _this = this;

      var cmOptions = Object.assign({}, this.globalOptions, this.options);
      if (this.merge) {
        this.codemirror = CodeMirror.MergeView(this.$refs.mergeview, cmOptions);
        this.cminstance = this.codemirror.edit;
      } else {
        this.codemirror = CodeMirror.fromTextArea(this.$refs.textarea, cmOptions);
        this.cminstance = this.codemirror;
        this.cminstance.setValue(this.code || this.value || this.content);
      }
      this.cminstance.on('change', function (cm) {
        _this.content = cm.getValue();
        if (_this.$emit) {
          _this.$emit('input', _this.content);
        }
      });

      var tmpEvents = {};
      var allEvents = ['scroll', 'changes', 'beforeChange', 'cursorActivity', 'keyHandled', 'inputRead', 'electricInput', 'beforeSelectionChange', 'viewportChange', 'swapDoc', 'gutterClick', 'gutterContextMenu', 'focus', 'blur', 'refresh', 'optionChange', 'scrollCursorIntoView', 'update'].concat(this.events).concat(this.globalEvents).filter(function (e) {
        return !tmpEvents[e] && (tmpEvents[e] = true);
      }).forEach(function (event) {
        _this.cminstance.on(event, function () {
          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this.$emit.apply(_this, [event].concat(args));
          var lowerCaseEvent = event.replace(/([A-Z])/g, '-$1').toLowerCase();
          if (lowerCaseEvent !== event) {
            _this.$emit.apply(_this, [lowerCaseEvent].concat(args));
          }
        });
      });

      this.$emit('ready', this.codemirror);
      this.unseenLineMarkers();

      this.refresh();
    },
    refresh: function refresh() {
      var _this2 = this;

      this.$nextTick(function () {
        _this2.cminstance.refresh();
      });
    },
    destroy: function destroy() {
      var element = this.cminstance.doc.cm.getWrapperElement();
      element && element.remove && element.remove();
    },
    handerCodeChange: function handerCodeChange(newVal) {
      var cm_value = this.cminstance.getValue();
      if (newVal !== cm_value) {
        var scrollInfo = this.cminstance.getScrollInfo();
        this.cminstance.setValue(newVal);
        this.content = newVal;
        this.cminstance.scrollTo(scrollInfo.left, scrollInfo.top);
      }
      this.unseenLineMarkers();
    },
    unseenLineMarkers: function unseenLineMarkers() {
      var _this3 = this;

      if (this.unseenLines !== undefined && this.marker !== undefined) {
        this.unseenLines.forEach(function (line) {
          var info = _this3.cminstance.lineInfo(line);
          _this3.cminstance.setGutterMarker(line, 'breakpoints', info.gutterMarkers ? null : _this3.marker());
        });
      }
    },
    switchMerge: function switchMerge() {
      var history = this.cminstance.doc.history;
      var cleanGeneration = this.cminstance.doc.cleanGeneration;
      this.options.value = this.cminstance.getValue();

      this.destroy();
      this.initialize();

      this.cminstance.doc.history = history;
      this.cminstance.doc.cleanGeneration = cleanGeneration;
    }
  },
  mounted: function mounted() {
    this.initialize();
  },
  beforeDestroy: function beforeDestroy() {
    this.destroy();
  }
};

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_codemirror_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_codemirror_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_codemirror_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_codemirror_vue__) if(["default","default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_codemirror_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_213c6e4e_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_codemirror_vue__ = __webpack_require__(5);
var normalizeComponent = __webpack_require__(4)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_codemirror_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_213c6e4e_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_codemirror_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.install = exports.codemirror = exports.CodeMirror = undefined;

var _codemirror = __webpack_require__(0);

var _codemirror2 = _interopRequireDefault(_codemirror);

var _codemirror3 = __webpack_require__(2);

var _codemirror4 = _interopRequireDefault(_codemirror3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CodeMirror = window.CodeMirror || _codemirror2.default;
var install = function install(Vue, config) {
  if (config) {
    if (config.options) {
      _codemirror4.default.props.globalOptions.default = function () {
        return config.options;
      };
    }
    if (config.events) {
      _codemirror4.default.props.globalEvents.default = function () {
        return config.events;
      };
    }
  }
  Vue.component(_codemirror4.default.name, _codemirror4.default);
};

var VueCodemirror = { CodeMirror: CodeMirror, codemirror: _codemirror4.default, install: install };

exports.default = VueCodemirror;
exports.CodeMirror = CodeMirror;
exports.codemirror = _codemirror4.default;
exports.install = install;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file.
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
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
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate

    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"vue-codemirror",class:{ merge: _vm.merge }},[(_vm.merge)?_c('div',{ref:"mergeview"}):_c('textarea',{ref:"textarea",attrs:{"name":_vm.name,"placeholder":_vm.placeholder}})])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ })
/******/ ]);
});
//# sourceMappingURL=vue-codemirror.js.map