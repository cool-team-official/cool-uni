<template>
	<view
		class="cl-topbar"
		:class="[classList]"
		:style="{
			'padding-top': top,
			'background-color': backgroundColor,
			color,
		}"
	>
		<view
			class="cl-topbar__content"
			:style="{
				color,
			}"
		>
			<slot>
				<view class="cl-topbar__text" @tap="tapText">
					<text class="cl-topbar__title" v-if="title">{{ title }}</text>
					<text class="cl-topbar__description" v-if="description">{{ description }}</text>
				</view>
			</slot>
		</view>

		<view
			class="cl-topbar__prepend"
			:style="{
				top,
			}"
		>
			<view class="cl-topbar__icon" v-if="showBack" @tap="back">
				<text class="cl-icon-arrow-left"></text>
			</view>

			<slot name="prepend"></slot>
		</view>

		<view
			class="cl-topbar__append"
			:style="{
				top,
			}"
		>
			<slot name="append"></slot>
		</view>
	</view>
</template>

<script>
const { platform, statusBarHeight } = uni.getSystemInfoSync();

/**
 * topbar 顶部导航
 * @description 自定义顶部导航，弥补原生的不足
 * @tutorial https://docs.cool-js.com/uni/components/nav/topbar.html
 * @property {String} title 绑定值
 * @property {String} description 描述
 * @property {Boolean} border 是否带有下边框，默认true
 * @property {Boolean} showBack 是否显示返回按钮
 * @property {String} backgroundColor 背景颜色，默认#fff
 * @property {String} color 字体颜色，默认#000
 * @property {String} backPath 返回路径
 * @property {Boolean} fixed 是否固定布局在顶部
 * @property {Boolean} isTop 是否添加顶部安全区域
 * @example <cl-topbar title="COOL-UNI" />
 */

export default {
	name: "cl-topbar",

	props: {
		// 标题
		title: String,
		// 描述
		description: String,
		// 是否带有下边框
		border: {
			type: Boolean,
			default: true,
		},
		// 是否显示返回按钮
		showBack: {
			type: Boolean,
			default: true,
		},
		// 背景颜色
		backgroundColor: {
			type: String,
			default: "#fff",
		},
		// 字体颜色
		color: {
			type: String,
			default: "#000",
		},
		// 返回路径
		backPath: String,
		// 是否固定布局在顶部
		fixed: Boolean,
		// 是否添加顶部安全区域
		isTop: {
			type: Boolean,
			default: true,
		},
	},

	computed: {
		top() {
			return this.isTop
				? platform === "android"
					? `${statusBarHeight}px`
					: "env(safe-area-inset-top)"
				: 0;
		},

		classList() {
			let list = [];

			if (this.border) {
				list.push("is-border");
			}

			if (this.fixed) {
				list.push("is-fixed");
			}

			return list.join(" ");
		},
	},

	methods: {
		back() {
			let pages = getCurrentPages();

			if (pages.length == 1) {
				//  H5页面刷新或者分享页时，页面栈长度只有1。此时逐个验证返回的页面路径
				uni.reLaunch({
					url:
						this.backPath || this.$cl.homePage || this.$store.state.app.info.pages.home,
				});
			} else {
				uni.navigateBack({
					delta: 1,
				});
			}
		},

		tapText(e) {
			this.$emit("click", e);
		},
	},
};
</script>
