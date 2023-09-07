<template>
	<cl-page>
		<view class="page-my">
			<view class="header">
				<view class="info">
					<!-- 信息 -->
					<view class="base">
						<text class="name" @tap="toSet">{{ user.info?.nickName || "昵称" }}</text>
						<text class="level">Lv1</text>
					</view>

					<!-- 头像 -->
					<view class="avatar" @tap="toSet">
						<cl-avatar :size="110" :src="user.info?.avatarUrl" />
					</view>
				</view>

				<!-- 简介 -->
				<view class="desc"> 简介：我也写了一个cool-admin的开源项目 </view>
			</view>

			<view class="container">
				<cl-list :radius="16">
					<cl-list-item label="我的订单" @tap="toDev" />
					<cl-list-item label="我的二维码" :arrow-icon="false">
						<cl-icon name="qrcode" />
					</cl-list-item>
					<cl-list-item label="我的钱包" :arrow-icon="false">
						<cl-text type="price" :value="59.05" />
					</cl-list-item>
				</cl-list>

				<cl-list :radius="16">
					<cl-list-item :border="false" label="设置" @tap="toSet" />
				</cl-list>
			</view>
		</view>

		<tabbar />
	</cl-page>
</template>

<script lang="ts" setup>
import { onPullDownRefresh, onShow } from "@dcloudio/uni-app";
import { useCool, useStore } from "/@/cool";
import Tabbar from "./components/tabbar.vue";
import { useUi } from "/@/ui";

const { router } = useCool();
const { user } = useStore();
const ui = useUi();

async function refresh() {
	if (user.token) {
		await user.get();
	} else {
		user.logout();
	}
}

function toDev() {
	ui.showToast("开发中");
}

function toSet() {
	router.push("/pages/user/set");
}

onPullDownRefresh(async () => {
	await refresh();
	uni.stopPullDownRefresh();
});

onShow(() => {
	refresh();
});
</script>

<style lang="scss" scoped>
.page-my {
	.header {
		padding: 30rpx 30rpx 40rpx 30rpx;
		background-color: #fff;

		.info {
			display: flex;
			position: relative;

			.name {
				display: block;
				font-size: 50rpx;
				font-weight: bold;
			}

			.level {
				display: inline-block;
				font-size: 24rpx;
				border: 2rpx solid currentColor;
				border-radius: 8rpx;
				padding: 0 6rpx;
				margin: 10rpx 0 0 0;
				color: $cl-color-primary;
			}

			.avatar {
				border: 6rpx solid f6f7fa;
				border-radius: 100%;
				position: absolute;
				top: 0;
				right: 0;
				height: 110rpx;
				width: 110rpx;
			}
		}

		.desc {
			color: #999;
			font-size: 24rpx;
			margin-top: 20rpx;
		}
	}

	.container {
		padding: 20rpx 24rpx;
	}
}
</style>
