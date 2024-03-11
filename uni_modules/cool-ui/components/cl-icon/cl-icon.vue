<template>
	<text
		:class="['cl-icon', className || `cl-icon-${name}`, `is-${color}`]"
		:style="[
			baseStyle,
			{
				fontSize: parseRpx(size),
				color,
			},
		]"
	></text>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStyle } from "../../hooks";

export default defineComponent({
	name: "cl-icon",
	props: {
		// 图标名称
		name: String,
		// 自定义图标名称
		className: String,
		// 图标大小
		size: {
			type: [String, Number],
			default: 30,
		},
		// 图标颜色
		color: String,
	},
	setup() {
		return {
			...useStyle(),
		};
	},
});
</script>
