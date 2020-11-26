<template>
	<view
		class="cl-grid"
		:class="[
			{
				'cl-grid--border': border
			},
			`cl-grid__column-${column}`
		]"
		:style="{
			border
		}"
	>
		<slot></slot>
	</view>
</template>

<script>
/**
 * grid 宫格布局
 * @description 宫格布局，n * n 布局
 * @tutorial https://docs.cool-js.com/uni/components/layout/grid.html
 * @property {Number} column 列的数量，默认2
 * @property {Boolean} border 是否带边框
 * @example 见教程
 */

export default {
	name: "cl-grid",

	componentName: "ClGrid",

	props: {
		column: {
			type: Number,
			default: 2
		},
		border: Boolean
	}
};
</script>
