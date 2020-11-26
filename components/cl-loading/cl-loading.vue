<template>
	<view class="cl-loading" :style="{ height: size + 'px', width: size + 'px' }">
		<!-- #ifndef APP -->
		<view class="cl-loading__mp" :style="{ color: color2 }"> </view>
		<!-- #endif -->

		<!-- #ifdef APP -->
		<view class="cl-loading__app" :style="{ color: color2 }"> </view>
		<!-- #endif -->
	</view>
</template>

<script>
import { color } from "../../theme";

/**
 * loading 加载图标
 * @description 加载图标
 * @tutorial https://docs.cool-js.com/uni/components/feedback/loading.html
 * @property {String} color 图标颜色
 * @property {Number} size 图标大小
 * @example <cl-loading></cl-loading>
 */

export default {
	name: "cl-loading",

	props: {
		color: String,
		size: {
			type: Number,
			default: 25
		}
	},

	computed: {
		color2() {
			return this.color || color.primary;
		}
	}
};
</script>
