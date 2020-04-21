(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["cool/ui/components/form-item/form-item"],{

/***/ 354:
/*!********************************************************!*\
  !*** ./src/cool/ui/components/form-item/form-item.vue ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _form_item_vue_vue_type_template_id_af0d6344___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./form-item.vue?vue&type=template&id=af0d6344& */ 355);
/* harmony import */ var _form_item_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./form-item.vue?vue&type=script&lang=js& */ 357);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _form_item_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _form_item_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 14);

var renderjs




/* normalize component */

var component = Object(_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _form_item_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _form_item_vue_vue_type_template_id_af0d6344___WEBPACK_IMPORTED_MODULE_0__["render"],
  _form_item_vue_vue_type_template_id_af0d6344___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null,
  false,
  _form_item_vue_vue_type_template_id_af0d6344___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "src/cool/ui/components/form-item/form-item.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 355:
/*!***************************************************************************************!*\
  !*** ./src/cool/ui/components/form-item/form-item.vue?vue&type=template&id=af0d6344& ***!
  \***************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_14_0_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_form_item_vue_vue_type_template_id_af0d6344___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--14-0!../../../../../node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../../node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../../node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./form-item.vue?vue&type=template&id=af0d6344& */ 356);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_14_0_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_form_item_vue_vue_type_template_id_af0d6344___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_14_0_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_form_item_vue_vue_type_template_id_af0d6344___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_14_0_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_form_item_vue_vue_type_template_id_af0d6344___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_14_0_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_form_item_vue_vue_type_template_id_af0d6344___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 356:
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--14-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./src/cool/ui/components/form-item/form-item.vue?vue&type=template&id=af0d6344& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 357:
/*!*********************************************************************************!*\
  !*** ./src/cool/ui/components/form-item/form-item.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_cli_plugin_babel_node_modules_babel_loader_lib_index_js_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_form_item_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib!../../../../../node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!../../../../../node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../../node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./form-item.vue?vue&type=script&lang=js& */ 358);
/* harmony import */ var _node_modules_vue_cli_plugin_babel_node_modules_babel_loader_lib_index_js_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_form_item_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_cli_plugin_babel_node_modules_babel_loader_lib_index_js_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_form_item_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_cli_plugin_babel_node_modules_babel_loader_lib_index_js_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_form_item_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_cli_plugin_babel_node_modules_babel_loader_lib_index_js_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_form_item_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_cli_plugin_babel_node_modules_babel_loader_lib_index_js_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_form_item_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 358:
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./src/cool/ui/components/form-item/form-item.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _asyncValidator = _interopRequireDefault(__webpack_require__(/*! ../../utils/async-validator */ 351));

var _utils = __webpack_require__(/*! ../../utils */ 275);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = {
  props: {
    prop: String,
    label: String,
    disabled: Boolean,
    labelWidth: String,
    showMessage: {
      type: Boolean,
      default: false
    },
    justify: {
      type: String,
      default: 'start'
    },
    validateOnValueChange: {
      type: Boolean,
      default: false
    }
  },
  data: function data() {
    return {
      required: false,
      message: null,
      error: false,
      validator: null
    };
  },
  computed: {
    label2: function label2() {
      return this.label == 'true' ? '' : this.label;
    },
    labelWidth2: function labelWidth2() {
      return this.labelWidth || this.parent.labelWidth;
    },
    showMessage2: function showMessage2() {
      return (this.showMessage || this.parent.showMessage) && this.error;
    },
    contentWidth: function contentWidth() {
      return "calc(100% - ".concat(this.labelWidth, " - 20rpx)");
    },
    isJustify: function isJustify() {
      return this.justify !== 'start' ? "is-justify-".concat(this.justify) : '';
    },
    isRequired: function isRequired() {
      return this.required ? 'cl-form-item--required' : '';
    },
    isError: function isError() {
      return this.error ? 'cl-form-item--error' : '';
    },
    isSuffix: function isSuffix() {
      return this.$scopedSlots.suffix ? 'cl-form-item--suffix' : '';
    },
    isDisabled: function isDisabled() {
      return this.disabled ? 'cl-form-item--disabled' : '';
    },
    parent: function parent() {
      var parent = _utils.getParent.call(this, 'ClForm', ['labelWidth', 'showMessage', 'model', 'addField', 'removeField', 'validateOnValueChange', 'rules2']);

      parent.rules = parent.rules2;
      this.changeRule(parent);
      return parent;
    }
  },
  destroyed: function destroyed() {
    if (this.parent.removeField) {
      this.parent.removeField(this.prop);
    }
  },
  methods: {
    changeRule: function changeRule(_ref) {
      var _this = this;

      var _ref$rules = _ref.rules,
          rules = _ref$rules === void 0 ? {} : _ref$rules,
          addField = _ref.addField;

      if (!rules) {
        return false;
      }

      var rule = rules[this.prop];

      if (rule) {
        this.required = false;
        this.message = '';

        if (rule instanceof Array) {
          rule.forEach(function (e) {
            if (e.required) {
              _this.required = e.required;
            }

            if (e.message) {
              _this.message = e.message;
            }
          });
        } else {
          this.required = rule.required;
          this.message = rule.message;
        } // 检验器


        this.validator = new _asyncValidator.default(_defineProperty({}, this.prop, rule)); // 响应事件

        addField(this.prop, this.onResponse);
      }
    },
    onResponse: function onResponse(_ref2) {
      var _this2 = this;

      var value = _ref2.value,
          action = _ref2.action;
      this.$nextTick(function () {
        if (action == 'clear') {
          _this2.error = false;
        }

        if (action == 'validate') {
          if (_this2.validateOnValueChange || _this2.parent.validateOnValueChange) {
            _this2.validate(value);
          }
        }
      });
    },
    onListener: function onListener(parent) {
      var _this3 = this;

      var unwatch = this.$watch(function () {
        return parent.model[_this3.prop];
      }, function (val) {
        _this3.validate(val);
      }, {
        deep: false
      }); // unwatch();
    },
    validate: function validate(val) {
      var _this4 = this;

      this.validator.validate(_defineProperty({}, this.prop, val), function (errors, fields) {
        _this4.error = errors;
      });
    }
  }
};
exports.default = _default;

/***/ })

}]);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/cool/ui/components/form-item/form-item.js.map
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'cool/ui/components/form-item/form-item-create-component',
    {
        'cool/ui/components/form-item/form-item-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('1')['createComponent'](__webpack_require__(354))
        })
    },
    [['cool/ui/components/form-item/form-item-create-component']]
]);
