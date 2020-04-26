<template>
	<view class="demo-grid">
		<cl-card label="默认">
			<cl-grid :column="3">
				<cl-grid-item v-for="(item, index) in 9" :key="index">
					<view class="block">
						{{ item }}
					</view>
				</cl-grid-item>
			</cl-grid>
		</cl-card>

		<cl-card label="带边框">
			<cl-grid :column="3" border>
				<cl-grid-item v-for="(item, index) in 9" :key="index">
					<view class="block">
						{{ item }}
					</view>
				</cl-grid-item>
			</cl-grid>
		</cl-card>
	</view>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.demo-grid {
	.block {
		height: 140rpx;
		line-height: 140rpx;
		text-align: center;
		font-size: 30rpx;

		&:active {
			background-color: #f7f7f7;
		}
	}
}
</style>