<template>
	<view
		class="cl-topbar"
		:class="[classList]"
		:style="{
			'padding-top': top,
			'background-color': backgroundColor,
			color,
			zIndex,
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

<script lang="ts">
import { computed, defineComponent } from "vue";
import { router } from "/@/cool";

const { platform, statusBarHeight } = uni.getSystemInfoSync();

/**
 * @description 自定义顶部导航，弥补原生的不足
 * @property {String} title 绑定值
 * @property {String} description 描述
 * @property {Boolean} border 是否带有下边框，默认true
 * @property {Boolean} showBack 是否显示返回按钮
 * @property {String} backgroundColor 背景颜色，默认#fff
 * @property {String} color 字体颜色，默认#000
 * @property {String} backPath 返回路径
 * @property {Boolean} fixed 是否固定布局在顶部
 * @property {Boolean} isTop 是否添加顶部安全区域及状态栏
 * @property {Boolean} sticky 是否吸顶
 * @property {Number} zIndex 层级
 */

export default defineComponent({
	name: "cl-topbar",

	props: {
		title: String,
		description: String,
		border: {
			type: Boolean,
			default: true,
		},
		showBack: {
			type: Boolean,
			default: true,
		},
		backgroundColor: {
			type: String,
			default: "#fff",
		},
		color: {
			type: String,
			default: "#000",
		},
		backPath: String,
		fixed: {
			type: Boolean,
			default: null,
		},
		isTop: {
			type: Boolean,
			default: true,
		},
		sticky: {
			type: Boolean,
			default: null,
		},
		zIndex: {
			type: Number,
			default: 9,
		},
	},

	setup(props, { emit }) {
		// 距离顶部距离
		const top = computed(() => {
			return props.isTop
				? platform === "android"
					? `${statusBarHeight}px`
					: "env(safe-area-inset-top)"
				: 0;
		});

		// 样式
		const classList = computed(() => {
			let list = [];

			if (props.border) {
				list.push("is-border");
			}

			if (props.fixed) {
				list.push("is-fixed");
			}

			if (props.sticky) {
				list.push("cl-sticky");
			}

			return list.join(" ");
		});

		// 返回
		function back() {
			const pages = getCurrentPages();

			if (pages.length == 1) {
				//  H5页面刷新或者分享页时，页面栈长度只有1。此时逐个验证返回的页面路径
				if (props.backPath) {
					router.push({
						path: props.backPath,
						mode: "reLaunch",
					});
				} else {
					router.home();
				}
			} else {
				router.back();
			}
		}

		// 点击
		function tapText(e: any) {
			emit("click", e);
			emit("tap", e);
		}

		return {
			top,
			classList,
			back,
			tapText,
		};
	},
});
</script>
