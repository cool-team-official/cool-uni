<template>
	<view class="demo-grid">
		<cl-card label="默认">
			<cl-grid :column="3" @change="onChange">
				<cl-grid-item
					v-for="(item, index) in 9"
					:key="index"
					:index="index"
				>
					<view class="block">
						{{ item }}
					</view>
				</cl-grid-item>
			</cl-grid>
		</cl-card>

		<cl-card label="带边框">
			<cl-grid :column="3" border @change="onChange">
				<cl-grid-item
					v-for="(item, index) in 9"
					:key="index"
					:index="index"
				>
					<view class="block">
						{{ item }}
					</view>
				</cl-grid-item>
			</cl-grid>
		</cl-card>

		<cl-toast ref="toast"></cl-toast>
	</view>
</template>

<script>
export default {
	methods: {
		onChange(index) {
			this.$refs["toast"].open(`点击了${index + 1}`);
		}
	}
};
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