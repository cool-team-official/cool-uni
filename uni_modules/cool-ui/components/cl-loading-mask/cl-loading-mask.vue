<template>
	<view class="cl-loading-mask__wrap">
		<view
			class="cl-loading-mask"
			:class="[
				{
					'is-fullscreen': fullscreen,
					'is-show': loading,
					'is-border': border,
				},
			]"
			:style="{
				background: modal && !border ? background : 'transparent',
				color,
			}"
		>
			<view class="cl-loading-mask__content" v-show="loading">
				<view class="cl-loading-mask__border">
					<cl-loading
						:theme="loadingTheme"
						:color="border ? '#ffffff' : color"
						:size="60"
					/>
					<text v-if="text" class="cl-loading-mask__text">{{ text }}</text>
				</view>
			</view>
		</view>

		<slot></slot>
	</view>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	name: "cl-loading-mask",

	props: {
		// 加载时文本
		text: String,
		// 是否加载中
		loading: Boolean,
		// 加载图标主题
		loadingTheme: String,
		// 是否全屏显示
		fullscreen: Boolean,
		// 加载图标颜色
		color: String,
		// 是否显示静态库
		modal: {
			type: Boolean,
			default: true,
		},
		// 是否带边框
		border: Boolean,
		// 背景颜色
		background: {
			type: String,
			default: "rgba(255, 255, 255, 0.7)",
		},
	},
});
</script>
