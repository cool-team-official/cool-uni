<template>
	<view class="cl-progress">
		<view class="cl-progress-bar" v-if="type === 'line'">
			<view class="cl-progress-bar__outer" :style="{ height }">
				<view
					class="cl-progress-bar__inner"
					:style="{
						backgroundColor,
						width
					}"
				></view>
			</view>
		</view>

		<slot name="text">
			<view class="cl-progress__text" v-if="showText">
				<template v-if="!status">{{ value }}%</template>
				<text class="cl-progress__icon" v-else :class="icon"></text>
			</view>
		</slot>
	</view>
</template>

<script>
import { getCurrentColor } from '../../utils';

export default {
	name: 'ClProgress',
	props: {
		type: {
			type: String,
			default: 'line'
		},
		value: {
			type: Number,
			default: 0,
			required: true
		},
		strokeWidth: {
			type: Number,
			default: 12
		},
		showText: {
			type: Boolean,
			default: true
		},
		color: {
			type: [String, Array],
			default: ''
		},
		status: {
			type: Boolean
		},
		icon: String
	},
	computed: {
		height() {
			return this.strokeWidth + 'rpx';
		},
		width() {
			return (
				(() => {
					if (this.value > 100) {
						return 100;
					} else if (this.value < 0) {
						return 0;
					} else {
						return this.value;
					}
				})() + '%'
			);
		},
		backgroundColor() {
			return getCurrentColor({
				value: this.value,
				color: this.color,
				max: 100
			});
		}
	}
};
</script>
