<template>
	<cl-page status-bar-background="transparent">
		<!-- #ifdef MP -->
		<cl-sticky>
			<cl-topbar :show-back="false" :border="false" background-color="transparent" />
		</cl-sticky>
		<!-- #endif -->

		<view class="page-my">
			<view class="header">
				<view class="icon" @tap="toEdit">
					<text class="cl-icon-edit"></text>
				</view>

				<view class="icon" @tap="toSet">
					<text class="cl-icon-set"></text>
				</view>

				<view class="icon" @tap="toMsg">
					<text class="cl-icon-msg"></text>
				</view>
			</view>

			<view class="user" @tap="toEdit">
				<cl-avatar :src="user.info?.avatarUrl" :size="100" />

				<view class="det">
					<cl-text :size="32" block :margin="[0, 0, 8, 0]">{{
						user.info?.nickName || t("未登录")
					}}</cl-text>
					<cl-text :size="24" color="info">{{
						t("写签名会更容易获得别人的关注哦～")
					}}</cl-text>
				</view>
			</view>

			<view class="count">
				<view class="item">
					<text>171</text>
					<text>{{ t("总点击") }}</text>
				</view>

				<view class="item">
					<text>24</text>
					<text>{{ t("赞") }}</text>
				</view>

				<view class="item">
					<text>89</text>
					<text>{{ t("关注") }}</text>
				</view>

				<view class="item">
					<text>653</text>
					<text>{{ t("粉丝") }}</text>
				</view>
			</view>

			<view class="switch">
				<view class="item">
					<cl-text :size="28" bold block :margin="[0, 0, 10, 0]">{{
						t("接单模式")
					}}</cl-text>
					<cl-text :size="24" color="info">{{ t("已关闭") }}</cl-text>

					<view class="inner">
						<cl-switch />
					</view>
				</view>

				<view class="item">
					<cl-text :size="28" bold block :margin="[0, 0, 10, 0]">{{
						t("消息通知")
					}}</cl-text>
					<cl-text :size="24" color="info">{{ t("已开启") }}</cl-text>

					<view class="inner">
						<cl-switch />
					</view>
				</view>
			</view>

			<view class="status">
				<cl-text block :size="30" bold>{{ t("我的订单") }}</cl-text>

				<view class="list">
					<view
						class="item"
						v-for="(item, index) in order.list"
						:key="index"
						@tap="order.toLink(item.value)"
					>
						<cl-icon :name="item.icon" :size="50" />
						<cl-text :margin="[18, 0, 0, 0]" :size="24" color="info">
							{{ t(item.label) }}
						</cl-text>
					</view>
				</view>
			</view>

			<view class="menu">
				<cl-list :radius="24" :border="false">
					<cl-list-item :label="t('我的账单')" @tap="toBill">
						<template #icon>
							<cl-icon name="bill" :size="40" />
						</template>
					</cl-list-item>

					<cl-list-item :label="t('观看历史')">
						<template #icon>
							<cl-icon name="time" :size="40" />
						</template>
					</cl-list-item>

					<cl-list-item :label="t('数据看板')">
						<template #icon>
							<cl-icon name="chart-bar" :size="40" />
						</template>
					</cl-list-item>

					<cl-list-item :label="t('邀请好友')">
						<template #icon>
							<cl-icon name="share" :size="40" />
						</template>
					</cl-list-item>
				</cl-list>

				<cl-list :radius="24" :border="false">
					<cl-list-item :label="t('设置')" @tap="toSet">
						<template #icon>
							<cl-icon name="set" :size="40" />
						</template>
					</cl-list-item>
				</cl-list>
			</view>
		</view>

		<tabbar />
	</cl-page>
</template>

<script lang="ts" setup>
import { onPullDownRefresh, onShow } from "@dcloudio/uni-app";
import { useCool, useStore, module } from "/@/cool";
import { useUi } from "/$/cool-ui";
import { reactive } from "vue";
import { useI18n } from "vue-i18n";
import Tabbar from "./components/tabbar.vue";

const { router } = useCool();
const { user } = useStore();
const ui = useUi();
const { t } = useI18n();

async function refresh() {
	if (user.token) {
		await user.get();
	} else {
		// user.logout();
	}
}

const order = reactive({
	list: [
		{
			icon: "order-paid",
			label: t("待支付"),
			value: 1,
		},
		{
			icon: "order-not-shipped",
			label: t("未发货"),
			value: 2,
		},
		{
			icon: "order-received",
			label: t("已发货"),
			value: 3,
		},
		{
			icon: "order-refund",
			label: t("售后 / 退款"),
			value: 4,
		},
	],

	toLink(value: number) {
		ui.showToast(t("订单模块不存在，请在插件市场中下载"));
	},
});

function toBill() {
	ui.showToast(t("财务模块不存在，请在插件市场中下载"));
}

function toSet() {
	router.push("/pages/user/set");
}

function toEdit() {
	router.push("/pages/user/edit");
}

function toMsg() {
	if (module.get("cool-msg")) {
		router.push("/uni_modules/cool-msg/pages/list");
	} else {
		ui.showToast(t("消息模块不存在，请在插件市场中下载"));
	}
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
$gap: 24rpx;

.page-my {
	padding: $gap;

	.header {
		display: flex;

		.icon {
			display: flex;
			justify-content: center;
			align-items: center;
			height: 60rpx;
			width: 60rpx;
			background-color: rgba(150, 150, 150, 0.1);
			border-radius: 16rpx;
			font-size: 32rpx;
			margin-right: $gap;

			&:last-child {
				margin-left: auto;
				margin-right: 0;
			}
		}
	}

	.user {
		display: flex;
		align-items: center;
		padding: 48rpx 12rpx;

		.det {
			flex: 1;
			margin-left: 32rpx;
		}
	}

	.count {
		display: flex;
		margin-bottom: 32rpx;

		.item {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			flex: 1;

			text {
				&:nth-child(1) {
					font-size: 40rpx;
					margin-bottom: 4rpx;
					font-weight: bold;
				}

				&:nth-child(2) {
					font-size: 24rpx;
					color: $cl-color-info;
				}
			}
		}
	}

	.switch {
		display: flex;
		margin-bottom: 24rpx;

		.item {
			flex: 1;
			border-radius: 24rpx;
			padding: 32rpx;
			background-color: #fff;
			position: relative;

			.inner {
				position: absolute;
				right: 24rpx;
				top: calc(50% - 30rpx);
				transform: scale(0.8);
			}

			&:nth-child(1) {
				margin-right: 12rpx;
			}

			&:nth-child(2) {
				margin-left: 12rpx;
			}
		}
	}

	.status {
		background-color: #fff;
		border-radius: 24rpx;
		padding: 32rpx;
		margin-bottom: 24rpx;

		.list {
			display: flex;

			.item {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				flex: 1;
				padding: 48rpx 0 24rpx 0;
			}
		}
	}

	.menu {
		:deep(.cl-list-item) {
			padding: 4rpx 6rpx 4rpx 12rpx;
		}
	}
}
</style>
