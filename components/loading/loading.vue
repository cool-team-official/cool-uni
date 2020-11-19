<template>
	<view class="cl-loading" :style="{ height: size + 'px', width: size + 'px' }">
		<!-- #ifndef APP -->
		<view class="cl-loading__mp" :style="{ color: color2 }"> </view>
		<!-- #endif -->

		<!-- #ifdef APP -->
		<view class="cl-loading__app" :style="{ color: color2 }"> </view>
		<!-- #endif -->
	</view>
</template>

<script>
export default {
	props: {
		color: String,
		size: {
			type: Number,
			default: 25,
		},
	},

	computed: {
		color2() {
			return this.color || "$color-primary";
		},
	},
};
</script>
