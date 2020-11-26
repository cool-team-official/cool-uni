<template>
	<view class="cl-divider">
		<view class="cl-divider__line" :style="{ background: lineColor, width }"></view>

		<view
			class="cl-divider__text"
			:style="{
				backgroundColor
			}"
		>
			<slot></slot>
		</view>
	</view>
</template>

<script>
import { isArray } from "../../utils";

/**
 * divider 分隔符
 * @description 分割符组件，区隔内容的分割线
 * @tutorial https://docs.cool-js.com/uni/components/basic/divider.html
 * @property {String} backgroundColor 背景颜色，默认#fff
 * @property {String, Array} color 线条颜色，Array 下当渐变色处理
 * @property {String} width 线条宽度
 * @example <cl-divider>默认</cl-divider>
 */

export default {
	name: "cl-divider",

	props: {
		backgroundColor: {
			type: String,
			default: "#fff"
		},

		color: {
			type: [String, Array],
			default: "#dcdfe6"
		},

		width: {
			type: String,
			default: "100%"
		}
	},

	computed: {
		lineColor() {
			if (isArray(this.color)) {
				const [a, b] = this.color || [];
				return `linear-gradient(to right, ${a}, ${b}, ${b}, ${a})`;
			} else {
				return this.color;
			}
		}
	}
};
</script>
