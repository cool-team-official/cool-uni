<template>
	<cl-icon :class-name="`cl-loading cl-icon-loading-${theme}`" :color="color" :size="size" />
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";

export default defineComponent({
	name: "cl-loading",

	props: {
		// 图标颜色
		color: {
			type: String,
			default: "primary",
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
});
</script>
