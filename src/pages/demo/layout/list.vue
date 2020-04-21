<template>
	<view class="demo-list">
		<cl-card label="基础用法" padding="0">
			<cl-list label="账单"> </cl-list>
		</cl-card>

		<cl-card label="带图标" padding="0">
			<cl-list label="总资产">
				<image slot="icon" :src="require('@/assets/icon/all.png')" alt="" />
				<text slot="suffix" class="cl-icon-arrow-right"></text>
			</cl-list>
		</cl-card>

		<cl-card label="带描述" padding="0">
			<cl-list label="余额">
				<image slot="icon" :src="require('@/assets/icon/balance.png')" alt="" />
				0.00元
				<text slot="suffix" class="cl-icon-arrow-right"></text>
			</cl-list>

			<cl-list label="昨日收益" type="success">
				<image slot="icon" :src="require('@/assets/icon/stats.png')" alt="" />
				-264.08元
				<text slot="suffix" class="cl-icon-arrow-right"></text>
			</cl-list>
		</cl-card>

		<cl-card label="禁用" padding="0">
			<cl-list label="银行卡" disabled>
				<image slot="icon" :src="require('@/assets/icon/bank-card.png')" alt="" />
				<text>兴业银行(***1113)</text>
				<text slot="suffix" class="cl-icon-arrow-right"></text>
			</cl-list>
		</cl-card>

		<cl-card label="滑动" padding="0">
			<cl-list label="右滑动" swipe="left">
				<text slot="suffix" class="cl-icon-arrow-right"></text>

				<view class="append" slot="menu">
					<button class="primary-btn">置顶</button>
					<button class="error-btn">删除</button>
				</view>
			</cl-list>

			<cl-list label="左滑动" swipe="right">
				<text slot="suffix" class="cl-icon-arrow-right"></text>

				<view class="append" slot="menu">
					<button class="primary-btn">置顶</button>
					<button class="error-btn">删除</button>
				</view>
			</cl-list>
		</cl-card>

		<cl-card label="自定义" padding="0">
			<cl-list ref="cs-list">
				<view class="cs-block">
					<cl-avatar :src="avatarUrl"></cl-avatar>
					<text>神仙都没用</text>
				</view>

				<view class="append" slot="suffix">
					<cl-button type="primary" @tap="chooseImage">修改头像</cl-button>
				</view>
			</cl-list>
		</cl-card>
	</view>
</template>

<script>
export default {
	data() {
		return {
			avatarUrl: require('@/assets/images/avatar.jpg')
		};
	},

	methods: {
		chooseImage() {
			uni.chooseImage({
				count: 1,
				success: res => {
					this.$refs['cs-list'].restore();
					this.avatarUrl = res.tempFilePaths[0];
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.demo-list {
	/deep/.cl-card__container {
		padding: 0;
	}

	.cs-block {
		display: flex;
		align-items: center;
		width: 100%;
		padding: 20rpx 10rpx;

		/deep/.cl-avatar {
			height: 100rpx;
			width: 100rpx;
			margin-right: 30rpx;
			border-radius: 10rpx;
		}
	}

	.append {
		display: flex;
		align-items: center;
		height: 100%;

		.primary-btn,
		.error-btn {
			border-radius: 0;
			height: 100rpx;
			width: 130rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 26rpx;
			color: #fff;
			box-sizing: border-box;
			margin: 0;

			&::after {
				border: 0;
			}
		}

		.primary-btn {
			background-color: $uni-color-primary;
		}

		.error-btn {
			background-color: $uni-color-error;
		}
	}
}
</style>
