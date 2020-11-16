<template>
	<text
		:class="['cl-icon', name]"
		:style="{
			fontSize,
			color
		}"
	></text>
</template>

<script>
import { isNumber } from '../../utils';

export default {
	props: {
		name: String,
		size: [String, Number],
		color: String
	},

	computed: {
		fontSize() {
			return isNumber(this.size) ? `${this.size}rpx` : this.size;
		}
	}
};
</script>
