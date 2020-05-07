<template>
	<view class="demo-countdown">
		<cl-card label="默认">
			<cl-row>
				<view class="font-24">10分钟倒计时(minute)：</view>
				<cl-countdown :minute="10"></cl-countdown>
			</cl-row>

			<cl-row>
				<view class="font-24">距离儿童节还有(datetime)：</view>
				<cl-countdown datetime="2020-06-01"></cl-countdown>
			</cl-row>
		</cl-card>

		<cl-card label="不同占位文字">
			<cl-row>
				<view class="font-24">中文：</view>
				<cl-countdown :minute="10" splitor="cn"></cl-countdown>
			</cl-row>

			<cl-row>
				<view class="font-24">英文：</view>
				<cl-countdown :minute="5" splitor="en"></cl-countdown>
			</cl-row>

			<cl-row>
				<view class="font-24">自定义：</view>
				<cl-countdown :minute="10" :splitor="['Tian', 'Shi', 'Fen', 'Miao']"></cl-countdown>
			</cl-row>
		</cl-card>

		<cl-card label="不同模式">
			<cl-row>
				<view class="font-24">默认：</view>
				<cl-countdown :hour="1" :minute="0" :second="5"></cl-countdown>
			</cl-row>

			<cl-row>
				<view class="font-24">精简：</view>
				<cl-countdown :hour="1" :minute="0" :second="5" mode="simple"></cl-countdown>
			</cl-row>
		</cl-card>

		<cl-card label="不同布局">
			<cl-row>
				<view class="font-24">只显示分秒：</view>
				<cl-countdown datetime="2020-06-01" :layout="['minute', 'second']" :splitor="['分', '秒']"></cl-countdown>
			</cl-row>

			<cl-row>
				<view class="font-24">分秒倒序：</view>
				<cl-countdown datetime="2020-06-01" :layout="['second', 'minute']" :splitor="['秒', '分']"></cl-countdown>
			</cl-row>
		</cl-card>

		<cl-card label="监听">
			<text class="font-24">倒计时：</text>

			<cl-countdown
				:second="countdown"
				@change="onChange"
				@done="onDone"
				:layout="['second']"
				:splitor="['s']"
				ref="cd"
			></cl-countdown>

			<cl-progress :value="progress" :color="['#F56C6C', '#E6A23C', '#67C23A']" :show-text="false"></cl-progress>
		</cl-card>

		<cl-card label="自定义样式">
			<cl-countdown
				:hour="2"
				custom-class="cs-countdown"
				:splitor="[]"
				:layout="['hour', 'minute', 'second']"
			></cl-countdown>
		</cl-card>

		<cl-toast ref="toast"></cl-toast>
	</view>
</template>

<script>
export default {
	data() {
		return {
			progress: 100,
			countdown: 5
		};
	},

	methods: {
		onChange([s]) {
			this.progress = parseInt((s * 100) / 60);
		},

		onDone() {
			this.$refs["toast"].open("Game Over");
			this.$refs["cd"].start({ second: 10 });
		}
	}
};
</script>

<style lang="scss" >
.demo-countdown {
	.font-24 {
		font-size: 24rpx;
		margin-bottom: 10rpx;
	}

	.cs-countdown {
		/deep/.cl-countdown__number {
			height: 100rpx;
			line-height: 100rpx;
			min-width: 80rpx;
			font-size: 50rpx;
			font-weight: bold;
			background-color: #fff;
			border: 1rpx solid #eee;
			border-radius: 10rpx;
			color: $uni-color-primary;
		}
	}
}
</style>
