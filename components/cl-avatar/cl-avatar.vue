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
			<template #placeholder>
				<view class="cl-image__placeholder">
					<text class="cl-icon-my" :style="{ fontSize }"></text>
				</view>
			</template>

			<template #error v-if="isError">
				<view class="cl-image__error">
					<slot name="error"></slot>
				</view>
			</template>
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
 * @property {String} mode 裁剪，缩放模式
 * @example <cl-avatar src="http://" />
 */

export default {
	name: "cl-avatar",

	props: {
		// 图片链接
		src: String,
		lazyLoad: Boolean,
		// 头像大小
		size: {
			type: Number,
			default: 80,
		},
		// 头像的形状 circle | square
		shape: {
			type: String,
			default: "circle",
		},
		// 裁剪，缩放模式
		mode: {
			type: String,
			default: "scaleToFill",
		},
	},

	data() {
		return {
			isError: false,
		};
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
			this.isError = false;
			this.$emit("error", e);
		},

		handleError(e) {
			this.isError = true;
			this.$emit("load", e);
		},
	},
};
</script>
