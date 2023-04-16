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
				@tap="toLink(item.pagePath)"
			>
				<view class="custom" @tap="toChat" v-if="item.isCustom">
					<image class="icon" src="/static/icon/tabbar/chat.png" mode="aspectFit" />
				</view>

				<template v-else>
					<image class="icon" :src="item.icon" mode="aspectFit" />
					<text class="label">{{ item.text }}</text>
					<view class="badge" v-if="item.number > 0">{{ item.number || 0 }}</view>
				</template>
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

	arr.splice(1, 0, {
		pagePath: "",
		isCustom: true,
	});

	return arr.map((e) => {
		const active = router.path?.includes(e.pagePath);

		return {
			icon: "/" + (active ? e.selectedIconPath : e.iconPath),
			active,
			number: 0,
			isCustom: e.isCustom,
			...e,
		};
	});
});

function toLink(pagePath: string) {
	router.push("/" + pagePath);
}

function toChat() {
	// #ifdef H5
	location.href = "https://cool-js.com/ai/chat-vip/index.html#/";
	// #endif
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
				height: 46rpx;
				width: 46rpx;
			}

			.label {
				font-size: 24rpx;
				color: #bfbfbf;
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

			.custom {
				display: flex;
				align-items: center;
				justify-content: center;
				height: 100%;

				.icon {
					background: linear-gradient(
						to bottom right,
						#408fff,
						#6b69f8,
						#a35df2,
						#d14bd8,
						#e9388a
					);

					border-radius: 100%;
					padding: 16rpx;
				}
			}
		}
	}
}
</style>
