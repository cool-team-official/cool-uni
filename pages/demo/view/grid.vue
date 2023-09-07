<template>
	<cl-page :padding="20">
		<cl-card label="3列">
			<cl-grid :column="3">
				<cl-grid-item v-for="item in 9" :key="item">
					<view class="item">{{ item }}</view>
				</cl-grid-item>
			</cl-grid>
		</cl-card>

		<cl-card label="6列">
			<cl-grid :column="6">
				<cl-grid-item v-for="item in 24" :key="item">
					<view class="item">{{ item }}</view>
				</cl-grid-item>
			</cl-grid>
		</cl-card>
	</cl-page>
</template>

<style lang="scss" scoped>
.item {
	background-color: #f6f7fa;
	text-align: center;
	font-size: 28rpx;
	height: 60rpx;
	line-height: 60rpx;
	margin: 10rpx;
}
</style>
