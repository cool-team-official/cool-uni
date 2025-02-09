<template>
	<view class="cl-scroller__wrap">
		<view
			class="cl-scroller__loading"
			:style="{
				transform,
				transition,
			}"
		>
			<slot name="loading" :text="text" :status="status" :move="touch.move">
				<cl-loading :size="35" v-if="status == 'loading'"></cl-loading>
				<cl-text :size="26" :margin="[0, 0, 0, 14]" :value="text"></cl-text>
			</slot>
		</view>

		<view
			class="cl-scroller"
			:style="{
				transform,
				transition,
			}"
			@touchmove.stop="onTouchMove"
			@touchstart="onTouchStart"
			@touchend="onTouchEnd"
		>
			<scroll-view
				class="cl-scroller__view"
				scroll-y
				:lower-top="bottom"
				:scroll-top="scrollTop2"
				:scroll-into-view="scrollIntoView"
				:scroll-with-animation="scrollWithAnimation"
				:enable-back-to-top="enableBackToTop"
				:show-scrollbar="showScrollbar"
				:enable-flex="enableFlex"
				@scroll="onScroll"
				@scrolltolower="up"
			>
				<slot></slot>
			</scroll-view>
		</view>

		<!-- 回到顶部 -->
		<view
			class="cl-scroller__back-top"
			:class="[
				{
					fadeIn: backTopButtonFadeIn,
				},
			]"
			@tap="backTop"
			v-if="showBackTopButton"
		>
			<cl-icon name="top" color="#666"></cl-icon>
			<text class="cl-scroller__back-top-text">{{ $t("顶部") }}</text>
		</view>
	</view>
</template>

<script lang="ts">
import { computed, defineComponent, getCurrentInstance, reactive, ref, watch } from "vue";
import { t } from "/@/locale";

export default defineComponent({
	props: {
		// 距离顶部多少px触发
		top: {
			type: Number,
			default: 80,
		},
		// 距离底部多少px触发
		bottom: {
			type: Number,
			default: 100,
		},
		// 正在刷新文案
		loadingText: {
			type: String,
			default: t("正在刷新"),
		},
		// 下拉刷新文案

		pullingText: {
			type: String,
			default: t("下拉刷新"),
		},
		// 释放刷新文案

		releaseText: {
			type: String,
			default: t("释放刷新"),
		},
		// 滚动条距离顶部位置
		scrollTop: Number,
		// 滚动到对应元素id
		scrollIntoView: String,

		// 滚动是否动画
		scrollWithAnimation: {
			type: Boolean,
			default: true,
		},
		// 点击回顶部
		enableBackToTop: Boolean,
		// 是否显示返回顶部按钮
		showBackTopButton: {
			type: Boolean,
			default: true,
		},
		// 是否显示滚动条
		showScrollbar: Boolean,
		// 开启 flex 布局
		enableFlex: Boolean,
		// 开启刷新
		refresherEnabled: {
			type: Boolean,
			default: true,
		},
	},

	emits: ["down", "up", "scroll"],

	setup(props, { emit }) {
		const { proxy }: any = getCurrentInstance();

		// 按下
		const touch = reactive({
			start: 0,
			move: 0,
		});

		// 滚动距离
		const scrollTop2 = ref(0);

		watch(
			() => props.scrollTop,
			(val) => {
				scrollTop2.value = val || 0;
			},
			{
				immediate: true,
			}
		);

		// 回到顶部
		const backTopButtonFadeIn = ref(false);

		// 状态
		const status = ref("end");

		// 过渡效果
		const transform = computed(() => {
			return touch.move ? `translate3d(0, ${touch.move}px, 0)` : "";
		});

		// 动画
		const transition = computed(() => {
			return ["end", "loading"].includes(status.value) ? "transform 0.3s" : "";
		});

		// 是否可释放
		const isReleasable = computed(() => touch.move >= props.top);

		//文案
		const text = computed(() => {
			switch (status.value) {
				case "pulling":
					return isReleasable.value ? props.releaseText : props.pullingText;
				case "loading":
					return props.loadingText;
				default:
					return props.pullingText;
			}
		});

		// 滚动开始
		function onTouchStart(e: TouchEvent) {
			if (status.value == "end" && props.refresherEnabled) {
				touch.start = e.changedTouches[0].clientY;
				status.value = "pulling";
			}
		}

		// 滚动中
		function onTouchMove(e: TouchEvent) {
			if (status.value == "pulling" && scrollTop2.value <= 10) {
				let offset = e.changedTouches[0].clientY - touch.start;

				if (offset <= 200) {
					touch.move = offset;
				}
			}
		}

		// 滚动结束
		function onTouchEnd() {
			if (isReleasable.value) {
				down();
			} else {
				end();
			}
		}

		// 滚动监听
		function onScroll(e: any) {
			backTopButtonFadeIn.value = e.detail.scrollTop >= 200;
			emit("scroll", e);
		}

		// 下拉刷新
		function down() {
			uni.createSelectorQuery()
				.in(proxy)
				.select(".cl-scroller__loading")
				.fields({ size: true }, (d: any) => {
					status.value = "loading";
					touch.move = d.height || 0;
					emit("down", end);
				})
				.exec();
		}

		// 上拉加载
		function up() {
			emit("up");
		}

		// 收起，结束
		function end() {
			status.value = "end";
			touch.move = 0;
		}

		// 滚动到
		function scrollTo(top: number) {
			scrollTop2.value = top;
		}

		// 回到顶部
		function backTop() {
			scrollTop2.value = Math.random();
		}

		return {
			touch,
			scrollTop2,
			backTopButtonFadeIn,
			status,
			transform,
			transition,
			isReleasable,
			text,
			onScroll,
			onTouchStart,
			onTouchMove,
			onTouchEnd,
			down,
			up,
			end,
			scrollTo,
			backTop,
		};
	},
});
</script>
