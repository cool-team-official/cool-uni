<template>
	<view class="cl-divider">
		<view class="cl-divider__line" :style="{ background: lineColor, width }"></view>

		<view
			class="cl-divider__text"
			:style="{
				backgroundColor
			}"
		>
			<slot></slot>
		</view>
	</view>
</template>

<script>
import { isArray } from '../../utils';

export default {
	props: {
		backgroundColor: {
			type: String,
			default: '#fff'
		},

		color: {
			type: [String, Array],
			default: '#dcdfe6'
		},

		width: {
			type: String,
			default: '100%'
		}
	},

	computed: {
		lineColor() {
			if (isArray(this.color)) {
				const [a, b] = this.color || [];
				return `linear-gradient(to right, ${a}, ${b}, ${b}, ${a})`;
			} else {
				return this.color;
			}
		}
	}
};
</script>
