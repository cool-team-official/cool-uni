<template>
	<view class="cl-loading-mask__wrap">
		<view
			class="cl-loading-mask"
			:class="[
				{
					'is-fullscreen': fullscreen,
					'is-show': loading,
				},
			]"
			:style="{
				background: modal ? background : 'transparent',
				color,
			}"
		>
			<view class="cl-loading-mask__content" v-show="loading">
				<cl-loading :color="color" :loading-theme="loadingTheme"></cl-loading>
				<text v-if="text" class="cl-loading-mask__text">{{ text }}</text>
			</view>
		</view>

		<slot></slot>
	</view>
</template>

<script lang="ts">
/**
 * @description 加载区域
 * @property {String} text 加载时文本，默认不显示
 * @property {Boolean} loading 是否加载中
 * @property {String} loadingTheme 加载图标主题
 * @property {Boolean} fullscreen 是否全屏显示
 * @property {String} color 加载图标颜色
 * @property {String} background 背景颜色，默认rgba(255,255,255,0.7)
 */

import { defineComponent } from "vue";

export default defineComponent({
	name: "cl-loading-mask",

	props: {
		text: String,
		loading: Boolean,
		loadingTheme: String,
		fullscreen: Boolean,
		color: String,
		modal: {
			type: Boolean,
			default: true,
		},
		background: {
			type: String,
			default: "rgba(255, 255, 255, 0.7)",
		},
	},
});
</script>
