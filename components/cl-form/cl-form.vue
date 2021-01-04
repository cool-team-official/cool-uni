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
import Emitter from "../../mixins/emitter";
import { isArray, isObject, isString, isBoolean, isEmpty, isNumber, cloneDeep } from "../../utils";

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
 * @property {Boolean} validateOnRuleChange 是否在 rules 属性改变后立即触发一次验证，默认true
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
		validateOnRuleChange: {
			type: Boolean,
			default: false,
		},
	},

	mixins: [Emitter],

	data() {
		return {
			rules2: {},
			props: [],
			_form: {},
			lock: false,
		};
	},

	watch: {
		model2: {
			deep: true,
			handler(newV, oldV) {
				if (!this.lock) {
					// 数据变化时，通知 form-item 验证
					this.publish("validate", {
						props: this.checkProps(newV, oldV),
					});
				}

				this.lock = false;
			},
		},

		rules: {
			immediate: true,
			handler(val) {
				this.setRules(val);
			},
		},

		rules2: {
			deep: true,
			immediate: true,
			handler(val) {
				// 设置字段
				this.props = Object.keys(val);
				// 通知 form-item 修改验证规则
				this.publish("change-rule", { rules: val });
			},
		},
	},

	computed: {
		model2() {
			// 避免 newValue 与 oldValue 重复
			return cloneDeep(this.model);
		},
	},

	mounted() {
		// 设置默认数据
		this._form = cloneDeep(this.model);
	},

	methods: {
		// 弥补 props 方法不能传递的问题
		setRules(rules) {
			this.rules2 = rules || {};
		},

		// 校验表单
		validate(callback) {
			this.validateField(this.props, callback);
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
					rules[i] = this.rules2[i];
				}
			}

			const validator = new AsyncValidator(rules);

			let form = {};

			props.forEach((e) => {
				form[e] = this.model[e];
			});

			// 验证所有prop
			validator.validate(form, (errors, fields) => {
				this.publish("validate", {
					props,
				});

				if (callback) {
					callback(!errors, errors);
				}
			});
		},

		// 重置表单
		resetFields() {
			this.lock = true;
			this.form = cloneDeep(this._form);
			this.$emit("update:model", this.form);
			this.clearValidate();
		},

		// 移除表单校验结果
		clearValidate() {
			this.publish("clearValidate");
		},

		// 移除字段
		removeField(prop) {
			this.props.splice(this.props.indexOf(prop), 1);
		},

		// 发布消息
		publish(action, options) {
			let { rules, props = this.props, model = this.model2 } = options || {};

			this.broadcast("ClFormItem", "form.event", {
				rules,
				props,
				model,
				action,
			});
		},

		// 检测是哪个prop引起的变化
		checkProps(d1, d2) {
			const deep = (d1, d2) => {
				if (isArray(d2)) {
					if (isArray(d1)) {
						if (d2.length === d1.length) {
							return !d2.some((v, i) => {
								return !deep(d2[i], d1[i]);
							});
						}
					}

					return false;
				} else if (isObject(d2)) {
					if (isObject(d1)) {
						let flag = true;

						for (let i in d2) {
							flag = deep(d2[i], d1[i]);

							if (!flag) {
								return false;
							}
						}

						return true;
					}

					return false;
				} else if (isString(d2)) {
					return d1 === d2;
				} else if (isNumber(d2)) {
					return d1 === d2;
				} else if (isBoolean(d2)) {
					return d1 === d2;
				} else {
					return true;
				}
			};

			return this.props.filter((k) => {
				return !deep(d1[k], d2[k]);
			});
		},
	},
};
</script>
