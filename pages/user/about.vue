<template>
	<cl-page>
		<view class="page-about">
			<view class="logo">
				<image src="/static/logo.png" />
			</view>

			<cl-list>
				<cl-list-item label="当前版本" :arrow-icon="false">
					<cl-text color="info">{{ config.version }}</cl-text>
				</cl-list-item>

				<!-- 新版本 -->
				<version-list-item />
			</cl-list>

			<cl-list>
				<cl-list-item label="联系我们" />
				<cl-list-item label="给软件评分" />
			</cl-list>

			<cl-text
				block
				align="center"
				:size="24"
				color="info"
				:line-height="1.2"
				:margin="[80, 0, 0, 0]"
				>{{ app.info.desc }}</cl-text
			>
		</view>
	</cl-page>
</template>

<script lang="ts" setup>
import { onReady } from "@dcloudio/uni-app";
import { config, useApp } from "/@/cool";

const app = useApp();

onReady(() => {
	uni.setNavigationBarTitle({
		title: `关于${app.info.name}`,
	});
});
</script>

<style lang="scss" scoped>
.page-about {
	.logo {
		display: flex;
		justify-content: center;
		padding: 100rpx 0;

		image {
			height: 160rpx;
			width: 160rpx;
			border-radius: 24rpx;
			box-shadow: 0 25rpx 30rpx -25rpx #666666;
		}
	}
}
</style>
