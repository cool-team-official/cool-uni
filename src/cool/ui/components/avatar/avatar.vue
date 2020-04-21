<template>
	<view :class="['cl-avatar', isShape]" :style="{ height, width }">
		<slot v-if="!src">
			<text class="cl-avatar__slot cl-icon-avatar" :style="{ fontSize }"></text>
		</slot>
		<image
			class="cl-avatar__target"
			v-else
			:src="src"
			@error="handleError"
			@load="handleLoad"
		></image>
	</view>
</template>

<script>
export default {
	props: {
		src: String,
		mode: String,
		lazyLoad: Boolean,
		size: {
			type: Number,
			default: 80
		},
		shape: {
			type: String,
			default: 'circle'
		}
	},

	computed: {
		isShape() {
			return `cl-avatar--${this.shape}`;
		},

		height() {
			return this.size + 'rpx';
		},

		width() {
			return this.size + 'rpx';
		},

		fontSize() {
			return this.size / 1.7 + 'rpx';
		}
	},

	methods: {
		handleLoad(e) {
			this.$emit('error', e);
		},

		handleError(e) {
			this.$emit('load', e);
		}
	}
};
</script>