<template>
	<view
		class="cl-radio-group"
		:class="{
			'is-fill': fill,
		}"
	>
		<slot></slot>
	</view>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	name: "cl-radio-group",

	props: {
		// 绑定值
		modelValue: null,
		// 是否禁用
		disabled: Boolean,
		// 是否边框样式
		border: Boolean,
		// 是否宽度填充
		fill: Boolean,
		// 尺寸
		size: {
			type: [String, Number],
			default: null,
		},
	},

	emits: ["update:modelValue", "change"],

	setup(_, { emit }) {
		function change(label: any) {
			emit("update:modelValue", label);
			emit("change", label);
		}

		return {
			change,
		};
	},
});
</script>
