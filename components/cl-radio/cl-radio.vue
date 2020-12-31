<template>
	<view class="cl-radio" :class="[classList]" @tap="change">
		<view class="cl-radio__input">
			<text class="cl-icon-toast-success" v-if="checked"></text>
		</view>

		<view class="cl-radio__label">
			<slot></slot>
		</view>
	</view>
</template>

<script>
import Emitter from "../../mixins/emitter";
import Form from "../../mixins/form";
import Parent from "../../mixins/parent";

/**
 * radio 单选框
 * @description 单选框
 * @tutorial https://docs.cool-js.com/uni/components/form/radio.html
 * @property {String, Number} value 绑定值
 * @property {String, Number} label 标识
 * @property {Boolean} disabled 是否禁用
 * @property {Boolean} border 是否边框样式
 * @event {Function} change 绑定值改变时触发
 * @example <cl-radio label="1"></cl-radio>
 */

export default {
	name: "cl-radio",

	componentName: "ClRadio",

	props: {
		// 绑定值
		value: [String, Number],
		// 标识
		label: [String, Number],
		// 是否禁用
		disabled: Boolean,
		// 是否边框样式
		border: Boolean,
	},

	mixins: [Emitter, Form, Parent],

	data() {
		return {
			checked: false,
			Keys: ["border", "disabled", "value"],
			ComponentName: "ClRadioGroup",
		};
	},

	watch: {
		value: {
			immediate: true,
			handler(val) {
				this.checked = val === this.label;
			},
		},
		"parent.value": {
			immediate: true,
			handler(val) {
				if (this.hasParent) {
					this.checked = val === this.label;
				}
			},
		},
	},

	computed: {
		isBorder() {
			return this.hasParent ? this.parent.border || this.border : this.border;
		},

		isDisabled() {
			let disabled = this.hasParent ? this.parent.disabled || this.disabled : this.disabled;
			return this.$form ? this.$form.disabled || disabled : disabled;
		},

		classList() {
			let list = [];

			if (this.isBorder) {
				list.push("is-border");
			}

			if (this.isDisabled) {
				list.push("is-disabled");
			}

			if (this.checked) {
				list.push("is-checked");
			}

			return list.join(" ");
		},
	},

	methods: {
		change() {
			if (this.isDisabled) {
				return false;
			}

			this.checked = true;

			// 回调到组件或者单选框组
			if (this.hasParent) {
				this.dispatch("ClRadioGroup", "radio.change", this.label);
			} else {
				this.$emit("input", this.label);
				this.$emit("change", this.label);
			}
		},
	},
};
</script>
