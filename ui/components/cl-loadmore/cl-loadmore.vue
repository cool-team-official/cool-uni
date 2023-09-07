<template>
	<view class="cl-loadmore__wrap">
		<cl-divider
			:background-color="backgroundColor"
			:color="color"
			:width="divider ? '400rpx' : '0rpx'"
		>
			<view class="cl-loadmore">
				<cl-loading
					:color="iconColor"
					:theme="loadingTheme"
					:size="20"
					v-if="!finish && loading"
				></cl-loading>
				<text
					class="cl-loadmore__text"
					:style="{
						color,
					}"
					v-if="message"
					>{{ message }}</text
				>
			</view>
		</cl-divider>
	</view>
</template>

<script lang="ts">
/**
 * @description 加载更多
 * @property {Object} loading 是否加载中
 * @property {Boolean} finish 是否加载完成
 * @property {Boolean} divider 是否显示分割符，默认true
 * @property {String} color 字体颜色，默认#666
 * @property {String} iconColor 图标颜色
 * @property {String} backgroundColor 背景颜色，默认f6f7fa
 * @property {String} text 普通状态下显示内容，默认“上拉加载更多”
 * @property {String} loadingText 加载中显示内容，默认“加载中”
 * @property {String} loadingTheme 加载图标主题
 * @property {String} finishText 加载完成显示内容，默认“没有更多了”
 */

import { computed, defineComponent, type PropType } from "vue";

export default defineComponent({
	name: "cl-loadmore",

	props: {
		loading: Boolean,
		finish: Boolean,
		divider: {
			type: Boolean,
			default: true,
		},
		color: {
			type: String,
			default: "#666",
		},
		iconColor: String,
		backgroundColor: {
			type: String,
			default: "#f6f7fa",
		},
		text: {
			type: String,
			default: "上拉加载更多",
		},
		loadingText: {
			type: String,
			default: "加载中",
		},
		loadingTheme: String as PropType<"default" | "spin">,
		finishText: {
			type: String,
			default: "没有更多了",
		},
	},

	setup(props) {
		const message = computed(() => {
			return props.finish ? props.finishText : props.loading ? props.loadingText : props.text;
		});

		return {
			message,
		};
	},
});
</script>
