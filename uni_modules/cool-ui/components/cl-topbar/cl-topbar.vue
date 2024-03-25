<template>
	<view
		class="cl-topbar"
		:class="{
			'is-border': border,
			'is-fixed': fixed,
			'is-ios': isIos,
			'with-mp': withMp,
		}"
		:style="{
			backgroundColor,
			color,
			zIndex,
			paddingTop,
		}"
	>
		<view
			class="cl-topbar__content"
			:style="{
				color,
			}"
		>
			<slot>
				<view class="cl-topbar__text" @tap="tapTitle">
					<text class="cl-topbar__title" v-if="title">{{ title }}</text>
					<text class="cl-topbar__description" v-if="description">{{ description }}</text>
				</view>
			</slot>
		</view>

		<view class="cl-topbar__prepend">
			<view class="cl-topbar__icon" v-if="showBack" @tap="back">
				<text class="cl-icon-home" v-if="isFirst"></text>
				<text class="cl-icon-arrow-left" v-else></text>
			</view>

			<slot name="prepend"></slot>
		</view>

		<view class="cl-topbar__append">
			<slot name="append"></slot>
		</view>
	</view>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import { router } from "/@/cool";
import { isIos } from "/@/cool/utils";

const { statusBarHeight } = uni.getSystemInfoSync();

export default defineComponent({
	name: "cl-topbar",

	props: {
		// 标题
		title: String,
		// 描述
		description: String,
		// 是否显示下边框
		border: {
			type: Boolean,
			default: true,
		},
		// 是否固定
		fixed: Boolean,
		// 是否兼容小程序
		withMp: Boolean,
		// 是否显示返回按钮
		showBack: {
			type: Boolean,
			default: true,
		},
		// 背景色
		backgroundColor: {
			type: String,
			default: "#fff",
		},
		// 字体颜色
		color: {
			type: String,
			default: "#000",
		},
		// 返回页面路径
		backPath: String,
		// 层级
		zIndex: {
			type: Number,
			default: 99,
		},
	},

	setup(props, { emit }) {
		// 是否页面栈的第一个
		const isFirst = ref(false);

		// 顶部内边距
		const paddingTop = computed(() => {
			return props.fixed ? `${statusBarHeight}px` : 0;
		});

		// 返回
		function back() {
			if (isFirst.value) {
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

		// 点击标题
		function tapTitle(e: any) {
			emit("title", e);
		}

		onMounted(() => {
			const pages = getCurrentPages();
			isFirst.value = pages.length == 1;
		});

		return {
			isFirst,
			paddingTop,
			back,
			tapTitle,
			isIos,
		};
	},
});
</script>
