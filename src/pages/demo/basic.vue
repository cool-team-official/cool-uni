<template>
	<view class="page-basic">
		<view class="header">
			<text class="label">基础组件</text>
			<text class="number">4</text>
		</view>
	</view>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.page-basic {
	.header {
		display: flex;
		align-items: center;
		height: 80rpx;
		padding: 0 30rpx;
		position: relative;

		&:before {
			content: '';
			width: 0;
			height: 0;
			border-top: 10rpx solid transparent;
			border-bottom: 10rpx solid transparent;
			border-left: 18rpx solid $uni-color-primary;
			margin-right: 20rpx;
		}

		.label {
			flex: 1;
			font-size: 28rpx;
			letter-spacing: 1rpx;
		}

		.number {
			display: inline-block;
			height: 36rpx;
			width: 36rpx;
			border-radius: 36rpx;
			font-size: 24rpx;
			background-color: $uni-color-primary;
			color: #fff;
			text-align: center;
			line-height: 36rpx;
		}
	}
}
</style>