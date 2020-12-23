<template>
	<switch
		class="cl-switch"
		:checked="checked"
		:disabled="isDisabled"
		:color="color"
		@change="onChange"
	></switch>
</template>

<script>
import Form from "../../mixins/form";

/**
 * switch 开关
 * @description 开关
 * @tutorial https://docs.cool-js.com/uni/components/form/switch.html
 * @property {String, Number} value 绑定值
 * @property {Boolean} disabled 是否禁用
 * @property {Boolean} activeValue 打开时的值，默认true
 * @property {Boolean} inactiveValue 关闭时的值，默认false
 * @property {Boolean} color 打开时的背景色，默认#409eff
 * @event {Function} change 绑定值改变时触发
 * @example <cl-switch />
 */

export default {
	props: {
		// 绑定值
		value: [Boolean, String, Number],
		// 是否禁用
		disabled: Boolean,
		// 打开时的值
		activeValue: {
			type: [Boolean, String, Number],
			default: true,
		},
		// 关闭时的值
		inactiveValue: {
			type: [Boolean, String, Number],
			default: false,
		},
		// 打开时的背景色
		color: String,
	},

	mixins: [Form],

	computed: {
		checked() {
			return this.value === this.activeValue;
		},
	},

	methods: {
		onChange(e) {
			let d = e.detail.value ? this.activeValue : this.inactiveValue;

			this.$emit("input", d);
			this.$emit("change", d);
		},
	},
};
</script>
