<template>
	<view class="tabbar">
		<view class="tabbar__inner">
			<view
				class="item"
				v-for="(item, index) in list"
				:key="index"
				:class="{
					'is-active': item.active,
				}"
				@click="toLink(item)"
			>
				<image class="icon" :src="item.icon" mode="aspectFit" />
				<text class="label">{{ item.text }}</text>
				<view class="badge" v-if="item.number > 0">{{ item.number || 0 }}</view>
			</view>
		</view>
	</view>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useCool } from "/@/cool";

const { router } = useCool();

const list = computed(() => {
	const arr = [...router.tabs];

	return arr.map((e, i) => {
		const active = router.path?.includes(e.pagePath);

		return {
			icon: "/" + (active ? e.selectedIconPath : e.iconPath),
			active,
			number: i == 1 ? (Math.random() * 9).toFixed(0) : 0,
			...e,
		};
	});
});

function toLink(item: any) {
	router.push("/" + item.pagePath);
}
</script>

<style lang="scss" scoped>
.tabbar {
	padding-bottom: env(safe-area-inset-bottom);
	height: 120rpx;

	&__inner {
		padding-bottom: inherit;
		height: inherit;
		width: 100%;
		display: flex;
		background-color: #fff;
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 399;
		border-top: 1rpx solid #eee;

		.item {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			flex: 1;
			position: relative;

			.icon {
				height: 58rpx;
				width: 58rpx;
			}

			.label {
				font-size: 24rpx;
				color: #999;
			}

			.badge {
				display: flex;
				align-items: center;
				justify-content: center;
				position: absolute;
				top: 20rpx;
				transform: translateX(20rpx);
				font-size: 20rpx;
				height: 36rpx;
				min-width: 36rpx;
				padding: 0 6rpx;
				background-color: #f56c6c;
				border: 4rpx solid #fff;
				color: #fff;
				border-radius: 18rpx;
				font-weight: bold;
				box-sizing: border-box;
			}

			&.is-active {
				.label {
					color: $cl-color-primary;
				}
			}

			&:not(:last-child)::after {
				display: block;
				content: "";
				height: 36rpx;
				width: 4rpx;
				border-radius: 4rpx;
				background-color: #eee;
				position: absolute;
				right: -2rpx;
				top: calc(50% - 18rpx);
			}
		}
	}
}
</style>
