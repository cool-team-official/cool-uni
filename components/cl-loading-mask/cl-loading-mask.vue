<template>
	<view class="cl-loading-mask__wrap">
		<view
			class="cl-loading-mask"
			:class="[
				{
					'cl-loading-mask--fixed': fullscreen,
					'is-show': loading
				}
			]"
			:style="{
				background,
				color
			}"
		>
			<view class="cl-loading-mask__content" v-if="loading">
				<cl-loading :color="color"></cl-loading>
				<text v-if="text" class="cl-loading-mask__text">{{ text }}</text>
			</view>
		</view>

		<slot></slot>
	</view>
</template>

<script>
import { color } from "../../theme";

/**
 * loading-mask 加载区域
 * @description 加载区域
 * @tutorial https://docs.cool-js.com/uni/components/feedback/loading.html
 * @property {String} text 加载时文本，默认不显示
 * @property {Boolean} loading 是否加载种
 * @property {Boolean} fullscreen 是否全屏显示
 * @property {String} color 加载图标颜色
 * @property {String} background 背景颜色，默认rgba(255,255,255,0.7)
 * @example <cl-loading-mask :loading="true"></cl-loading-mask>
 */

export default {
	name: "cl-loading-mask",

	props: {
		text: String,
		loading: Boolean,
		fullscreen: Boolean,
		color: {
			type: String,
			default: color.primary
		},
		background: {
			type: String,
			default: "rgba(255, 255, 255, 0.7)"
		}
	}
};
</script>
