<template>
	<cl-page>
		<view class="page-home">
			<view class="logo">
				<view class="icon">
					<image src="/static/logo.png" mode="aspectFit" />
				</view>

				<text class="name">{{ app.info.name }}</text>
			</view>

			<view class="desc">{{ t("uniapp快速开发脚手架") }}</view>

			<view class="container">
				<view class="group" v-for="(item, index) in list" :key="index">
					<text class="label">{{ item.label }}</text>

					<view class="list">
						<view
							class="item"
							v-for="(item2, index2) in item.children"
							:key="index2"
							@tap="toLink(item2.path)"
						>
							<text class="name">{{ item2.label }}</text>

							<cl-icon name="arrow-right" color="info"></cl-icon>
						</view>
					</view>
				</view>
			</view>
		</view>

		<tabbar />
	</cl-page>
</template>

<script lang="ts" setup>
import { useApp, useCool, module, useStore } from "/@/cool";
import { useUi } from "/$/cool-ui";
import { onReady } from "@dcloudio/uni-app";
import { ref } from "vue";
import { isEmpty } from "lodash-es";
import { useI18n } from "vue-i18n";
import Tabbar from "./components/tabbar.vue";

const { router, service } = useCool();
const ui = useUi();
const app = useApp();
const { t } = useI18n();
const { dict } = useStore();

const list = ref([
	{
		label: t("基础组件"),
		value: "basic",
		children: [] as any[],
	},
	{
		label: t("表单组件"),
		value: "form",
		children: [],
	},

	{
		label: t("视图组件"),
		value: "view",
		children: [],
	},

	{
		label: t("高级组件"),
		value: "extend",
		children: [],
	},
]);

function toLink(path: string) {
	router.push({
		path,
		isGuard: false,
	});
}

onReady(() => {
	// cool-ui 示例
	router.routes.forEach((e) => {
		if (e.path.includes("pages/demo")) {
			const [, , key] = e.path.split("/");

			const item = list.value.find((e) => e.value == key);

			if (item) {
				item.children.push({
					label: e.style.navigationBarTitleText,
					path: "/" + e.path,
				});
			}
		}
	});

	// 插件示例
	const children = module.list.filter((e) => e.demo).map((e) => e.demo!);

	if (!isEmpty(children)) {
		list.value.unshift({
			label: t("插件 / 模块"),
			value: "plugin",
			children,
		});
	}
});
</script>

<style lang="scss" scoped>
.page-home {
	.logo {
		padding: 80rpx 0 32rpx 0;
		display: flex;
		align-items: center;
		justify-content: center;
		user-select: none;

		.icon {
			border-radius: 16rpx;
			padding: 10rpx;
			margin-right: 20rpx;
			background-color: #2c3142;

			image {
				display: block;
				height: 66rpx;
				width: 66rpx;
			}
		}

		text {
			font-size: 60rpx;
			font-weight: bold;
			letter-spacing: 3rpx;
		}
	}

	.desc {
		font-size: 28rpx;
		text-align: center;
		margin-bottom: 80rpx;
		letter-spacing: 2rpx;
	}

	.dd {
		display: flex;
		padding: 50rpx;

		.a {
			flex: 1;
		}
	}

	.container {
		border-radius: 32rpx 32rpx 0 0;
		background-color: #fff;
	}

	.group {
		padding: 30rpx;

		.label {
			display: block;
			margin-bottom: 20rpx;
			margin-left: 10rpx;
			font-size: 26rpx;
			color: #999;
		}

		.list {
			.item {
				display: flex;
				align-items: center;
				height: 80rpx;
				padding: 0 30rpx;
				margin-bottom: 25rpx;
				background-color: #fff;
				border-radius: 20rpx;
				border: 1rpx solid #ddd;

				.name {
					flex: 1;
					font-size: 28rpx;
					font-weight: bold;
				}
			}
		}
	}
}
</style>
