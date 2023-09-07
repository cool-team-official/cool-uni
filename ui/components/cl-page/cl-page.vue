<template>
	<view
		class="cl-page"
		:class="[`theme-${app.theme.name}`]"
		:style="{
			padding: parseRpx(padding),
		}"
	>
		<!-- 遮罩层 -->
		<cl-loading-mask fullscreen :loading="loader.loading" :text="loader.text"></cl-loading-mask>

		<!-- 提示 -->
		<cl-toast :ref="setRefs('toast')"></cl-toast>

		<!-- 确认框 -->
		<cl-confirm :ref="setRefs('confirm')"></cl-confirm>

		<!-- 状态栏 -->
		<!-- #ifndef MP-ALIPAY -->
		<cl-status-bar v-if="statusBar" :background-color="statusBarBackground" />
		<!-- #endif -->

		<!-- 内容插槽 -->
		<view class="cl-page__container" :style="{ height }">
			<slot></slot>
		</view>

		<!-- 底部安全区域 -->
		<view class="safe-area-bottom"></view>
	</view>

	<!-- 背景色 -->
	<view
		class="cl-page__bg"
		:style="{
			background,
		}"
	></view>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, getCurrentInstance, type PropType } from "vue";
import { useApp, useCool, useGlobal } from "/@/cool";
import { parseRpx } from "/@/cool/utils";

export default defineComponent({
	name: "cl-page",

	props: {
		fullscreen: Boolean,
		padding: {
			type: [Number, String],
			default: 0,
		},
		statusBar: {
			type: Boolean,
			default: true,
		},
		statusBarBackground: String,
		backgroundColor: String,
	},

	setup(props) {
		const { refs, setRefs, router } = useCool();
		const app = useApp();
		const global = useGlobal();
		const info = router.info();
		const { statusBarHeight = 0 } = uni.getSystemInfoSync();
		const { proxy }: any = getCurrentInstance();

		// 是否显示导航栏
		const statusBar = router.info()?.isCustomNavbar ? props.statusBar : false;

		// 内容高度
		const height = computed(() => {
			return props.fullscreen ? `calc(100% - ${statusBarHeight}px)` : "auto";
		});

		// 背景色
		const background = computed(() => {
			return (
				props.backgroundColor ||
				router.info()?.style?.backgroundColor ||
				router.globalStyle.backgroundColor ||
				"#ffffff"
			);
		});

		// 加载器
		const loader = reactive({
			loading: false,
			text: "加载中",
		});

		// 显示加载框
		function showLoading(text: string) {
			loader.loading = true;
			loader.text = text;
		}

		// 隐藏加载框
		function hideLoading() {
			loader.loading = false;
		}

		// 提示框
		function showToast(options: ClToast.Options) {
			refs.toast?.open(options);
		}

		// 确认框
		function showConfirm(options: ClConfirm.Options) {
			refs.confirm?.open(options);
		}

		// 提示框
		function showTips(message: string, callback?: () => void) {
			refs.confirm?.open({
				title: "提示",
				message,
				showCancelButton: false,
				callback,
			} as ClConfirm.Options);
		}

		// 追加方法
		if (router.path) {
			global.set(`cl-page__${router.path}`, {
				showLoading,
				hideLoading,
				showToast,
				showConfirm,
				showTips,
			});
		}

		// 滚动事件
		proxy.$root.scrollTo = (top: number) => {
			// 减去自定义导航栏高度
			top -= info?.isCustomNavbar ? statusBarHeight : 0;

			// 减去间距
			if (props.padding) {
				const [t] = parseRpx(props.padding).split(" ");
				top -= uni.upx2px(parseInt(t));
			}

			uni.createSelectorQuery()
				.in(proxy)
				.select(`.cl-page`)
				.boundingClientRect((a) => {
					uni.createSelectorQuery()
						.in(proxy)
						.select(`.safe-area-bottom`)
						.boundingClientRect((b) => {
							const scrollTop = top + (a?.height || 0) - (b?.bottom || 0);

							uni.pageScrollTo({
								scrollTop,
								duration: 100,
							});
						})
						.exec();
				})
				.exec();
		};

		return {
			app,
			height,
			background,
			refs,
			setRefs,
			loader,
			parseRpx,
			statusBar,
		};
	},
});
</script>
