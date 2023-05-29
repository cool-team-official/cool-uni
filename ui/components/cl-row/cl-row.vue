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
		:style="{
			height: parseRpx(height),
			width: parseRpx(width),
			padding: parseRpx(padding),
			borderRadius: parseRpx(borderRadius),
			margin,
			border,
			backgroundColor,
		}"
		@click="tap"
	>
		<slot></slot>
	</view>
</template>

<script lang="ts">
/**
 * @description 行
 * @property {Object} type 类型
 * @property {Object} wrap 是否换行
 * @example <cl-col :span="12"></cl-col>
 */

import { computed, defineComponent } from "vue";
import { useTap } from "../../hook";
import { parseRpx } from "/@/cool/utils";

export default defineComponent({
	name: "cl-row",

	emits: ["click", "tap"],

	props: {
		type: String,
		wrap: Boolean,
		backgroundColor: String,
		border: String,
		gutter: {
			type: Number,
			default: 0,
		},
		justify: {
			type: String,
			default: "start",
		},
		align: {
			type: String,
			default: "top",
		},
		height: [String, Number],
		width: [String, Number],
		padding: [String, Number, Array],
		margin: [String, Number, Array],
		borderRadius: [String, Number],
	},

	setup(props, { emit }) {
		const { tap } = useTap(emit);

		const margin = computed(() => {
			return props.margin ? parseRpx(props.margin) : `0 -${props.gutter / 2}rpx`;
		});

		return {
			parseRpx,
			margin,
			tap,
		};
	},
});
</script>
