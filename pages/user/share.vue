<template>
	<cl-page>
		<view class="page-share">
			<div class="container">
				<canvas canvas-id="cvs" id="cvs"></canvas>
				<image :src="url" mode="widthFix" />
			</div>

			<view class="footer">
				<cl-share text="邀请好友一起使用"></cl-share>
			</view>
		</view>
	</cl-page>
</template>

<script lang="ts" setup>
import { onReady } from "@dcloudio/uni-app";
import { nextTick, ref } from "vue";
import { useApp } from "/@/cool";
import { Canvas } from "/@/cool/utils";

import Bg from "./static/images/share-bg.png";
import Logo from "/@/static/logo.png";
import { useUi } from "/@/ui";

const app = useApp();
const ui = useUi();

// 路径
const url = ref("");

function refresh() {
	const cvs = new Canvas("cvs");

	ui.showLoading();

	function scale(v: number) {
		return v * 2;
	}

	cvs.image({
		x: 0,
		y: 0,
		height: scale(547),
		width: scale(375),
		url: Bg,
	})
		.div({
			x: scale(24),
			y: scale(391),
			height: scale(84),
			width: scale(328),
			backgroundColor: "#fff",
			radius: scale(4),
		})
		.text({
			x: scale(91),
			y: scale(409),
			fontSize: scale(16),
			color: "#333",
			width: scale(100),
			text: app.info.name,
		})
		.text({
			x: scale(91),
			y: scale(438),
			fontSize: scale(14),
			color: "#333",
			width: scale(200),
			overflow: "ellipsis",
			lineClamp: 1,
			text: "去趣惊喜参加活动",
		})
		.image({
			x: scale(32),
			y: scale(409),
			height: scale(50),
			width: scale(50),
			radius: scale(4),
			url: Logo,
		})
		// .image({
		// 	x: scale(274),
		// 	y: scale(400),
		// 	height: scale(66),
		// 	width: scale(66),
		// 	url: await this.getShareUrl(),
		// })
		.draw()
		.then(() => {
			nextTick(() => {
				cvs.createImage().then((res) => {
					url.value = res;
					ui.hideLoading();
				});
			});
		});
}

onReady(() => {
	refresh();
});
</script>

<style lang="scss">
page {
	height: 100%;
}

.page-share {
	display: flex;
	flex-direction: column;
	height: 100%;
	background-color: #fff8ed;

	.container {
		flex: 1;

		image {
			width: 100%;
		}

		canvas {
			position: absolute;
			left: -200%;
			top: -200%;
			height: 1094px;
			width: 750px;
		}
	}

	.footer {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		padding-bottom: env(safe-area-inset-bottom);
		background-color: #fff;
		border-radius: 30rpx 30rpx 0 0;
	}
}
</style>
