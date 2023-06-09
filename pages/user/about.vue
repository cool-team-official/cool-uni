<template>
	<cl-page>
		<view class="page-about">
			<image class="logo" src="/static/logo.png" />

			<text class="name">{{ app.info.name }}</text>
			<text class="version">v{{ app.version.num }}</text>
			<view class="desc">{{ app.info.desc }}</view>
		</view>
	</cl-page>
</template>

<script lang="ts" setup>
import { useApp } from "/@/cool";

const app = useApp();
</script>

<style lang="scss">
page {
	background-color: #fff;
}

.page-about {
	padding: 64rpx 24rpx;

	.name {
		display: block;
		font-size: 32rpx;
		margin-top: 20rpx;
		text-align: center;
		letter-spacing: 1rpx;
	}

	.desc {
		margin-top: 30rpx;
		font-size: 26rpx;
		color: #666;
		text-align: center;
	}

	.logo {
		display: block;
		height: 140rpx;
		width: 140rpx;
		margin: 10rpx auto;
		border-radius: 100%;
	}

	.version {
		display: block;
		text-align: center;
		font-size: 26rpx;
		margin-top: 10rpx;
		color: #666;
	}
}
</style>
