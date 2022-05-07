<template>
	<cl-page>
		<view class="page-set">
			<cl-list :radius="16" v-if="user.info">
				<cl-list-item label="头像" :arrow-icon="false">
					<cl-avatar round :size="108" :src="user.info.avatar" />
				</cl-list-item>
				<cl-list-item label="昵称">
					<cl-text :value="user.info.nickName" color="#666"></cl-text>
				</cl-list-item>
				<cl-list-item label="ID">
					<cl-text :value="user.info.id" color="#666"></cl-text>
				</cl-list-item>
			</cl-list>

			<cl-list :radius="16">
				<cl-list-item label="关于我们" @tap="toPage('/pages/user/about')"> </cl-list-item>
				<cl-list-item label="用户协议" @tap="toText('用户协议')"> </cl-list-item>
				<cl-list-item label="隐私政策" @tap="toText('隐私政策')"> </cl-list-item>

				<cl-list-item label="软件升级" :border="false" @tap="app.checkVersion">
					<cl-text :value="`新版本 v${app.version.versionNo}`" color="red" :size="28" v-if="app.version">
					</cl-text>
					<cl-text value="已经是最新版本" color="#666" :size="28" v-else></cl-text>
				</cl-list-item>
			</cl-list>

			<cl-button fill round plain :height="80" type="info" @tap="user.logout">退出登录</cl-button>
		</view>
	</cl-page>
</template>

<script lang="ts">
import { onReady } from "@dcloudio/uni-app";
import { defineComponent } from "vue";
import { useCool, useStore } from "/@/cool";

export default defineComponent({
	setup() {
		const { router, refs, setRefs } = useCool();
		const { user, app } = useStore();

		function toPage(path: string) {
			router.push(path);
		}

		function toText(value: string) {
			router.push({
				path: "/pages/comm/text",
				query: {
					key: "articalType",
					value,
				},
			});
		}

		onReady(() => {
			app.checkVersion();
		});

		return {
			refs,
			setRefs,
			user,
			app,
			toText,
			toPage,
		};
	},
});
</script>

<style>
/* #ifndef H5 */
page {
	background-color: #f7f7f7;
}

/* #endif */
</style>

<style lang="scss" scoped>
page {
	background-color: #f7f7f7;
}

.page-set {
	padding: 20rpx 24rpx;

	.logout-btn {
		border-radius: 92rpx;
		font-size: 28rpx;
		margin-top: 72rpx;
		border: 1rpx solid #333333;

		&::after {
			border: 0;
		}
	}
}
</style>
