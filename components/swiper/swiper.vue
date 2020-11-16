<template>
	<view
		class="cl-swiper"
		:class="[`cl-swiper--${type}`, `cl-swiper--dot-${dotType}`]"
		:style="{ height }"
	>
		<swiper
			:indicator-dots="indicatorDots"
			:indicator-color="indicatorColor2"
			:indicator-active-color="indicatorActiveColor2"
			:active-class="activeClass"
			:changing-class="changingClass"
			:autoplay="autoplay"
			:current="current"
			:current-item-id="currentItemId"
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
export default {
	props: {
		value: Number,
		type: String,
		arrow: Boolean,
		list: Array,
		imageMode: {
			type: String,
			default: "aspectFill",
		},
		height: {
			type: String,
			default: "300rpx",
		},
		radius: {
			type: String,
			default: "10rpx",
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
	},
};
</script>
