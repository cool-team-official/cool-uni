<template>
	<view class="cl-loading" :style="{ height: size + 'px', width: size + 'px' }">
		<!-- #ifdef H5 -->
		<svg :width="size" :height="size" viewBox="25 25 50 50" class="cl-loading__svg">
			<circle
				cx="50"
				cy="50"
				r="20"
				fill="none"
				:stroke-width="3"
				:style="{ color: color2 }"
			></circle>
		</svg>
		<!-- #endif -->

		<!-- #ifndef H5 -->
		<view class="cl-loading__mp" :style="{ color: color2 }"> </view>
		<!-- #endif -->
	</view>
</template>

<script>
export default {
	props: {
		color: String,
		size: {
			type: Number,
			default: 25
		}
	},

	computed: {
		color2() {
			return this.color || '#409EFF';
		}
	}
};
</script>
