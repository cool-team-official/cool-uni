<template>
	<view class="cl-skeleton-item" :style="style"></view>
</template>

<script>
import { isNumber } from "../../utils";

export default {
	props: {
		height: [Number, String],
		width: [Number, String]
	},

	computed: {
		style() {
			return {
				height: this.parse(this.height),
				width: this.parse(this.width)
			};
		}
	},

	methods: {
		parse(value) {
			return isNumber(value) ? value + "rpx" : value;
		}
	}
};
</script>

<style lang="scss" scoped>
.cl-skeleton-item {
	height: 100%;
	width: 100%;
}
</style>