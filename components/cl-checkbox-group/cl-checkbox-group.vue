<template>
	<view class="cl-checkbox-group">
		<slot></slot>
	</view>
</template>

<script>
import Emitter from "../../mixins/emitter";
import { cloneDeep } from "../../utils";

/**
 * checkbox-group 多选框组
 * @description 多选框组
 * @tutorial https://docs.cool-js.com/uni/components/form/checkbox.html
 * @property {String, Number} value 绑定值
 * @property {Boolean} disabled 是否禁用
 * @property {Boolean} border 是否边框样式
 * @property {Boolean} round 是否圆角
 * @event {Function} change 绑定值改变时触发
 * @example <cl-checkbox-group v-model="arr"><cl-checkbox label="1" /><cl-checkbox label="2" /></cl-checkbox-group>
 */

export default {
	name: "cl-checkbox-group",

	componentName: "ClCheckboxGroup",

	props: {
		// 绑定值
		value: {
			type: Array,
			default: () => [],
		},
		// 是否边框样式
		border: Boolean,
		// 是否禁用
		disabled: Boolean,
		// 是否圆角
		round: Boolean,
	},

	mixins: [Emitter],

	created() {
		// 监听多选框的变化
		this.$on("checkbox.change", (label) => {
			let index = this.value.findIndex((e) => e == label);
			let list = cloneDeep(this.value);

			if (index >= 0) {
				list.splice(index, 1);
			} else {
				list.push(label);
			}

			this.$emit("input", list);
			this.$emit("change", list);
		});
	},
};
</script>
