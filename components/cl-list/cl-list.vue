<template>
	<view class="cl-list">
		<slot></slot>
	</view>
</template>

<script>
/**
 * list 列表
 * @description 列表
 * @tutorial https://docs.cool-js.com/uni/components/layout/list.html
 * @property {String} justify 水平布局方式
 * @property {Boolean} disabled 是否禁用
 * @property {Boolean} border 是否带有下边框，默认true
 * @example 见教程
 */

export default {
	name: "cl-list",
	componentName: "ClList",
	props: {
		// 水平布局方式
		justify: String,
		// 是否禁用
		disabled: Boolean,
		// 是否带有下边框
		border: {
			type: Boolean,
			default: true
		}
	}
};
</script>
