<template>
	<view class="cl-checkbox" :class="[classList]" @tap="change">
		<view class="cl-checkbox__input">
			<text class="cl-icon-toast-success" v-if="checked"></text>
		</view>

		<text class="cl-checkbox__label">
			<slot></slot>
		</text>
	</view>
</template>

<script>
import Emitter from "../../mixins/emitter";
import Form from "../../mixins/form";
import { getParent, isBoolean } from "../../utils";

/**
 * checkbox 多选框
 * @description 多选框
 * @tutorial https://docs.cool-js.com/uni/components/form/checkbox.html
 * @property {String, Number} value 绑定值
 * @property {String, Number} label 标识
 * @property {Boolean} disabled 是否禁用
 * @property {Boolean} border 是否边框样式
 * @property {Boolean} round 是否圆角
 * @property {Boolean} fill 是否宽度填充
 * @event {Function} change 绑定值改变时触发
 * @example <cl-checkbox label="1"></cl-checkbox>
 */

export default {
	name: "cl-checkbox",

	componentName: "ClCheckbox",

	props: {
		// 绑定值
		value: null,
		// 标识
		label: [String, Number],
		// 是否禁用
		disabled: Boolean,
		// 是否边框样式
		border: Boolean,
		// 是否圆角
		round: Boolean,
		// 是否宽度填充
		fill: Boolean,
	},

	mixins: [Emitter, Form],

	data() {
		return {
			checked: false,
		};
	},

	watch: {
		value: {
			immediate: true,
			handler(val) {
				this.checked = Boolean(val);
			},
		},
		"parent.value": {
			immediate: true,
			handler(val) {
				if (val) {
					// 判断当前是否选中
					this.checked = val.includes(this.label);
				}
			},
		},
	},

	computed: {
		parent() {
			return getParent.call(this, "ClCheckboxGroup", ["border", "disabled", "value"]);
		},

		isGroup() {
			return Boolean(this.parent);
		},

		isRound() {
			return this.isGroup ? this.parent.round || this.round : this.round;
		},

		isBorder() {
			return this.isGroup ? this.parent.border || this.border : this.border;
		},

		isDisabled() {
			let disabled = this.isGroup ? this.parent.disabled || this.disabled : this.disabled;
			return this.$form ? this.$form.disabled || disabled : disabled;
		},

		classList() {
			let list = [];

			if (this.isBorder) {
				list.push("cl-checkbox--border");
			}

			if (this.isRound) {
				list.push("cl-checkbox--round");
			}

			if (this.isDisabled) {
				list.push("is-disabled");
			}

			if (this.checked) {
				list.push("is-checked");
			}

			if (this.fill) {
				list.push("is-fill");
			}

			return list.join(" ");
		},
	},

	methods: {
		change() {
			if (this.isDisabled) {
				return false;
			}

			this.checked = !this.checked;

			// 回调到组件或者多选框组
			if (this.isGroup) {
				this.dispatch("ClCheckboxGroup", "checkbox.change", this.label);
			} else {
				this.$emit("input", this.checked);
				this.$emit("change", this.checked);
			}
		},
	},
};
</script>
