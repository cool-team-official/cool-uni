<template>
	<view
		class="cl-page"
		:class="[
			`theme-${app.theme.name}`,
			{
				'is-fullscreen': fullscreen,
			},
		]"
		:style="{
			padding: parseRpx(padding),
			height,
		}"
	>
		<!-- 加载框 -->
		<cl-loading-mask
			fullscreen
			:loading="loader.loading"
			:text="loader.text"
			:border="loader.border"
		/>

		<!-- 提示 -->
		<cl-toast :ref="setRefs('toast')" />

		<!-- 确认框 -->
		<cl-confirm :ref="setRefs('confirm')" />

		<!-- 状态栏 -->
		<!-- #ifndef MP-ALIPAY -->
		<cl-status-bar v-if="statusBar" :background-color="statusBarBackground" />
		<!-- #endif -->

		<!-- 内容插槽 -->
		<slot></slot>

		<!-- 底部安全区域 -->
		<view class="safe-area-bottom" v-if="!fullscreen"></view>
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
import { computed, defineComponent, reactive, getCurrentInstance, onMounted } from "vue";
import { useApp, useCool } from "/@/cool";
import { parseRpx } from "/@/cool/utils";
import { isString } from "lodash-es";

export default defineComponent({
	name: "cl-page",

	props: {
		// 是否全屏显示，高度100%
		fullscreen: Boolean,
		// 內间距
		padding: {
			type: [Number, String],
			default: 0,
		},
		// 是否显示状态栏
		statusBar: {
			type: Boolean,
			default: true,
		},
		// 状态栏背景色
		statusBarBackground: String,
		// 页面背景色
		backgroundColor: String,
	},

	setup(props) {
		const { refs, setRefs, router } = useCool();
		const app = useApp();
		const info = router.info();
		const {
			statusBarHeight = 0,
			screenHeight,
			windowHeight,
			safeAreaInsets,
		} = uni.getSystemInfoSync();

		const { proxy }: any = getCurrentInstance();

		// 是否显示导航栏
		const statusBar = info?.isCustomNavbar ? props.statusBar : false;

		// 背景色
		const background = computed(() => {
			return (
				props.backgroundColor ||
				router.info()?.style?.backgroundColor ||
				router.globalStyle.backgroundColor ||
				"#ffffff"
			);
		});

		// 全屏高
		const height = computed(() => {
			if (!props.fullscreen) {
				return "auto";
			}

			let h = 0;

			// #ifdef H5
			h = windowHeight;
			// #endif

			// #ifndef H5
			h = screenHeight - statusBarHeight;

			if (!info?.isCustomNavbar) {
				h -= 44;
			}
			// #endif

			return h - (safeAreaInsets?.bottom || 0) + "px";
		});

		// 加载框配置
		const loader = reactive({
			loading: false,
			border: false,
			text: "加载中",
		});

		// 显示加载框
		function showLoading(options?: ClLoading.MaskOptions) {
			loader.loading = true;

			if (isString(options)) {
				loader.text = options;
			} else {
				Object.assign(loader, options);
			}
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

		// 扩展
		const page = router.currentPage();

		if (page) {
			page["cl-page"] = {
				loaded: false,
				showLoading,
				hideLoading,
				showToast,
				showConfirm,
				showTips,
			};

			onMounted(() => {
				page["cl-page"].loaded = true;
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
				.select(".cl-page")
				.boundingClientRect((a) => {
					uni.createSelectorQuery()
						.in(proxy)
						.select(".safe-area-bottom")
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
			background,
			height,
			refs,
			setRefs,
			loader,
			parseRpx,
			statusBar,
		};
	},
});
</script>
