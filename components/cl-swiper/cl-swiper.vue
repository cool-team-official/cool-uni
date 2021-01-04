<template>
	<view
		class="cl-swiper"
		:class="[`cl-swiper--${type}`, `cl-swiper--dot-${dotType}`]"
		:style="{ height }"
		@tap="onTap"
	>
		<swiper
			:indicator-dots="indicatorDots"
			:indicator-color="indicatorColor2"
			:indicator-active-color="indicatorActiveColor2"
			:active-class="activeClass"
			:changing-class="changingClass"
			:autoplay="autoplay"
			:current="current"
			:interval="interval"
			:duration="duration"
			:circular="circular2"
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
					class="cl-swiper-item"
					:class="[
						{
							'is-active': current === index,
						},
					]"
				>
					<slot :item="item" :index="index">
						<image
							class="cl-swiper-item__image"
							:style="{
								'border-radius': radius,
							}"
							:mode="imageMode"
							:src="item"
						/>
					</slot>
				</view>
			</swiper-item>
		</swiper>

		<view class="cl-swiper__btn" v-if="arrow">
			<button class="cl-swiper__btn-prev" @tap="onPrev" v-if="isPrev">
				<i class="cl-icon-arrow-left"></i>
			</button>
			<button class="cl-swiper__btn-next" @tap="onNext" v-if="isNext">
				<i class="cl-icon-arrow-right"></i>
			</button>
		</view>
	</view>
</template>

<script>
/**
 * swiper 滑块视图,轮播图
 * @description 该组件基于官方的 swiper, 参数与官方一致, 同时添加新的支持
 * @tutorial https://docs.cool-js.com/uni/components/view/swiper.html
 * @property {Number} value 绑定值
 * @property {String} type 类型 '' | chain | card
 * @property {Boolean} arrow 是否显示切换箭头
 * @property {String} imageMode 图片裁剪, 缩放模式
 * @property {String} height 高度，默认300rpx
 * @property {String} radius 圆角，默认10rpx
 * @property {Array} margin 外间距
 * @property {String} dotType 指示器类型 round | circle | square
 * @event {Function} change 绑定值改变时触发
 * @example <cl-swiper v-model="active" :list="list"></cl-slider>
 */

export default {
	name: "cl-swiper",

	props: {
		// 绑定值
		value: Number,
		// 类型 '' | chain | card
		type: String,
		// 是否显示切换箭头
		arrow: Boolean,
		// 数据列表
		list: Array,
		// 图片裁剪, 缩放模式
		imageMode: {
			type: String,
			default: "aspectFill",
		},
		// 高度
		height: {
			type: String,
			default: "300rpx",
		},
		// 圆角
		radius: {
			type: String,
			default: "10rpx",
		},
		// 外间距
		margin: {
			type: Array,
			default: () => [],
		},
		// 是否显示指示器
		indicatorDots: Boolean,
		// 指示器颜色
		indicatorColor: {
			type: String,
			default: "rgba(0, 0, 0, .3)",
		},
		// 指示器选中颜色
		indicatorActiveColor: {
			type: String,
			default: "#000000",
		},
		// 指示器类型 round | circle | square
		dotType: {
			type: String,
			default: "round",
			validator: (val) => {
				return ["round", "circle", "square"].indexOf(val) !== -1;
			},
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

	data() {
		return {
			current: 0,
		};
	},

	watch: {
		value: {
			immediate: true,
			handler(val) {
				this.current = val || 0;
			},
		},
		current(val) {
			this.$emit("input", val);
			this.$emit("change", val);
		},
	},

	computed: {
		previousMargin() {
			let [a, b, c] = this.margin;

			switch (this.type) {
				case "chain":
					switch (this.current) {
						case 0:
							return a || "0";
						case this.list.length - 1:
							return c || "120rpx";
						default:
							return b || "70rpx";
					}
				case "card":
					return a || "80rpx";
				default:
					return a || "0";
			}
		},
		nextMargin() {
			let [a, b, c] = this.margin;

			switch (this.type) {
				case "chain":
					switch (this.current) {
						case 0:
							return c || "120rpx";
						case this.list.length - 1:
							return a || "0";
						default:
							return b || "70rpx";
					}
				case "card":
					return b || "80rpx";
				default:
					return b || "0";
			}
		},
		circular2() {
			switch (this.type) {
				case "card":
					return true;
				default:
					return this.circular;
			}
		},
		indicatorColor2() {
			return this.dotType ? "" : this.indicatorColor;
		},
		indicatorActiveColor2() {
			return this.dotType ? "" : this.indicatorActiveColor;
		},
		isPrev() {
			return this.current > 0;
		},
		isNext() {
			return this.current < this.list.length - 1;
		},
	},

	methods: {
		onChange(e) {
			this.current = e.detail.current;
		},

		onTransition(e) {
			this.$emit("transition", e);
		},

		onAnimationfinish(e) {
			this.$emit("animationfinish", e);
		},

		onPrev() {
			this.current -= this.isPrev ? 1 : 0;
		},

		onNext() {
			this.current += this.isNext ? 1 : 0;
		},

		onTap() {
			this.$emit("click", this.current);
			this.$emit("tap", this.current);
		},
	},
};
</script>
