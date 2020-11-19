<template>
	<view
		:class="[
			'cl-row',
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
			margin: margin2,
			borderRadius: parseRpx(borderRadius),
			border,
			backgroundColor,
		}"
	>
		<slot></slot>
	</view>
</template>

<script>
import { parseRpx } from "../../utils/style";
import { isArray, isNumber } from "../../utils";

export default {
	name: "cl-row",
	componentName: "ClRow",
	props: {
		type: String,
		wrap: Boolean,
		backgroundColor: String,
		border: String,
		boxSizing: String,
		gutter: [Number, String],
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
	computed: {
		margin2() {
			return this.margin ? parseRpx(this.margin) : `0 -${this.gutter / 2}rpx`;
		},
	},
	methods: {
		parseRpx,
	},
};
</script>
