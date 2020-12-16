<template>
	<view
		:class="[
			'cl-form',
			{
				'is-border': border,
			},
		]"
	>
		<slot></slot>
	</view>
</template>

<script>
import AsyncValidator from "../../utils/async-validator";
import { isArray, isObject, isString, isBoolean, isEmpty, diffForm } from "../../utils";

/**
 * form 表单
 * @description 表单，基于 async-validator 的验证
 * @tutorial https://docs.cool-js.com/uni/components/form/rules.html
 * @property {Object} model 表单数据对象
 * @property {Object} rules 表单验证规则
 * @property {Boolean} border 是否带有边框
 * @property {Boolean} disabled 是否禁用
 * @property {Boolean} showMessage 是否显示消息提示
 * @property {String} labelWidth 表单域标签的宽度，默认150rpx
 * @property {String} labelPosition 表单域标签的位置，默认right
 * @property {Boolean} validateOnValueChange 是否在 rules 属性改变后立即触发一次验证，默认true
 * @example <cl-form model="" rules=""></cl-form>
 */

export default {
	name: "cl-form",

	componentName: "ClForm",

	props: {
		// 表单数据对象
		model: {
			type: Object,
			default: () => {
				return {};
			},
		},
		// 表单验证规则
		rules: Object,
		// 是否带有边框
		border: Boolean,
		// 是否禁用
		disabled: Boolean,
		// 是否显示消息提示
		showMessage: {
			type: Boolean,
			default: true,
		},
		// 表单域标签的宽度
		labelWidth: {
			type: String,
			default: "150rpx",
		},
		// 表单域标签的位置
		labelPosition: {
			type: String,
			default: "right",
		},
		// 是否在 rules 属性改变后立即触发一次验证
		validateOnValueChange: {
			type: Boolean,
			default: false,
		},
	},

	data() {
		return {
			subscrible: [],
			rules2: [],
		};
	},

	watch: {
		model2: {
			handler(newV, oldV) {
				this.publish({
					props: diffForm(newV, oldV),
					action: "validate",
				});
			},
			deep: true,
		},

		rules(val) {
			this.setRules(val);
		},
	},

	computed: {
		model2() {
			return JSON.parse(JSON.stringify(this.model));
		},
	},

	created() {
		this.setRules(this.rules);
	},

	methods: {
		// 弥补 props 方法不能传递的问题
		setRules(rules) {
			this.rules2 = rules || {};
		},

		// 校验表单
		validate(callback) {
			this.validateField(Object.keys(this.model), callback);
		},

		// 根据字段校验表单
		validateField(props, callback) {
			if (!props) {
				console.warn(`Props 为空`);
				return false;
			}

			if (!isArray(props)) {
				props = [props];
			}

			let rules = {};

			for (let i in this.rules2) {
				if (props.includes(i)) {
					if (this.subscrible.find((e) => e.prop == i)) {
						rules[i] = this.rules2[i];
					}
				}
			}

			const validator = new AsyncValidator(rules);

			let form = {};

			props.forEach((e) => {
				form[e] = this.model[e];
			});

			validator.validate(form, (errors, fields) => {
				this.publish({ props, action: "validate" });

				if (callback) {
					callback(!errors, errors);
				}
			});
		},

		// 重置表单
		resetFields() {
			let form = {};
			let flag = false;

			for (let i in this.model) {
				let val = this.model[i];

				if (val) {
					flag = true;
				}

				if (isArray(val)) {
					form[i] = val.map(() => null);
				} else if (isObject(val)) {
					form[i] = {};
				} else if (isString(val)) {
					form[i] = "";
				} else if (isBoolean(val)) {
					form[i] = false;
				} else {
					form[i] = undefined;
				}
			}

			if (flag) {
				this.$emit("update:model", form);
			}

			this.clearValidate();
		},

		// 移除表单校验结果
		clearValidate(props) {
			this.$nextTick(() => {
				this.publish({ props, action: "clear" });
			});
		},

		// 添加字段，监听事件
		addField(prop, callback) {
			let item = this.subscrible.find((e) => e.prop == prop);

			if (item) {
				item.handler = callback;
			} else {
				this.subscrible.push({
					prop,
					handler: callback,
				});
			}
		},

		// 移除字段和事件
		removeField(prop) {
			const i = this.subscrible.findIndex((e) => e.prop == prop);
			this.subscrible.splice(i, 1);
		},

		// 发布消息
		publish({ action, props }) {
			let item = null;

			if (!props) {
				props = Object.keys(this.model);
			}

			props.forEach((k) => {
				item = this.subscrible.find((e) => e.prop == k);

				if (item) {
					item.handler({ action, value: this.model[k] });
				}
			});
		},
	},
};
</script>
