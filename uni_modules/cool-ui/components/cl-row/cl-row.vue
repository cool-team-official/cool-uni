<template>
	<view
		class="cl-row"
		:class="[
			`cl-row--${type}`,
			`is-justify-${justify}`,
			`is-align-${align}`,
			{
				'is-wrap': wrap,
			},
		]"
		:style="[
			baseStyle,
			{
				height: parseRpx(height),
				width: parseRpx(width),
				margin,
				border,
			},
		]"
		@click="tap"
	>
		<slot></slot>
	</view>
</template>

<script lang="ts">
import { computed, defineComponent, type PropType } from "vue";
import { useStyle, useTap } from "../../hooks";
import { parseRpx } from "/@/cool/utils";

export default defineComponent({
	name: "cl-row",

	props: {
		// 类型
		type: String,
		// 是否换行
		wrap: Boolean,
		// 带边框
		border: String,
		// 列间距
		gutter: {
			type: Number,
			default: 0,
		},
		// 高度
		height: [String, Number],
		// 宽度
		width: [String, Number],
		// 外间距
		margin: [String, Number, Array],
		// 水平对齐
		justify: {
			type: String as PropType<"start" | "center" | "end" | "space-between" | "space-around">,
			default: "start",
		},
		// 垂直对齐
		align: {
			type: String as PropType<"top" | "center" | "bottom">,
			default: "center",
		},
	},

	setup(props, { emit }) {
		const { tap } = useTap(emit);

		const margin = computed(() => {
			return props.margin ? parseRpx(props.margin) : `0 -${props.gutter / 2}rpx`;
		});

		return {
			margin,
			tap,
			...useStyle(),
		};
	},
});
</script>
