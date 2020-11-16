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
			height: height2,
			width: width2,
			padding: padding2,
			margin: margin2,
			borderRadius: borderRadius2,
			border,
			backgroundColor,
		}"
	>
		<slot></slot>
	</view>
</template>

<script>
import Style from "../../mixins/style";
import { isArray, isNumber } from "../../utils";

export default {
	name: "cl-row",
	componentName: "ClRow",
	mixins: [Style],
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
	},
	computed: {
		margin2() {
			return this.margin ? this.parse_prop(this.margin) : `0 -${this.gutter / 2}rpx`;
		},
	},
};
</script>
