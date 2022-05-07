<template>
	<cl-page>
		<view class="page-my">
			<view class="container">
				<cl-list :radius="8">
					<cl-list-item label="设置" @tap="toPage('/pages/user/set')"> </cl-list-item>
				</cl-list>
			</view>
		</view>
	</cl-page>
</template>

<script lang="ts" setup>
import { onPullDownRefresh, onShow } from "@dcloudio/uni-app";
import { useCool, useStore } from "/@/cool";

const { router } = useCool();
const { user } = useStore();

function refresh() {
	// if (!user.token) {
	// 	return router.login();
	// }

	// user.get();
}

function toPage(path: string) {
	router.push(path);
}

onPullDownRefresh(async () => {
	refresh();
	uni.stopPullDownRefresh();
});

onShow(() => {
	refresh();
});
</script>

<style lang="scss" scoped>
.page-my {



	.container {
		padding: 20rpx;
	}
}
</style>
