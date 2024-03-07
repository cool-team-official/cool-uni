<template>
	<view class="cl-list" :style="[baseStyle]">
		<slot></slot>
	</view>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { type PropType } from "vue";
import { useStyle } from "../../hooks";

export default defineComponent({
	name: "cl-list",

	props: {
		// 水平布局方式
		justify: String as PropType<"start" | "end" | "center">,
		// 是否禁用
		disabled: Boolean,
		// 是否带有下边框
		border: {
			type: Boolean,
			default: true,
		},
	},

	setup() {
		return {
			...useStyle(),
		};
	},
});
</script>
