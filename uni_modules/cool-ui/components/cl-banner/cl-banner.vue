<template>
	<view
		class="cl-banner"
		:class="[`cl-banner--${type}`, `cl-banner--dot-${dotType}`]"
		:style="{ height: parseRpx(height) }"
		@tap="onTap"
	>
		<swiper
			:indicator-dots="indicatorDots"
			:indicator-color="indicatorColor"
			:indicator-active-color="indicatorActiveColor"
			:active-class="activeClass"
			:changing-class="changingClass"
			:autoplay="autoplay"
			:current="current"
			:interval="interval"
			:duration="duration"
			:circular="circular"
			:vertical="vertical"
			:previous-margin="previousMargin"
			:next-margin="nextMargin"
			:acceleration="acceleration"
			:disable-programmatic-animation="disableProgrammaticAnimation"
			:display-multiple-items="displayMultipleItems"
			:skip-hidden-item-layout="skipHiddenItemLayout"
			:disable-touch="disableTouch"
			:easing-function="easingFunction"
			@change="onChange"
			@transition="onTransition"
			@animationfinish="onAnimationfinish"
		>
			<swiper-item v-for="(item, index) in list" :key="index">
				<view
					class="cl-banner-item"
					:style="{
						transform: type == 'card' ? transform : '',
					}"
					:class="[
						{
							'is-active': current === index,
						},
					]"
				>
					<slot name="item" :item="item" :index="index">
						<image
							class="cl-banner-item__image"
							:style="{
								'border-radius': parseRpx(radius),
							}"
							:mode="imageMode"
							:src="item.url"
						/>
					</slot>
				</view>
			</swiper-item>
		</swiper>

		<view class="cl-banner__btn" v-if="arrow">
			<button class="cl-banner__btn-prev" @tap="onPrev" v-if="isPrev">
				<i class="cl-icon-arrow-left"></i>
			</button>
			<button class="cl-banner__btn-next" @tap="onNext" v-if="isNext">
				<i class="cl-icon-arrow-right"></i>
			</button>
		</view>
	</view>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from "vue";
import type { PropType } from "vue";
import { parseRpx } from "/@/cool/utils";

export default defineComponent({
	name: "cl-banner",

	props: {
		// 绑定值
		modelValue: Number,
		// 类型
		type: String as PropType<"chain" | "card" | "">,
		// 是否显示切换箭头
		arrow: Boolean,
		list: {
			type: Array as PropType<{ url: string }[]>,
			default: () => [],
		},
		// 图片裁剪, 缩放模式
		imageMode: {
			type: String,
			default: "aspectFill",
		},
		// 高
		height: {
			type: [String, Number],
			default: 300,
		},
		// 圆角
		radius: {
			type: [String, Number],
		},
		// 间距
		margin: {
			type: Array,
			default: () => [],
		},
		transform: {
			type: String,
			default: "scale(0.9, 0.85)",
		},
		indicatorDots: Boolean,
		indicatorColor: {
			type: String,
			default: "rgba(0, 0, 0, .3)",
		},
		indicatorActiveColor: {
			type: String,
			default: "#000000",
		},
		// 指示器类型
		dotType: {
			type: String as PropType<"round" | "circle" | "square">,
			default: "round",
		},
		activeClass: String,
		changingClass: String,
		autoplay: Boolean,
		currentItemId: String,
		interval: {
			type: Number,
			default: 5000,
		},
		duration: {
			type: Number,
			default: 500,
		},
		circular: {
			type: Boolean,
			default: null,
		},
		vertical: Boolean,
		acceleration: Boolean,
		disableProgrammaticAnimation: Boolean,
		displayMultipleItems: Number,
		skipHiddenItemLayout: Boolean,
		disableTouch: Boolean,
		touchable: {
			type: Boolean,
			default: true,
		},
		easingFunction: {
			type: String,
			default: "default",
		},
	},

	emits: ["update:modelValue", "change", "select", "transition", "animationfinish"],

	setup(props, { emit }) {
		const current = ref(0);

		watch(
			() => props.modelValue,
			(val: any) => {
				current.value = val || 0;
			},
			{
				immediate: true,
			}
		);

		// 上一个间距
		const previousMargin = computed(() => {
			let [a, b, c] = props.margin;

			switch (props.type) {
				case "chain":
					switch (current.value) {
						case 0:
							return a || "0";
						case (props.list || []).length - 1:
							return c || "120rpx";
						default:
							return b || "70rpx";
					}
				case "card":
					return a || "80rpx";
				default:
					return a || "0";
			}
		});

		// 下一个间距
		const nextMargin = computed(() => {
			let [a, b, c] = props.margin;

			switch (props.type) {
				case "chain":
					switch (current.value) {
						case 0:
							return c || "120rpx";
						case (props.list || []).length - 1:
							return a || "0";
						default:
							return b || "70rpx";
					}
				case "card":
					return b || "80rpx";
				default:
					return b || "0";
			}
		});

		// 是否采用衔接滑动
		const circular = computed(() => {
			if (props.circular !== null) {
				return props.circular;
			}

			switch (props.type) {
				case "card":
					return true;
				default:
					return props.circular;
			}
		});

		// 指示点颜色
		const indicatorColor = computed(() => (props.dotType ? "" : props.indicatorColor));

		// 当前选中的指示点颜色
		const indicatorActiveColor = computed(() =>
			props.dotType ? "" : props.indicatorActiveColor
		);

		// 是否有上一个
		const isPrev = computed(() => circular.value || current.value > 0);

		// 是否有下一个
		const isNext = computed(() => circular.value || current.value < props.list.length - 1);

		// 监听值变化
		function onChange(e: any) {
			current.value = e.detail.current;
			emit("update:modelValue", current.value);
			emit("change", current.value);
		}

		// swiper-item 的位置发生改变时会触发
		function onTransition(e: any) {
			emit("transition", e);
		}

		// 动画结束时会触发
		function onAnimationfinish(e: any) {
			emit("animationfinish", e);
		}

		// 上一个
		function onPrev() {
			current.value -= isPrev.value ? 1 : 0;
		}

		// 下一个
		function onNext() {
			current.value += isNext.value ? 1 : 0;
		}

		// 点击，返回序号
		function onTap() {
			emit("select", current.value);
		}

		return {
			current,
			isPrev,
			isNext,
			circular,
			previousMargin,
			nextMargin,
			indicatorColor,
			indicatorActiveColor,
			onChange,
			onTransition,
			onAnimationfinish,
			onPrev,
			onNext,
			onTap,
			parseRpx,
		};
	},
});
</script>
