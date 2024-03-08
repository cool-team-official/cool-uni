<template>
	<view class="cl-loading" :style="{ height: parseRpx(size), width: parseRpx(size) }">
		<cl-icon :name="`loading-${theme}`" :color="color" :size="size" />
	</view>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";
import { parseRpx } from "/@/cool/utils";

export default defineComponent({
	name: "cl-loading",

	props: {
		// 图标颜色
		color: {
			type: String,
			default: "primary",
		},
		// 边框颜色
		borderColor: {
			type: String,
			default: "rgba(0, 0, 0, 0.1)",
		},
		// 主题
		theme: {
			type: String as PropType<"spin" | "snow" | "dot">,
			default: "spin",
		},
		// 图标大小
		size: {
			type: [String, Number],
			default: 50,
		},
	},

	setup() {
		return {
			parseRpx,
		};
	},
});
</script>
