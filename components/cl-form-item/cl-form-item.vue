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

		<slot name="error" :message="message" :error="showMessage2">
			<text :class="['cl-form-item__message']" v-if="showMessage2">{{ message }}</text>
		</slot>
	</view>
</template>

<script>
import AsyncValidator from "../../utils/async-validator";
import Emitter from "../../mixins/emitter";
import Parent from "../../mixins/parent";
import { isArray } from "../../utils";

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
 * @property {String} validateOnRuleChange 是否在 rules 属性改变后立即触发一次验证，默认true
 * @example <cl-form-item prop="name"></cl-form-item>
 */

export default {
	name: "cl-form-item",
	componentName: "ClFormItem",

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
		validateOnRuleChange: {
			type: Boolean,
			default: false,
		},
	},

	mixins: [Emitter, Parent],

	data() {
		return {
			required: false,
			message: "",
			error: false,
			validator: null,
			Keys: [
				"labelWidth",
				"labelPosition",
				"showMessage",
				"model",
				"removeField",
				"rules2",
				"validateOnRuleChange",
			],
			ComponentName: "ClForm",
		};
	},

	computed: {
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
			return this.$slots.suffix ? "cl-form-item--suffix" : "";
		},

		isLabelPosition() {
			return this.labelPosition2 ? `cl-form-item--${this.labelPosition2}` : "";
		},
	},

	created() {
		this.$on("form.event", ({ props, action, model, rules }) => {
			let isValid = props.includes(this.prop);

			switch (action) {
				case "change-rule":
					this.changeRule(rules);
					break;

				case "validate":
					if (isValid) {
						this.validate(model[this.prop]);
					}
					break;

				case "clearValidate":
					if (isValid) {
						this.clearValidate();
					}
					break;
			}
		});
	},

	mounted() {
		// 初始化验证规则
		this.changeRule(this.parent.rules2);
	},

	destroyed() {
		if (this.parent.removeField) {
			this.parent.removeField(this.prop);
		}
	},

	methods: {
		changeRule(rules) {
			if (!rules) {
				return false;
			}

			const rule = rules[this.prop];

			if (rule) {
				this.required = false;
				this.clearValidate();

				if (isArray(rule)) {
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

				// 是否在 rules 属性改变后立即触发一次验证
				if (this.validateOnRuleChange || this.parent.validateOnRuleChange) {
					this.validate(this.parent.model[this.prop]);
				}
			}
		},

		validate(val) {
			if (this.required) {
				this.validator.validate({ [this.prop]: val }, (errors, fields) => {
					this.error = Boolean(errors);
					this.message = errors[0].message;
				});
			}
		},

		clearValidate() {
			this.error = false;
			this.message = "";
		},
	},
};
</script>
