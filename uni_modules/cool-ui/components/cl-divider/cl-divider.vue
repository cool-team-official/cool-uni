<template>
	<view class="cl-divider">
		<view class="cl-divider__line" :style="{ background: lineColor, width }"></view>

		<view
			class="cl-divider__text"
			:style="{
				backgroundColor,
			}"
		>
			<slot></slot>
		</view>
	</view>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { isArray } from "lodash-es";

export default defineComponent({
	name: "cl-divider",

	props: {
		// 背景颜色
		backgroundColor: String,
		// 线条颜色
		color: {
			type: [String, Array],
			default: "#dcdfe6",
		},
		// 线条宽度
		width: {
			type: String,
			default: "100%",
		},
	},

	setup(props) {
		const lineColor = computed(() => {
			if (isArray(props.color)) {
				const [a, b] = props.color || [];
				return `linear-gradient(to right, ${a}, ${b}, ${b}, ${a})`;
			} else {
				return props.color;
			}
		});

		return {
			lineColor,
		};
	},
});
</script>
