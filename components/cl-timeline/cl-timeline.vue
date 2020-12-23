<template>
	<view class="cl-timeline">
		<slot></slot>
	</view>
</template>

<script>
/**
 * timeline 时间线
 * @description 时间线
 * @tutorial https://docs.cool-js.com/uni/components/view/timeline.html
 * @property {Number} timestampWidth 左侧时间宽度，默认140
 * @example 见教程
 */

export default {
	name: "cl-timeline",
	componentName: "ClTimeline",
	props: {
		// 左侧时间宽度
		timestampWidth: {
			type: Number,
			default: 150,
		},
	},
};
</script>
