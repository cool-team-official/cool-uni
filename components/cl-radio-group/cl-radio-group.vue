<template>
	<view class="cl-radio-group">
		<slot></slot>
	</view>
</template>

<script>
import Emitter from "../../mixins/emitter";
import { cloneDeep } from "../../utils";

/**
 * radio-group 单选框组
 * @description 单选框组
 * @tutorial https://docs.cool-js.com/uni/components/form/radio.html
 * @property {String, Number} value 绑定值
 * @property {Boolean} disabled 是否禁用
 * @property {Boolean} border 是否边框样式
 * @event {Function} change 绑定值改变时触发
 * @example <cl-radio-group v-model="val"><cl-radio label="1" /><cl-radio label="2" /></cl-radio-group>
 */

export default {
	name: "cl-radio-group",

	componentName: "ClRadioGroup",

	props: {
		// 绑定值
		value: null,
		// 是否禁用
		disabled: Boolean,
		// 是否边框样式
		border: Boolean,
	},

	mixins: [Emitter],

	created() {
		// 监听单选框的变化
		this.$on("radio.change", (label) => {
			this.$emit("input", label);
			this.$emit("change", label);
		});
	},
};
</script>
