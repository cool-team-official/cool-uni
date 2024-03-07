<template>
	<view class="cl-slider">
		<slider
			:value="value"
			:min="min"
			:max="max"
			:step="step"
			:active-color="activeColor"
			:background-color="backgroundColor"
			:block-size="blockSize"
			:block-color="blockColor"
			:show-value="showValue"
			:disabled="disabled"
			@change="onChange"
			@changing="onChanging"
		/>
	</view>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";

export default defineComponent({
	name: "cl-slider",

	props: {
		// 绑定值
		modelValue: {
			type: Number,
		},
		// 是否禁用
		disabled: {
			type: Boolean,
			default: null,
		},
		// 最小值
		min: {
			type: Number,
			default: 0,
		},
		// 最大值
		max: {
			type: Number,
			default: 100,
		},
		// 步长
		step: {
			type: Number,
			default: 1,
		},
		// 滑块左侧已选择部分的线条颜色
		activeColor: {
			type: String,
			default: "#409eff",
		},
		// 滑块右侧背景条的颜色
		backgroundColor: {
			type: String,
			default: "#e9e9e9",
		},
		// 滑块的大小
		blockSize: {
			type: Number,
			default: 15,
		},
		// 滑块颜色
		blockColor: {
			type: String,
			default: "#ffffff",
		},
		// 是否显示当前值
		showValue: {
			type: Boolean,
			default: false,
		},
	},

	emits: ["update:modelValue", "change", "changing"],

	setup(props, { emit }) {
		const value = ref(0);

		watch(
			() => props.modelValue,
			(val) => {
				value.value = val as number;
			},
			{
				immediate: true,
			},
		);

		function onChange(e: any) {
			emit("update:modelValue", e.detail.value);
			emit("change", e);
		}

		function onChanging(e: any) {
			emit("update:modelValue", e.detail.value);
			emit("changing", e);
		}

		return {
			value,
			onChange,
			onChanging,
		};
	},
});
</script>
