<template>
	<view :class="['cl-avatar', isShape]" :style="{ height, width }">
		<slot v-if="$slots.default || $slots.$default"> </slot>

		<cl-image
			v-else
			:src="src"
			:size="size"
			:mode="mode"
			@error="handleError"
			@load="handleLoad"
		>
			<view class="cl-image__placeholder" slot="placeholder">
				<text class="cl-icon-my" :style="{ fontSize }"></text>
			</view>
		</cl-image>
	</view>
</template>

<script>
/**
 * avatar 头像
 * @description 头像
 * @tutorial https://docs.cool-js.com/uni/components/view/avatar.html
 * @property {String} src 图片链接
 * @property {Number} size 头像大小，默认80
 * @property {String} shape 头像的形状，默认circle
 * @property {String} mode 裁剪,缩放模式
 * @example <cl-avatar src="http://" />
 */

export default {
	name: "cl-avatar",

	props: {
		src: String,
		lazyLoad: Boolean,
		size: {
			type: Number,
			default: 80,
		},
		shape: {
			type: String,
			default: "circle",
		},
		mode: {
			type: String,
			default: "scaleToFill",
		},
	},

	computed: {
		isShape() {
			return `cl-avatar--${this.shape}`;
		},

		height() {
			return this.size + "rpx";
		},

		width() {
			return this.size + "rpx";
		},

		fontSize() {
			return this.size / 1.7 + "rpx";
		},
	},

	methods: {
		handleLoad(e) {
			this.$emit("error", e);
		},

		handleError(e) {
			this.$emit("load", e);
		},
	},
};
</script>
