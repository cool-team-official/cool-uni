<template>
	<view class="demo-divider">
		<cl-card label="基础用法">
			<cl-divider>默认</cl-divider>
			<cl-divider color="#409EFF">不同颜色</cl-divider>
			<cl-divider :color="['#fff', '#F56C6C']">渐变颜色</cl-divider>
			<cl-divider width="50%">线条宽度</cl-divider>
		</cl-card>

		<cl-card label="自定义内容">
			<cl-divider>
				<view class="cs-1">
					<text class="cl-icon-favor"></text>
					<text>猜你喜欢</text>
				</view>
			</cl-divider>
		</cl-card>
	</view>
</template>

<script>
export default {};
</script>

<style lang="scss">
.demo-divider {
	.cs-1 {
		display: flex;
		align-items: center;
		color: $uni-color-error;

		.cl-icon-favor {
			font-size: 32rpx;
			margin-right: 10rpx;
		}
	}
}
</style>