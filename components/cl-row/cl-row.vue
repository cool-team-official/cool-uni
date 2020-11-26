<template>
	<view
		:class="[
			'cl-row',
			`cl-row--${type}`,
			`is-justify-${justify}`,
			`is-align-${align}`,
			{
				'is-wrap': wrap
			}
		]"
		:style="{
			height: parseRpx(height),
			width: parseRpx(width),
			padding: parseRpx(padding),
			margin: margin2,
			borderRadius: parseRpx(borderRadius),
			border,
			backgroundColor
		}"
	>
		<slot></slot>
	</view>
</template>

<script>
import { isArray, isNumber, parseRpx } from "../../utils";

/**
 * row 行
 * @description 布局组件
 * @tutorial https://docs.cool-js.com/uni/components/layout/flex.html
 * @property {Object} type 类型
 * @property {Object} wrap 是否换行
 * @example <cl-col :span="12"></cl-col>
 */

export default {
	name: "cl-row",
	componentName: "ClRow",
	props: {
		type: String,
		wrap: Boolean,
		backgroundColor: String,
		border: String,
		gutter: [Number, String],
		justify: {
			type: String,
			default: "start"
		},
		align: {
			type: String,
			default: "top"
		},
		height: [String, Number],
		width: [String, Number],
		padding: [String, Number, Array],
		margin: [String, Number, Array],
		borderRadius: [String, Number]
	},
	computed: {
		margin2() {
			return this.margin ? parseRpx(this.margin) : `0 -${this.gutter / 2}rpx`;
		}
	},
	methods: {
		parseRpx
	}
};
</script>
