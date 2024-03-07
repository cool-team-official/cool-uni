<template>
	<view
		class="cl-checkbox-group"
		:class="{
			'is-fill': fill,
		}"
	>
		<slot></slot>
	</view>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { cloneDeep } from "lodash-es";

export default defineComponent({
	name: "cl-checkbox-group",

	props: {
		// 绑定值
		modelValue: {
			type: Array,
			default: () => [],
		},
		// 是否边框样式
		border: Boolean,
		// 是否禁用
		disabled: Boolean,
		// 是否圆角
		round: Boolean,
		// 是否宽度填充
		fill: Boolean,
		// 尺寸
		size: [String, Number],
	},

	emits: ["update:modelValue", "change"],

	setup(props, { emit }) {
		function onChange(label: string) {
			const index = props.modelValue.findIndex((e) => e == label);
			let list = cloneDeep(props.modelValue);

			if (index >= 0) {
				list.splice(index, 1);
			} else {
				list.push(label);
			}

			emit("update:modelValue", list);
			emit("change", list);
		}

		return {
			onChange,
		};
	},
});
</script>
