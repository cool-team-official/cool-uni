<template>
	<view class="cl-card">
		<view class="cl-card__header" v-if="label || $slots.header">
			<text class="cl-card__label">{{ label }}</text>
		</view>
		<view class="cl-card__container" :style="{ padding }">
			<slot></slot>
		</view>
		<view class="cl-card__footer" v-if="$slots.footer"></view>
	</view>
</template>

<script>
export default {
	props: {
		label: String,
		padding: {
			type: String,
			default: '20rpx'
		}
	}
};
</script>
