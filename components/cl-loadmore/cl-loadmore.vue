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

<script>
/**
 * loadmore 加载更多
 * @description 加载更多
 * @tutorial https://docs.cool-js.com/uni/components/operate/loadmore.html
 * @property {Object} loading 是否加载中
 * @property {Boolean} finish 是否加载完成
 * @property {Boolean} divider 是否显示分割符，默认true
 * @property {String} color 字体颜色，默认#666
 * @property {String} iconColor 图标颜色
 * @property {String} backgroundColor 背景颜色，默认#f7f7f7
 * @property {String} text 普通状态下显示内容，默认“上拉加载更多”
 * @property {String} loadingText 加载中显示内容，默认“加载中”
 * @property {String} loadingTheme 加载图标主题
 * @property {String} finishText 加载完成显示内容，默认“没有更多了”
 * @example <cl-loadmore :loading="true" />
 */

export default {
	name: "cl-loadmore",

	props: {
		// 是否加载中
		loading: Boolean,
		// 是否加载完成
		finish: Boolean,
		// 是否显示分割符
		divider: {
			type: Boolean,
			default: true,
		},
		// 字体颜色
		color: {
			type: String,
			default: "#666",
		},
		// 图标颜色
		iconColor: String,
		// 背景颜色
		backgroundColor: {
			type: String,
			default: "#f7f7f7",
		},
		// 普通状态下显示内容
		text: {
			type: String,
			default: "上拉加载更多",
		},
		// 加载中显示内容
		loadingText: {
			type: String,
			default: "加载中",
		},
		// 加载图标主题
		loadingTheme: String,
		// 加载完成显示内容
		finishText: {
			type: String,
			default: "没有更多了",
		},
	},

	computed: {
		message() {
			return this.finish ? this.finishText : this.loading ? this.loadingText : this.text;
		},
	},
};
</script>
