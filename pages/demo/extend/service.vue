<template>
	<cl-page :padding="20">
		<cl-card label="基础用法">
			<cl-service :service="get()" :mask="{ text: '加载中' }">
				<template #default="{ data }">
					<view class="count">
						<view class="item">
							<text class="cl-icon-favor-fill"></text>
							<text>{{ data?.star || 0 }}</text>
						</view>

						<view class="item">
							<text class="cl-icon-chart-pie"></text>
							<text>{{ data?.count || 0 }}</text>
						</view>

						<view class="item">
							<text class="cl-icon-wallet-fill"></text>
							<text>{{ data?.wallet || 0 }}元</text>
						</view>
					</view>
				</template>
			</cl-service>
		</cl-card>
	</cl-page>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useUi } from "/@/ui";
import { useApp, useCool } from "/@/cool";
import { onReady } from "@dcloudio/uni-app";

const { service } = useCool();

// 模拟 service 请求，实际使用示例：service.test.page()
function get() {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve({
				star: Math.ceil(Math.random() * 1000),
				count: Math.ceil(Math.random() * 1000),
				wallet: Math.ceil(Math.random() * 10000),
			});
		}, 1500);
	});
}
</script>

<style lang="scss" scoped>
.count {
	display: flex;
	padding: 20rpx 0;

	.item {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		text {
			&:first-child {
				font-size: 42rpx;
			}

			&:last-child {
				font-size: 30rpx;
				margin-top: 20rpx;
			}
		}
	}
}
</style>
