<template>
	<cl-icon class-name="cl-loading cl-icon-loading" :color="color" :size="size" />
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	name: "cl-loading",

	props: {
		// 图标颜色
		color: {
			type: String,
			default: "primary",
		},
		// 图标大小
		size: {
			type: [String, Number],
			default: 40,
		},
	},
});
</script>
