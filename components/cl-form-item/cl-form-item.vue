<template>
	<view :class="['cl-form-item', isLabelPosition, isRequired, isError, isSuffix]">
		<view :class="['cl-form-item__label']" :style="{ width: labelWidth2 }" v-if="label2">{{
			label2
		}}</view>

		<view class="cl-form-item__container">
			<view :class="['cl-form-item__content', isJustify]">
				<slot></slot>
			</view>
			<view class="cl-form-item__suffix">
				<slot name="suffix"></slot>
			</view>
		</view>

		<text :class="['cl-form-item__message']" v-if="showMessage2">{{ message }}</text>
	</view>
</template>

<script>
import AsyncValidator from "../../utils/async-validator";
import { getParent } from "../../utils";

/**
 * form-item 表单项
 * @description 表单项，基于 async-validator 的验证
 * @tutorial https://docs.cool-js.com/uni/components/form/rules.html
 * @property {Object} model 表单数据对象
 * @property {Object} rules 表单验证规则
 * @property {Boolean} border 是否带有边框
 * @property {Boolean} showMessage 是否显示消息提示
 * @property {String} labelWidth 表单域标签的宽度，默认150rpx
 * @property {String} labelPosition 表单域标签的位置，默认right
 * @property {String} justify 水平布局，默认start
 * @property {String} validateOnValueChange 是否在 rules 属性改变后立即触发一次验证，默认true
 * @example <cl-form-item prop="name"></cl-form-item>
 */

export default {
	name: "cl-form-item",

	props: {
		// 表单域 model 字段
		prop: String,
		// 标签文本
		label: String,
		// 表单域标签的的宽度
		labelWidth: String,
		// 表单域标签的位置
		labelPosition: String,
		// 是否显示消息提示
		showMessage: {
			type: Boolean,
			default: false,
		},
		// 水平布局
		justify: {
			type: String,
			default: "start",
		},
		// 是否在 rules 属性改变后立即触发一次验证
		validateOnValueChange: {
			type: Boolean,
			default: false,
		},
	},

	data() {
		return {
			required: false,
			message: null,
			error: false,
			validator: null,
		};
	},

	computed: {
		parent() {
			let parent = getParent.call(this, "ClForm", [
				"labelWidth",
				"labelPosition",
				"showMessage",
				"model",
				"addField",
				"removeField",
				"validateOnValueChange",
				"rules2",
			]);

			parent.rules = parent.rules2;
			return parent;
		},

		label2() {
			return this.label == "true" ? "" : this.label;
		},

		labelWidth2() {
			return this.labelWidth || this.parent.labelWidth;
		},

		labelPosition2() {
			return this.labelPosition || this.parent.labelPosition;
		},

		showMessage2() {
			return (this.showMessage || this.parent.showMessage) && this.error;
		},

		contentWidth() {
			return `calc(100% - ${this.labelWidth} - 20rpx)`;
		},

		isJustify() {
			return this.justify !== "start" ? `is-justify-${this.justify}` : "";
		},

		isRequired() {
			return this.required ? "cl-form-item--required" : "";
		},

		isError() {
			return this.required && this.error ? "cl-form-item--error" : "";
		},

		isSuffix() {
			return this.$scopedSlots.suffix ? "cl-form-item--suffix" : "";
		},

		isLabelPosition() {
			return this.labelPosition2 ? `cl-form-item--${this.labelPosition2}` : "";
		},
	},

	watch: {
		parent: {
			deep: true,
			handler: "changeRule",
		},
	},

	destroyed() {
		if (this.parent.removeField) {
			this.parent.removeField(this.prop);
		}
	},

	methods: {
		changeRule({ rules = {}, addField, model }) {
			if (!rules) {
				return false;
			}

			const rule = rules[this.prop];

			if (rule) {
				this.required = false;
				// this.error = false;
				this.message = "";

				if (rule instanceof Array) {
					rule.forEach((e) => {
						if (e.required) {
							this.required = e.required;
						}

						if (e.message) {
							this.message = e.message;
						}
					});
				} else {
					this.required = rule.required;
					this.message = rule.message;
				}

				// 检验器
				this.validator = new AsyncValidator({
					[this.prop]: rule,
				});

				// 响应事件
				addField(this.prop, this.onResponse);

				// 是否在 rules 属性改变后立即触发一次验证
				if (this.validateOnValueChange || this.parent.validateOnValueChange) {
					this.validate(model[this.prop]);
				}
			}
		},

		onResponse({ value, action }) {
			this.$nextTick(() => {
				if (action == "clear") {
					this.error = false;
				}

				if (action == "validate") {
					this.validate(value);
				}
			});
		},

		onListener(parent) {
			let unwatch = this.$watch(
				() => {
					return parent.model[this.prop];
				},
				(val) => {
					this.validate(val);
				},
				{
					deep: false,
				}
			);
		},

		validate(val) {
			if (this.required) {
				this.validator.validate({ [this.prop]: val }, (errors, fields) => {
					this.error = errors;
				});
			}
		},
	},
};
</script>
