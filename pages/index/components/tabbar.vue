<template>
	<cl-footer :flex="false" border :z-index="399" :padding="0">
		<view class="tabbar">
			<view
				class="item"
				v-for="(item, index) in list"
				:key="index"
				:class="{
					'is-active': item.active,
				}"
				@tap="toLink(item.pagePath)"
			>
				<view class="icon">
					<image :src="item.icon" mode="aspectFit" />
				</view>
				<text class="label">{{ item.text }}</text>
				<view class="badge" v-if="item.number > 0">{{ item.number || 0 }}</view>
			</view>
		</view>
	</cl-footer>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useCool } from "/@/cool";
import { useI18n } from "vue-i18n";

const { router } = useCool();
const { t } = useI18n();

// 当前页面路径
const pagePath = router.path;

const list = computed(() => {
	const arr = [...router.tabs];

	return arr.map((e) => {
		const active = pagePath?.includes(e.pagePath);

		return {
			...e,
			icon: "/" + (active ? e.selectedIconPath : e.iconPath),
			active,
			number: 0,
			text: t((e.text || "")?.replace(/%/g, "")!),
		};
	});
});

function toLink(pagePath: string) {
	const to = (link: string) => {
		// #ifdef H5
		location.href = link;
		// #endif

		// #ifdef APP-PLUS
		plus.runtime.openURL(link);
		// #endif
	};

	switch (pagePath) {
		case "cool":
			to("https://cool-js.com");
			break;

		case "admin":
			to("https://show.cool-admin.com");
			break;

		default:
			router.push("/" + pagePath);
			break;
	}
}

uni.hideTabBar();
</script>

<style lang="scss" scoped>
$icon-size: 56rpx;

.tabbar {
	display: flex;
	height: 120rpx;
	width: 100%;

	.item {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		flex: 1;
		position: relative;

		.icon {
			height: $icon-size;
			width: $icon-size;

			image {
				height: 100%;
				width: 100%;
			}
		}

		.label {
			font-size: 22rpx;
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
	}
}
</style>
