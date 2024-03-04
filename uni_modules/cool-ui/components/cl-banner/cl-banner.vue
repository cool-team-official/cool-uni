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
					:class="[
						{
							'is-active': current === index,
						},
					]"
				>
					<slot :item="item" :index="index">
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
/**
 * @description 该组件基于官方的 swiper, 参数与官方一致, 同时添加新的支持
 * @property {Number} value 绑定值
 * @property {String} type 类型 '' | chain | card
 * @property {Boolean} arrow 是否显示切换箭头
 * @property {String} imageMode 图片裁剪, 缩放模式
 * @property {String} height 高度，默认300rpx
 * @property {String} radius 圆角，默认10rpx
 * @property {Array} margin 外间距
 * @property {String} dotType 指示器类型 round | circle | square
 * @event {Function} change 绑定值改变时触发
 */

import { computed, defineComponent, ref, watch } from "vue";
import type { PropType } from "vue";
import { parseRpx } from "/@/cool/utils";

export default defineComponent({
	name: "cl-banner",

	props: {
		// 绑定值
		modelValue: Number,
		type: String as PropType<"chain" | "card" | "">,
		arrow: Boolean,
		list: {
			type: Array as PropType<{ url: string }[]>,
			default: () => [],
		},
		imageMode: {
			type: String,
			default: "aspectFill",
		},
		height: {
			type: [String, Number],
			default: 300,
		},
		radius: {
			type: [String, Number],
			default: 10,
		},
		margin: {
			type: Array,
			default: () => [],
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
		circular: Boolean,
		vertical: Boolean,
		acceleration: Boolean,
		disableProgrammaticAnimation: Boolean,
		displayMultipleItems: {
			type: Number,
			default: 1,
		},
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
			},
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
			props.dotType ? "" : props.indicatorActiveColor,
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
