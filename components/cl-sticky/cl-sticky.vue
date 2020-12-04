<template>
	<view class="cl-sticky" :class="[{ 'is-flex': isFlex }]" :style="{ zIndex, top: top2 }">
		<slot></slot>
	</view>
</template>

<script>
export default {
	name: "cl-sticky",

	props: {
		zIndex: {
			type: Number,
			default: 99,
		},
		top: {
			type: Number,
			default: 0,
		},
		isFlex: Boolean,
	},

	computed: {
		top2() {
			// #ifdef H5
			return `calc(44px + ${this.top}rpx)`;
			// #endif

			// #ifndef H5
			return `calc(0rpx + ${this.top}rpx)`;
			// #endif
		},
	},
};
</script>
